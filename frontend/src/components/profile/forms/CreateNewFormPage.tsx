import Providers from "@frontend/src/store/provider";
import { CreateNewForm } from "./CreateNewForm";

export const CreateNewFormPage = () => {
  return (
    <Providers>
      <CreateNewForm />
    </Providers>
  );
};
