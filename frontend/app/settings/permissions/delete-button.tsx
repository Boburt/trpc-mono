import { usePermissionsDestroy } from "@frontend/store/permission";

export function DeleteButton(recordId: string) {
  const { mutateAsync: updatePermission } = usePermissionsUpdate({});
}
