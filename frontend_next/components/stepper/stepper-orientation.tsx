import * as React from "react";

import { Step, Stepper, useStepper } from "@frontend_next/components/stepper";

import type { StepItem, StepperProps } from "./types";
import { Button } from "@frontend_next/components/ui/button";
import { Label } from "@frontend_next/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@frontend_next/components/ui/radio-group";

const steps = [
  { label: "Step 1" },
  { label: "Step 2" },
  { label: "Step 3" },
] satisfies StepItem[];

export default function StepperOrientation() {
  const [orientation, setOrientation] =
    React.useState<StepperProps["orientation"]>("vertical");

  return (
    <div className="flex w-full flex-col gap-4">
      <RadioGroup
        className="mb-2 flex"
        value={orientation}
        onValueChange={(value) =>
          setOrientation(value as StepperProps["orientation"])
        }
      >
        <Label
          htmlFor="horizontal"
          className="flex w-fit flex-col gap-3 rounded-md border bg-background px-2 py-1 hover:bg-gray-3 [&:has([data-state=checked])]:border-primary"
        >
          <RadioGroupItem
            value="horizontal"
            id="horizontal"
            className="sr-only"
          />
          <h2 className="font-medium">Horizontal</h2>
        </Label>
        <Label
          htmlFor="vertical"
          className="flex w-fit flex-col gap-3 rounded-md border bg-background px-2 py-1 hover:bg-gray-3 [&:has([data-state=checked])]:border-primary"
        >
          <RadioGroupItem value="vertical" id="vertical" className="sr-only" />
          <h2 className="font-medium">Vertical</h2>
        </Label>
      </RadioGroup>
      <Stepper orientation={orientation} initialStep={0} steps={steps}>
        {steps.map((stepProps, index) => {
          return (
            <Step key={stepProps.label} {...stepProps}>
              <div className="h-40 flex items-center justify-center my-4 border bg-secondary text-primary rounded-md">
                <h1 className="text-xl">Step {index + 1}</h1>
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
