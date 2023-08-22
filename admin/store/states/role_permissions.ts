import { RowSelectionState } from "@tanstack/react-table";
import { create } from "zustand";

interface IRolePermissionsStore {
  selectedRows: RowSelectionState;
  setSelectedRows: (selectedRows: RowSelectionState) => void;
  addSelection: (index: string) => void;
}

export const useRolePermissionStore = create<IRolePermissionsStore>(
  (set, get) => ({
    selectedRows: {},
    setSelectedRows: (selectedRows) =>
      set((state) => {
        return {
          selectedRows,
        };
      }),
    addSelection: (index) =>
      set((state) => {
        const selectedRows = { ...state.selectedRows };
        if (selectedRows[index]) {
          delete selectedRows[index];
        } else {
          selectedRows[index] = true;
        }
        return {
          selectedRows,
        };
      }),
  })
);
