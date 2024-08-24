import { useForm } from "@tanstack/react-form";
import { $accessToken } from "@frontend/src/store/auth";
import { apiClient } from "@frontend/src/utils/eden";
import { useStore } from "@nanostores/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { toast } from "sonner";

export const ChatSendForm = ({ ticket_id }: { ticket_id: string }) => {
  const accessToken = useStore($accessToken);
  const queryClient = useQueryClient();
  const form = useForm<{
    comment: string;
  }>({
    defaultValues: {
      comment: "",
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      createMutation.mutate(value);
    },
  });
  const createMutation = useMutation({
    mutationFn: (newTodo: { comment: string }) => {
      return apiClient.api.sp_ticket_comments.post({
        data: { ...newTodo, ticket_id },
        $headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    },
    onSuccess: () => {
      form.reset();
      //   HSOverlay.close("#hs-overlay-ticket-add");
      queryClient.invalidateQueries({ queryKey: ["sp_ticket_comments"] });

      toast.success("Комментарий успешно отправлено");
    },
  });
  return (
    <form.Provider>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
        className="flex gap-3"
      >
        <form.Field
          name="comment"
          validators={{
            onChange({ value }) {
              if (value.length < 3) {
                return "Тема обращения должна быть не менее 3 символов";
              }
            },
          }}
        >
          {(field) => (
            <input
              type="text"
              className="flex-grow border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:bg-slate-900 dark:border-gray-700 dark:focus:ring-gray-600 dark:text-white"
              placeholder="Type your comment..."
              onChange={(e) => field.handleChange(e.target.value)}
              value={field.state.value}
            />
          )}
        </form.Field>
        <button
          className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 rounded-lg text-white px-6 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-500 dark:focus:ring-offset-2 dark:focus:ring-offset-slate-900 dark:focus:ring-white"
          type="submit"
        >
          Send
        </button>
      </form>
    </form.Provider>
  );
};
