import { CustomerSecondStep } from "@frontend_next/components/sign-up/stepper-forms/customer/second-step/second-step";
import { roleStore } from "@frontend_next/store/zustand/roleStore";

const secondStepComponents: Record<string, React.FC> = {
  customer: CustomerSecondStep,
  manufacturer: CustomerSecondStep,
  service: CustomerSecondStep,
};

export const SignupWizardSecondStep = () => {
  const role = roleStore((state) => state.role);

  const CurrentComponent = secondStepComponents[role];

  return <CurrentComponent />;
};
