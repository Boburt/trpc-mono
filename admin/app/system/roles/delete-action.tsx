import { DeleteButton } from "@components/ui/delete-button";
import { useRolesDestroy } from "@admin/store/apis/roles";

export default function DeleteAction({ recordId }: { recordId: string }) {
  const { mutateAsync: deletePermission } = useRolesDestroy({});

  return <DeleteButton recordId={recordId} deleteRecord={deletePermission} />;
}
