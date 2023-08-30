import { useToast } from "@admin/components/ui/use-toast";
import {
  useImageSizesCreate,
  useImageSizesUpdate,
} from "@admin/store/apis/image_sizes";
import { Button } from "@components/ui/button";
import { Switch } from "@components/ui/switch";
import { trpc } from "@admin/utils/trpc";
import { ImageSizesCreateInputSchema } from "@backend/lib/zod";
import { useMemo, useEffect } from "react";
import { Loader2 } from "lucide-react";
import * as z from "zod";
import { createFormFactory } from "@tanstack/react-form";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";

const formFactory = createFormFactory<
  z.infer<typeof ImageSizesCreateInputSchema>
>({
  defaultValues: {
    code: "",
    width: 500,
    height: 500,
  },
});

export default function ImageSizesForm({
  setOpen,
  recordId,
}: {
  setOpen: (open: boolean) => void;
  recordId?: string;
}) {
  const { toast } = useToast();

  const onAddSuccess = (actionText: string) => {
    toast({
      title: "Success",
      description: `Image Sizes ${actionText}`,
      duration: 5000,
    });
    // form.reset();
    setOpen(false);
  };

  const onError = (error: any) => {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
      duration: 5000,
    });
  };

  const {
    mutateAsync: createImageSizes,
    isLoading: isAddLoading,
    data,
    error,
  } = useImageSizesCreate({
    onSuccess: () => onAddSuccess("added"),
    onError,
  });

  const {
    mutateAsync: updateImageSizes,
    isLoading: isUpdateLoading,
    error: updateError,
  } = useImageSizesUpdate({
    onSuccess: () => onAddSuccess("updated"),
    onError,
  });

  const form = formFactory.useForm({
    onSubmit: async (values, formApi) => {
      if (values.width) {
        values.width = +values.width;
      }

      if (values.height) {
        values.height = +values.height;
      }

      if (recordId) {
        updateImageSizes({ data: values, where: { id: recordId } });
      } else {
        createImageSizes({ data: values });
      }
    },
  });

  const { data: record, isLoading: isRecordLoading } =
    trpc.imageSizes.one.useQuery(
      {
        where: { id: recordId },
      },
      {
        enabled: !!recordId,
      }
    );

  const isLoading = useMemo(() => {
    return isAddLoading || isUpdateLoading;
  }, [isAddLoading, isUpdateLoading]);

  useEffect(() => {
    if (record) {
      form.setFieldValue("code", record.code);
      form.setFieldValue("width", record.width);
      form.setFieldValue("height", record.height);
    }
  }, [record]);

  return (
    <form.Provider>
      <form {...form.getFormProps()} className="space-y-8">
        <div className="space-y-2">
          <div>
            <Label>Код</Label>
          </div>
          <form.Field name="code">
            {(field) => {
              return (
                <>
                  <Input
                    {...field.getInputProps()}
                    value={field.getValue() ?? ""}
                  />
                </>
              );
            }}
          </form.Field>
        </div>
        <div className="space-y-2">
          <div>
            <Label>Ширина</Label>
          </div>
          <form.Field name="width">
            {(field) => {
              return (
                <>
                  <Input
                    {...field.getInputProps()}
                    value={field.getValue() ?? ""}
                    type="number"
                  />
                </>
              );
            }}
          </form.Field>
        </div>
        <div className="space-y-2">
          <div>
            <Label>Высота</Label>
          </div>
          <form.Field name="height">
            {(field) => {
              return (
                <>
                  <Input
                    {...field.getInputProps()}
                    value={field.getValue() ?? ""}
                    type="number"
                  />
                </>
              );
            }}
          </form.Field>
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </form.Provider>
  );
}
