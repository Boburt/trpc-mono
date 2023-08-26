import { DeleteButton } from "@components/ui/delete-button";
import { useLangsDestroy } from "@admin/store/apis/langs";

export default function DeleteAction({ recordId }: { recordId: string }) {
  const { mutateAsync: deletePermission } = useLangsDestroy({});

  return <DeleteButton recordId={recordId} deleteRecord={deletePermission} />;
}
