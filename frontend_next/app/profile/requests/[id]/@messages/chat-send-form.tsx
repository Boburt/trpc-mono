import { useForm, Controller } from "react-hook-form";
import { apiClient } from "@frontend_next/lib/eden";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

export const ChatSendForm = ({ ticket_id }: { ticket_id: string }) => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ comment: string }>({
    defaultValues: {
      comment: "",
    },
  });
  const createMutation = useMutation({
    mutationFn: (newTodo: { comment: string }) => {
      return apiClient.api.sp_ticket_comments.post(
        {
          data: { ...newTodo, ticket_id },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    },
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["sp_ticket_comments"] });

      toast.success("Комментарий успешно отправлено");
    },
  });

  const onSubmit = (data: { comment: string }) => {
    createMutation.mutate(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 items-end">
      <Controller
        name="comment"
        control={control}
        rules={{
          required: "Комментарий должен быть не менее 3 символов",
          minLength: {
            value: 3,
            message: "Комментарий должен быть не менее 3 символов",
          },
        }}
        render={({ field }) => (
          <Input
            {...field}
            fullWidth
            label="Комментарий"
            placeholder="Наберите комментарий..."
            isInvalid={!!errors.comment}
            errorMessage={errors.comment?.message}
            variant="bordered"
            size="sm"
          />
        )}
      />
      <Button type="submit" color="primary">
        Отправить
      </Button>
    </form>
  );
};
