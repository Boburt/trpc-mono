import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Switch } from "@nextui-org/switch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@nextui-org/button";
import { apiClient } from "@frontend_next/lib/eden";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Input, Textarea } from "@nextui-org/input";
import { Skeleton } from "@nextui-org/skeleton";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@frontend_next/components/ui/file-uploader";
import { DropzoneOptions } from "react-dropzone";
import { UploadCloud } from "lucide-react";
import { AspectRatio } from "@frontend_next/components/ui/aspect-ratio";
import { useSession } from "next-auth/react";
import { ProductProperties } from "@backend/modules/products/dtos/one.dto";
import { ModalFooter } from "@nextui-org/react";

interface ProductFormValues {
  active: boolean;
  name: string;
  description: string | null;
  price?: number | null;
  files?: File[] | null;
  properties: ProductProperties | null;
}

export const ProductAddingForm = ({
  setOpen,
  recordId,
}: {
  setOpen: (open: boolean) => void;
  recordId?: string;
}) => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;

  const { data: record, isLoading: isRecordLoading } = useQuery({
    queryKey: ["one_product", recordId],
    queryFn: () => {
      if (recordId) {
        return apiClient.api
          .products({
            id: recordId,
          })
          .get({
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
      } else {
        return null;
      }
    },
    enabled: !!recordId && !!accessToken,
  });

  if (!recordId) {
    return <ProductAddingFormWithData setOpen={setOpen} />;
  } else if (!isRecordLoading && record?.data && "id" in record.data) {
    return (
      <ProductAddingFormWithData
        setOpen={setOpen}
        recordId={recordId}
        defaultValues={record.data}
      />
    );
  } else {
    return (
      <>
        <Skeleton className="rounded-lg flex h-full w-full">
          <div className="h-24 rounded-lg bg-default-300"></div>
        </Skeleton>
      </>
    );
  }
};

export const ProductAddingFormWithData = ({
  setOpen,
  recordId,
  defaultValues,
}: {
  setOpen: (open: boolean) => void;
  recordId?: string;
  defaultValues?: ProductFormValues;
}) => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const queryClient = useQueryClient();
  const dropzone = {
    multiple: true,
    maxFiles: 10,
    maxSize: 4 * 1024 * 1024,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".gif", ".webp"],
    },
  } satisfies DropzoneOptions;
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    defaultValues: defaultValues ?? {
      active: false,
      name: "",
      description: "",
      price: undefined,
      files: [],
      properties: {
        fabric_type: "",
        raw_material: "",
        fabric_density: "",
        color_and_design: "",
        strength_resistance: "",
        product_tech: "",
      },
    },
  });

  const onSubmit: SubmitHandler<ProductFormValues> = (value) => {
    if (recordId) {
      updateMutation.mutate({
        data: {
          active: value.active,
          name: value.name,
          files: value.files,
          description: value.description ?? "",
          price: value.price,
          properties: value.properties,
        },
        id: recordId,
      });
    } else {
      createMutation.mutate({
        active: value.active,
        name: value.name,
        files: value.files,
        description: value.description ?? "",
        price: value.price,
        properties: value.properties,
      });
    }
  };

  const onAddSuccess = (actionText: string) => {
    toast.success(`${actionText}`);
    queryClient.invalidateQueries({ queryKey: ["products"] });
    // form.reset();
    setOpen(false);
  };

  const onError = (error: any) => {
    toast.error(
      error.value && error.value.message
        ? error.value.message
        : JSON.stringify(error.value)
    );
  };

  const createMutation = useMutation({
    mutationFn: (newTodo: {
      active: boolean;
      name: string;
      description?: string;
      price?: number | null;
      properties: ProductProperties | null;
    }) => {
      return apiClient.api.products.post(
        {
          data: newTodo,
          fields: [
            "id",
            "name",
            "active",
            "description",
            "price",
            "properties",
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    },
    onSuccess: () => onAddSuccess("Новый продукт успешно создано"),
    onError,
  });

  const updateMutation = useMutation({
    mutationFn: async (newTodo: {
      data: {
        active: boolean;
        name: string;
        description?: string;
        price?: number | null;
        properties: ProductProperties | null;
      };
      id: string;
    }) => {
      const { data, error, status } = await apiClient.api
        .products({
          id: newTodo.id,
        })
        .put(
          {
            data: newTodo.data,
            fields: [
              "id",
              "name",
              "active",
              "description",
              "price",
              "properties",
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      if (status === 200) {
        return data;
      } else {
        throw error;
      }
    },
    onSuccess: () => onAddSuccess("Продукт успешно обновлен"),
    onError,
  });

  return (
    <div className="flex w-full flex-col flex-grow">
      <form className="flex flex-col h-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex-grow">
          <Tabs aria-label="Options">
            <Tab key="photos" title="Общие">
              <div className="space-y-4">
                <Controller
                  name="active"
                  control={control}
                  render={({ field }) => (
                    <Switch checked={field.value} onChange={field.onChange}>
                      Активен
                    </Switch>
                  )}
                />
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Название продукта"
                      placeholder="Введите название продукта"
                      onChange={field.onChange}
                      value={field.value}
                      isInvalid={!!errors.name}
                      errorMessage={errors.name?.message}
                      variant="bordered"
                    />
                  )}
                />
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      label="Описание продукта"
                      placeholder="Введите описание продукта"
                      onChange={field.onChange}
                      value={field.value ?? ""}
                      isInvalid={!!errors.description}
                      errorMessage={errors.description?.message}
                      variant="bordered"
                    />
                  )}
                />
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Цена"
                      placeholder="Цена"
                      type="number"
                      onChange={field.onChange}
                      value={field.value ? field.value.toString() : ""}
                      isInvalid={!!errors.price}
                      errorMessage={errors.price?.message}
                      endContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">
                            сум
                          </span>
                        </div>
                      }
                      variant="bordered"
                    />
                  )}
                />
                <Controller
                  name="files"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <FileUploader
                        value={field.value ?? null}
                        onValueChange={field.onChange}
                        dropzoneOptions={dropzone}
                      >
                        <FileInput className="w-full px-4 py-5 flex flex-col my-3 items-center text-sm rounded-lg border border-gray-300 bg-white">
                          <UploadCloud />
                          <div>
                            <span className="font-bold">Кликните здесь</span>{" "}
                            или перетащите файлы сюда
                          </div>
                          <div>JPG, PNG, GIF, WEBP</div>
                        </FileInput>
                        {field.value && field.value.length > 0 && (
                          <FileUploaderContent className="p-2  w-full -ml-3 rounded-b-none rounded-t-md flex-row gap-2 grid grid-cols-4">
                            {field.value.map((file, i) => (
                              <FileUploaderItem
                                key={i}
                                index={i}
                                aria-roledescription={`file ${
                                  i + 1
                                } containing ${file.name}`}
                                className="p-0 size-20"
                              >
                                <AspectRatio className="size-full">
                                  <img
                                    src={URL.createObjectURL(file)}
                                    alt={file.name}
                                    className="aspect-square rounded-md"
                                  />
                                </AspectRatio>
                              </FileUploaderItem>
                            ))}
                          </FileUploaderContent>
                        )}
                      </FileUploader>
                    </div>
                  )}
                />
              </div>
            </Tab>
            <Tab key="properties" title="Характеристики">
              <div className="space-y-4">
                <Controller
                  name="properties.fabric_type"
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Тип ткани"
                      placeholder="Введите тип ткани"
                      onChange={field.onChange}
                      value={field.value}
                      isInvalid={!!errors.properties?.fabric_type}
                      errorMessage={errors.properties?.fabric_type?.message}
                      variant="bordered"
                    />
                  )}
                />
                <Controller
                  name="properties.raw_material"
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Сырьё"
                      placeholder="Введите сырьё"
                      onChange={field.onChange}
                      value={field.value}
                      isInvalid={!!errors.properties?.raw_material}
                      errorMessage={errors.properties?.raw_material?.message}
                      variant="bordered"
                    />
                  )}
                />
                <Controller
                  name="properties.fabric_density"
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Плотность ткани"
                      placeholder="Введите плотность ткани"
                      onChange={field.onChange}
                      value={field.value}
                      isInvalid={!!errors.properties?.fabric_density}
                      errorMessage={errors.properties?.fabric_density?.message}
                      variant="bordered"
                    />
                  )}
                />
                <Controller
                  name="properties.color_and_design"
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Цвет и дизайн"
                      placeholder="Введите цвет и дизайн"
                      onChange={field.onChange}
                      value={field.value}
                      isInvalid={!!errors.properties?.color_and_design}
                      errorMessage={
                        errors.properties?.color_and_design?.message
                      }
                      variant="bordered"
                    />
                  )}
                />
                <Controller
                  name="properties.strength_resistance"
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Прочность и износостойкость"
                      placeholder="Введите прочность и износостойкость"
                      onChange={field.onChange}
                      value={field.value}
                      isInvalid={!!errors.properties?.strength_resistance}
                      errorMessage={
                        errors.properties?.strength_resistance?.message
                      }
                      variant="bordered"
                    />
                  )}
                />
                <Controller
                  name="properties.product_tech"
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Технологии производства"
                      placeholder="Введите технологии производства"
                      onChange={field.onChange}
                      value={field.value}
                      isInvalid={!!errors.properties?.product_tech}
                      errorMessage={errors.properties?.product_tech?.message}
                      variant="bordered"
                    />
                  )}
                />
              </div>
            </Tab>
          </Tabs>
        </div>
        <ModalFooter>
          <Button
            color="primary"
            type="submit"
            disabled={isSubmitting}
            isLoading={isSubmitting}
            className="grow"
          >
            Сохранить
          </Button>
        </ModalFooter>
      </form>
    </div>
  );
};
