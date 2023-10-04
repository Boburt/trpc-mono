import { RowSelectionState } from "@tanstack/react-table";
import { create } from "zustand";

interface IManufacturersPropertiesCategoriesStore {
  selectedRows: RowSelectionState;
  toggleSelected: (index: string) => void;
}

export const useManufacturersPropertiesCategoriesStore =
  create<IManufacturersPropertiesCategoriesStore>((set, get) => ({
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
