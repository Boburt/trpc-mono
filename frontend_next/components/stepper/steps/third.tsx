import { CustomerThirdStep } from "@frontend_next/components/sign-up/stepper-forms/customer/third-step/third-step";
import { roleStore } from "@frontend_next/store/zustand/roleStore";

const thirdStepComponents: Record<string, React.FC> = {
  customer: CustomerThirdStep,
  manufacturer: CustomerThirdStep,
  service: CustomerThirdStep,
};

export const SignupWizardThirdStep = () => {
  const role = roleStore((state) => state.role);

  const CurrentComponent = thirdStepComponents[role];

  return <CurrentComponent />;
};
