import { FourthStep } from "@frontend_next/components/sign-up/stepper-forms/forms/fourth-step/fourth-step";
import { IndividualFourthStep } from "@frontend_next/components/sign-up/stepper-forms/forms/fourth-step/individual-fourth-step";

import { signUpWizardStore } from "@frontend_next/store/zustand/roleStore";

export const SignupWizardFourthStep = () => {
  const orgType = signUpWizardStore((state) => state.orgType);
  return orgType.value === "individual" ? (
    <IndividualFourthStep />
  ) : (
    <FourthStep />
  );
};
