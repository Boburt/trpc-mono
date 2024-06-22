import { CustomerFourthStep } from "@frontend_next/components/sign-up/stepper-forms/customer/fourth-step/fourth-step";
import { roleStore } from "@frontend_next/store/zustand/roleStore";

const fourthStepComponents: Record<string, React.FC> = {
  customer: CustomerFourthStep,
  manufacturer: CustomerFourthStep,
  service: CustomerFourthStep,
};

export const SignupWizardFourthStep = () => {
  const role = roleStore((state) => state.role);

  const CurrentComponent = fourthStepComponents[role];

  return <CurrentComponent />;
};
