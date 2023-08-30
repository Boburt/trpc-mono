import { DeleteButton } from "@components/ui/delete-button";
import { useImageSizesDestroy } from "@admin/store/apis/image_sizes";

export default function DeleteAction({ recordId }: { recordId: string }) {
  const { mutateAsync: deletePermission } = useImageSizesDestroy({});

  return <DeleteButton recordId={recordId} deleteRecord={deletePermission} />;
}
