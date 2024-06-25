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
import { roleStore } from "@frontend_next/store/zustand/roleStore";
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
        {/* <Footer /> */}
      </Stepper>
    </div>
  );
};

// const Footer = () => {
//   const {
//     nextStep,
//     prevStep,
//     resetSteps,
//     currentStep,
//     isDisabledStep,
//     hasCompletedAllSteps,
//     isLastStep,
//     isOptionalStep,
//   } = useStepper();
//   const role = roleStore((state) => state.role);

//   const gotoNext = () => {
//     switch (currentStep.id) {
//       case "step_1":
//         if (role.length == 0) {
//           return toast.error("Выберите роль");
//         } else {
//           nextStep();
//         }
//         break;
//       case "step_2":

//         break;
//       case "step_3":
//         break;
//     }
//     // nextStep();
//   };

//   return (
//     <>
//       {hasCompletedAllSteps && (
//         <div className="h-40 flex items-center justify-center border bg-secondary text-primary rounded-md">
//           <h1 className="text-xl">Woohoo! All steps completed! 🎉</h1>
//         </div>
//       )}
//       <div className="w-full flex justify-end gap-2">
//         {hasCompletedAllSteps ? (
//           <Button size="sm" onClick={resetSteps}>
//             Reset
//           </Button>
//         ) : (
//           <>
//             <Button
//               disabled={isDisabledStep}
//               onClick={prevStep}
//               size="sm"
//               variant="secondary"
//             >
//               Prev
//             </Button>
//             <Button size="sm" onClick={gotoNext}>
//               {isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
//             </Button>
//           </>
//         )}
//       </div>
//     </>
//   );
// };
