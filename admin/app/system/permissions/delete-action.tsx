import { DeleteButton } from "@components/ui/delete-button";
import { usePermissionsDestroy } from "@admin/store/apis/permission";
import useToken from "@admin/store/get-token";
import { apiClient } from "@admin/utils/eden";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function DeleteAction({ recordId }: { recordId: string }) {
  const queryClient = useQueryClient();
  const token = useToken();
  const createMutation = useMutation({
    mutationFn: () => {
      return apiClient.api.permissions[recordId].delete({
        $headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
    },
  });

  return (
    <DeleteButton
      recordId={recordId}
      deleteRecord={() => createMutation.mutate()}
    />
  );
}
