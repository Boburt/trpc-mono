import { CustomerSecondStep } from "@frontend_next/components/sign-up/stepper-forms/customer/second-step/second-step";
import { ManufacturerSecondStep } from "@frontend_next/components/sign-up/stepper-forms/manufacturer/second-step/second-step";
import { ServiceSecondStep } from "@frontend_next/components/sign-up/stepper-forms/service/second-step/second-step";
import { roleStore } from "@frontend_next/store/zustand/roleStore";

const secondStepComponents: Record<string, React.FC> = {
  customer: CustomerSecondStep,
  manufacturer: ManufacturerSecondStep,
  service: ServiceSecondStep,
};

export const SignupWizardSecondStep = () => {
  const role = roleStore((state) => state.role);

  const CurrentComponent = secondStepComponents[role];

  return <CurrentComponent />;
};
