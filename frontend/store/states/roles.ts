import { RowSelectionState } from "@tanstack/react-table";
import { create } from "zustand";

interface IRolesStore {
  selectedRows: RowSelectionState;
  toggleSelected: (index: string) => void;
}

export const useRolesStore = create<IRolesStore>((set, get) => ({
  selectedRows: {},
  toggleSelected: (index) =>
    set((state) => {
      const selectedRows = { ...state.selectedRows };
      if (selectedRows[index]) {
        return {
          selectedRows: {},
        };
      } else {
        return {
          selectedRows: {
            [index]: true,
          },
        };
      }
    }),
}));
