import { DeleteButton } from "@components/ui/delete-button";
import { useManufacturersReviewsDestroy } from "@admin/store/apis/manufacturers_reviews";

export default function DeleteAction({ recordId }: { recordId: string }) {
  const { mutateAsync: deletePermission } = useManufacturersReviewsDestroy({});

  return <DeleteButton recordId={recordId} deleteRecord={deletePermission} />;
}
