"use client";

import * as React from "react";

import {
  Step,
  type StepItem,
  Stepper,
  type StepperProps,
  useStepper,
} from "@frontend_next/components/stepper";
import { Button } from "@frontend_next/components/ui/button";
import { Label } from "@frontend_next/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@frontend_next/components/ui/radio-group";
import { SignupWizardFirstStep } from "./steps/first";
import { SignupWizardSecondStep } from "./steps/second";
import { SignupWizardThirdStep } from "./steps/third";
import { SignupWizardFourthStep } from "./steps/fourth";
import { toast } from "sonner";

const steps = [
  { label: "Шаг 1", id: "step_1" },
  { label: "Шаг 2", id: "step_2" },
  { label: "Шаг 3", id: "step_3" },
  { label: "Шаг 4", id: "step_4" },
] satisfies StepItem[];

const stepComponents: Record<string, React.FC> = {
  step_1: SignupWizardFirstStep,
  step_2: SignupWizardSecondStep,
  step_3: SignupWizardThirdStep,
  step_4: SignupWizardFourthStep,
};

export const StepperOrientation = () => {
  const [orientation, setOrientation] =
    React.useState<StepperProps["orientation"]>("vertical");
  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper orientation={orientation} initialStep={0} steps={steps}>
        {steps.map((stepProps, index) => {
          const CurrentStep = stepComponents[stepProps.id];
          return (
            <Step key={stepProps.label} {...stepProps}>
              <div className="my-4  border dark:border-none bg-content1 text-gray-600 dark:bg-slate-800  dark:text-gray-300 rounded-md">
                {CurrentStep && <CurrentStep />}
              </div>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
};
