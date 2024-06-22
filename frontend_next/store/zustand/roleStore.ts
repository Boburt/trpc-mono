import { create } from "zustand";

interface RoleState {
  role: string;
  setRole: (role: string) => void;
}

export const roleStore = create<RoleState>((set) => ({
  role: "",
  setRole: (role: string) => set({ role }),
}));
