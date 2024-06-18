import { Users, Factory, FileSliders } from "lucide-react";
import { create } from "zustand";

const useStore = create<{ role: string; setRole: (role: string) => void }>(
  (set) => ({
    role: "",
    setRole: (role) => set({ role }),
  })
); // create a store

export const SignupWizardFirstStep = () => {
  const role = useStore((state) => state.role);
  const setRole = useStore((state) => state.setRole);
  return (
    <div className="flex flex-col p-8">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Выберите Вашу роль</h1>
            <div className="space-x-16 pt-10 flex">
              <button
                onClick={() => useStore.setRole("customer")}
                className="btn btn-primary select flex items-center flex-col rounded-md p-6 shadow-medium hover:shadow-lg  hover:border-gray-300  dark:hover:border-gray-300 border-3 w-56"
              >
                <Users className=" h-12 w-12" /> <p>Заказчик</p>
              </button>
              <button
                onClick={() => useStore.setRole("manufacturer")}
                className="btn btn-primary flex items-center flex-col rounded-md p-6 shadow-medium hover:shadow-lg  hover:border-gray-300  dark:hover:border-gray-300 border-3 w-56"
              >
                <Factory className="h-12 w-12" /> Производитель
              </button>
              <button
                onClick={() => useStore.setRole("service")}
                className="btn btn-primary flex items-center flex-col rounded-md p-6 shadow-medium hover:shadow-lg  hover:border-gray-300  dark:hover:border-gray-300 border-3 w-56"
              >
                <FileSliders className="h-12 w-12" /> Оказание услуг
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
