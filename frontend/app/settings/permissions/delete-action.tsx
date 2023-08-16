import { DeleteButton } from "@frontend/components/ui/delete-button";
import { usePermissionsDestroy } from "@frontend/store/permission";

export default function DeleteAction({ recordId }: { recordId: string }) {
  const { mutateAsync: deletePermission } = usePermissionsDestroy({});

  return <DeleteButton recordId={recordId} deleteRecord={deletePermission} />;
}
