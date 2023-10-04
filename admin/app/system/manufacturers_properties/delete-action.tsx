import { DeleteButton } from "@components/ui/delete-button";
import { useManufacturersPropertiesCategoriesDestroy } from "@admin/store/apis/manufacturers_properties_categories";

export default function DeleteAction({ recordId }: { recordId: string }) {
  const { mutateAsync: deletePermission } =
    useManufacturersPropertiesCategoriesDestroy({});

  return <DeleteButton recordId={recordId} deleteRecord={deletePermission} />;
}
