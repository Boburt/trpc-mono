import { DeleteButton } from "@components/ui/delete-button";
import { useManufacturersDestroy } from "@admin/store/apis/manufacturers";

export default function DeleteAction({ recordId }: { recordId: string }) {
  const { mutateAsync: deletePermission } = useManufacturersDestroy({});

  return <DeleteButton recordId={recordId} deleteRecord={deletePermission} />;
}
