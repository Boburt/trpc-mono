import { DeleteButton } from "@frontend/components/ui/delete-button";
import { useRolesDestroy } from "@frontend/store/api/roles";

export default function DeleteAction({ recordId }: { recordId: string }) {
  const { mutateAsync: deletePermission } = useRolesDestroy({});

  return <DeleteButton recordId={recordId} deleteRecord={deletePermission} />;
}
