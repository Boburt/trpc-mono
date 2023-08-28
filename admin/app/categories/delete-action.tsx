import { DeleteButton } from "@components/ui/delete-button";
import { usePermissionsDestroy } from "@admin/store/apis/permission";

export default function DeleteAction({ recordId }: { recordId: string }) {
  const { mutateAsync: deletePermission } = usePermissionsDestroy({});

  return <DeleteButton recordId={recordId} deleteRecord={deletePermission} />;
}
