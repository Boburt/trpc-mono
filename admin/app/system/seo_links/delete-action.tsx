import { DeleteButton } from "@components/ui/delete-button";
import { useSeoLinksDestroy } from "@admin/store/apis/seo_links";

export default function DeleteAction({ recordId }: { recordId: string }) {
  const { mutateAsync: deletePermission } = useSeoLinksDestroy({});

  return <DeleteButton recordId={recordId} deleteRecord={deletePermission} />;
}
