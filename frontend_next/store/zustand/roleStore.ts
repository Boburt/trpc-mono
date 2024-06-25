import { create } from "zustand";

interface RoleState {
  role: string;
  setRole: (role: string) => void;
  orgType: string;
  setOrgType: (orgType: string) => void;
  service_type: string;
  setService_type: (service_type: string) => void;
}

export const roleStore = create<RoleState>((set) => ({
  role: "",
  setRole: (role: string) => set({ role }),
  orgType: "sole-proprietorship",
  setOrgType: (orgType: string) => set({ orgType }),
  service_type: "",
  setService_type: (service_type: string) => set({ service_type }),
}));
