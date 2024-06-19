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
import { CustomerSecondStep } from "../sign-up/stepper-forms/customer/second-step";

const steps = [
  { label: "Step 1" },
  { label: "Step 2" },
  { label: "Step 3" },
  { label: "Step 4" },
] satisfies StepItem[];

const stepComponents: Record<string, React.FC> = {
  "Step 1": SignupWizardFirstStep,
  "Step 2": CustomerSecondStep,
};

export default function StepperOrientation() {
  const [orientation, setOrientation] =
    React.useState<StepperProps["orientation"]>("vertical");
  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper orientation={orientation} initialStep={0} steps={steps}>
        {steps.map((stepProps, index) => {
          const CurrentStep = stepComponents[stepProps.label];
          return (
            <Step key={stepProps.label} {...stepProps}>
              <div className="flex items-center justify-center my-4 border bg-secondary text-primary rounded-md">
                <h1 className="text-xl">
                  <CurrentStep />
                </h1>
              </div>
            </Step>
          );
        })}
        <Footer />
      </Stepper>
    </div>
  );
}

const Footer = () => {
  const {
    nextStep,
    prevStep,
    resetSteps,
    isDisabledStep,
    hasCompletedAllSteps,
    isLastStep,
    isOptionalStep,
  } = useStepper();
  return (
    <>
      {hasCompletedAllSteps && (
        <div className="h-40 flex items-center justify-center border bg-secondary text-primary rounded-md">
          <h1 className="text-xl">Woohoo! All steps completed! 🎉</h1>
        </div>
      )}
      <div className="w-full flex justify-end gap-2">
        {hasCompletedAllSteps ? (
          <Button size="sm" onClick={resetSteps}>
            Reset
          </Button>
        ) : (
          <>
            <Button
              disabled={isDisabledStep}
              onClick={prevStep}
              size="sm"
              variant="secondary"
            >
              Prev
            </Button>
            <Button size="sm" onClick={nextStep}>
              {isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
            </Button>
          </>
        )}
      </div>
    </>
  );
};
