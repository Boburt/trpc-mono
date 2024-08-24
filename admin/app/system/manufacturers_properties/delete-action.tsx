import { DeleteButton } from "@components/ui/delete-button";
import { useManufacturersPropertiesCategoriesDestroy } from "@admin/store/apis/manufacturers_properties_categories";
import useToken from "@admin/store/get-token";
import { apiClient } from "@admin/utils/eden";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export default function DeleteAction({ recordId }: { recordId: string }) {
  const queryClient = useQueryClient();
  const token = useToken();
  const createMutation = useMutation({
    mutationFn: () => {
      return apiClient.api.manufacturers_properties_categories[recordId].delete(
        {
          $headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["manufacturers_properties_categories"],
      });
    },
  });

  return (
    <DeleteButton
      recordId={recordId}
      deleteRecord={() => createMutation.mutate()}
    />
  );
}
