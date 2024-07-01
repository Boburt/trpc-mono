import { create } from "zustand";

interface signUpWizardStore {
  role: { value: string; label: string };
  setRole: (role: { value: string; label: string }) => void;
  orgType: {
    value: string;
    label: string;
  };
  setOrgType: (orgType: { value: string; label: string }) => void;
  membershipId: string;
  setMembershipId: (membershipId: string) => void;
}

export const signUpWizardStore = create<signUpWizardStore>((set) => ({
  role: {
    value: "",
    label: "Заказчик",
  },
  setRole: (role: { value: string; label: string }) => set({ role }),
  orgType: {
    value: "sole-proprietorship",
    label: "Индивидуальный предприниматель",
  },
  setOrgType: (orgType: { value: string; label: string }) => set({ orgType }),
  membershipId: "",
  setMembershipId: (membershipId?: string) => set({ membershipId }),
}));
