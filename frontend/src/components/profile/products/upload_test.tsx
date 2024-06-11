import { apiClient } from "@frontend/src/utils/eden";
import { Input } from "@nextui-org/input";
import { useMutation } from "@tanstack/react-query";
import { useCookieState } from "use-cookie-state";
import { Input as ShadInput } from "@admin/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
export const UploadTest = () => {
  const [accessToken, setAccessToken] = useCookieState("x-token", "");
  const createMutation = useMutation({
    mutationFn: (newTodo: { name: string; file: File }) => {
      return apiClient.api.uploads.post(
        {
          ...newTodo,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    },
    onSuccess: () => {},
    onError: () => {},

    // {
    //   form.reset();
    //   //HSOverlay.close("#hs-overlay-ticket-add");
    //   queryClient.invalidateQueries({ queryKey: ["products"] });

    //   setOpen(false);
    // },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{
    name: string;
    file: File | null;
  }>();
  const onSubmit: SubmitHandler<{
    name: string;
    file: File | null;
  }> = async (value) => {
    console.log(value);
    createMutation.mutate({
      name: value.name,
      file: value.file!,
    });
  };
  //   const form = useForm<{
  //     name: string;
  //     file: File | null;
  //   }>({
  //     defaultValues: {
  //       name: "",
  //       file: null,
  //     },
  //     onSubmit: async ({ value }) => {
  //       createMutation.mutate({
  //         name: value.name,
  //         file: value.file!,
  //       });
  //     },
  //   });
  return (
    <div>
      <h1>Upload Test</h1>
      <form className="flex flex-col h-full" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            {...register("name")}
            label="Название продукта"
            labelPlacement="outside"
            placeholder="Введите название продукта"
            variant="bordered"
          />
        </div>
        <div>
          <ShadInput
            placeholder="Введите название продукта"
            type="file"
            {...register("file")}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Отправить
        </button>
      </form>
    </div>
  );
};
