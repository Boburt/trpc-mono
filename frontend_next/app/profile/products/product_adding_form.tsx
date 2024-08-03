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
import { ChevronDown, RefreshCw, UploadCloud } from "lucide-react";
import { AspectRatio } from "@frontend_next/components/ui/aspect-ratio";
import { useSession } from "next-auth/react";
import { ProductProperties } from "@backend/modules/products/dtos/one.dto";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  ModalFooter,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { ReactNode, useCallback, useMemo, useRef, useState } from "react";
import { TreeCategoryDto } from "@backend/modules/categories/dtos/tree.dto";

type TreeCategoriesWithLevel = TreeCategoryDto & { level: number };

interface ProductFormValues {
  active: boolean;
  name: string;
  description: string | null;
  price_rub?: string | null;
  price_usd?: string | null;
  category_id: string;
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
        // @ts-ignore
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
  const formRef = useRef<HTMLFormElement | null>(null);
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const queryClient = useQueryClient();
  const [isConverting, setIsConverting] = useState(false);

  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      apiClient.api.categories.public.tree.get({
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
  });

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
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    defaultValues: defaultValues ?? {
      active: false,
      name: "",
      description: "",
      price_rub: undefined,
      price_usd: undefined,
      category_id: "",
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

  const priceRub = watch("price_rub");
  const priceUsd = watch("price_usd");

  const convertCurrency = async (
    fromCurrency: string,
    toCurrency: string,
    amount: number
  ) => {
    setIsConverting(true);
    try {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );
      const data = await response.json();
      const rate = data.rates[toCurrency];
      const convertedAmount = amount * rate;
      setIsConverting(false);
      return convertedAmount;
    } catch (error) {
      console.error("Error converting currency:", error);
      toast.error("Failed to convert currency. Please try again.");
      setIsConverting(false);
      return null;
    }
  };

  const handleConvertToUSD = async () => {
    if (priceRub) {
      const convertedAmount = await convertCurrency("RUB", "USD", +priceRub);
      if (convertedAmount !== null) {
        setValue("price_usd", convertedAmount.toFixed(2).toString());
      }
    }
  };

  const handleConvertToRUB = async () => {
    if (priceUsd) {
      const convertedAmount = await convertCurrency("USD", "RUB", +priceUsd);
      if (convertedAmount !== null) {
        setValue("price_rub", convertedAmount.toFixed(2).toString());
      }
    }
  };

  const onSubmit: SubmitHandler<ProductFormValues> = (value) => {
    console.log("submit", value.category_id);
    if (recordId) {
      updateMutation.mutate({
        data: {
          active: value.active,
          name: value.name,
          // @ts-ignore
          files: value.files,
          description: value.description ?? "",
          price_rub: value.price_rub ? value.price_rub.toString() : "0",
          price_usd: value.price_usd ? value.price_usd.toString() : "0",
          category_id: value.category_id,
          properties: value.properties,
        },
        id: recordId,
      });
    } else {
      createMutation.mutate({
        active: value.active,
        name: value.name,
        // @ts-ignore
        files: value.files,
        description: value.description ?? "",
        price_rub: value.price_rub ? value.price_rub.toString() : "0",
        price_usd: value.price_usd ? value.price_usd.toString() : "0",
        category_id: value.category_id,
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
      price_rub?: string | null;
      price_usd?: string | null;
      category_id: string;
      properties: ProductProperties | null;
    }) => {
      return apiClient.api.products.post(
        {
          // @ts-ignore
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
        price_rub?: string | null;
        price_usd?: string | null;
        category_id?: string;
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

  const categoriesWithLevel = useMemo(() => {
    const categoriesWithLevel: TreeCategoriesWithLevel[] = [];
    const traverse = (categories: TreeCategoryDto[], level = 0) => {
      categories.forEach((category) => {
        categoriesWithLevel.push({ ...category, level });
        if (category.children) {
          traverse(category.children, level + 1);
        }
      });
    };
    if (categories && "data" in categories && Array.isArray(categories.data)) {
      traverse(categories.data);
    }
    return categoriesWithLevel;
  }, [categories]);

  return (
    <div className="flex w-full flex-col flex-grow">
      <form
        className="flex flex-col h-full"
        onSubmit={handleSubmit(onSubmit)}
        ref={formRef}
      >
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
                      isRequired
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
                      isRequired
                      onChange={field.onChange}
                      value={field.value ?? ""}
                      isInvalid={!!errors.description}
                      errorMessage={errors.description?.message}
                      variant="bordered"
                    />
                  )}
                />
                <Controller
                  name="category_id"
                  control={control}
                  rules={{ required: "Категория обязательная для зап" }}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Select
                        items={categoriesWithLevel}
                        label="Категория"
                        placeholder="Выберите категорию"
                        isRequired
                        variant="bordered"
                        selectedKeys={field.value}
                        popoverProps={{
                          portalContainer: formRef.current!,
                          offset: 0,
                          containerPadding: 0,
                        }}
                        onSelectionChange={(selectedKeys) => {
                          field.onChange([...selectedKeys][0]);
                        }}
                      >
                        {(category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id}
                            textValue={`${"\u00A0".repeat(
                              category.level * 2
                            )} ${category.name}`}
                          >
                            {"\u00A0\u00A0".repeat(category.level * 2)}
                            {category.name}
                          </SelectItem>
                        )}
                      </Select>
                      {errors.category_id && (
                        <p className="text-sm font-medium text-destructive">
                          {errors.category_id.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <Controller
                  name="price_rub"
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Цена в рублях"
                      placeholder="Цена"
                      type="number"
                      onChange={field.onChange}
                      value={field.value ? field.value.toString() : ""}
                      isInvalid={!!errors.price_rub}
                      errorMessage={errors.price_rub?.message}
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">₽</span>
                        </div>
                      }
                      endContent={
                        <Button
                          isIconOnly
                          color="primary"
                          size="sm"
                          onClick={handleConvertToUSD}
                          isLoading={isConverting}
                        >
                          <RefreshCw size={16} />
                        </Button>
                      }
                      variant="bordered"
                    />
                  )}
                />
                <Controller
                  name="price_usd"
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Цена в долларах"
                      placeholder="Цена"
                      type="number"
                      onChange={field.onChange}
                      value={field.value ? field.value.toString() : ""}
                      isInvalid={!!errors.price_usd}
                      errorMessage={errors.price_usd?.message}
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">$</span>
                        </div>
                      }
                      endContent={
                        <Button
                          isIconOnly
                          color="primary"
                          size="sm"
                          onClick={handleConvertToRUB}
                          isLoading={isConverting}
                        >
                          <RefreshCw size={16} />
                        </Button>
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
