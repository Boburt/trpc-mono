import { DeleteButton } from "@components/ui/delete-button";
import { useCategoriesDestroy } from "@admin/store/apis/categories";

export default function DeleteAction({ recordId }: { recordId: string }) {
  const { mutateAsync: deletePermission } = useCategoriesDestroy({});

  return <DeleteButton recordId={recordId} deleteRecord={deletePermission} />;
}
