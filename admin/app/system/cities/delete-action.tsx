import { DeleteButton } from "@components/ui/delete-button";
import { useCitiesDestroy } from "@admin/store/apis/cities";

export default function DeleteAction({ recordId }: { recordId: string }) {
  const { mutateAsync: deletePermission } = useCitiesDestroy({});

  return <DeleteButton recordId={recordId} deleteRecord={deletePermission} />;
}
