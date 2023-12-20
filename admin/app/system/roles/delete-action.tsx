import { DeleteButton } from "@components/ui/delete-button";
import { useRolesDestroy } from "@admin/store/apis/roles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToken from "@admin/store/get-token";
import { apiClient } from "@admin/utils/eden";

export default function DeleteAction({ recordId }: { recordId: string }) {
  const queryClient = useQueryClient();
  const token = useToken();
  const createMutation = useMutation({
    mutationFn: () => {
      return apiClient.api.roles[recordId].delete({
        $headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });

  return (
    <DeleteButton
      recordId={recordId}
      deleteRecord={() => createMutation.mutate()}
    />
  );
}
