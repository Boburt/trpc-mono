import {
  $currentStep,
  $nextStep,
} from "@frontend/src/store/sign_new_manufacturer_wizard";
import { useStore } from "@nanostores/react";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { useForm } from "react-hook-form";
import { VscOrganization, VscPerson } from "react-icons/vsc";

type FirstFormData = {
  brandName: string;
  companyName: string;
  companyCategory: string;
  companyCity: string;
};

const FirstStepForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FirstFormData>();
  const onSubmit = handleSubmit((data) => $nextStep());
  return (
    <form onSubmit={onSubmit}>
      <div className="flex items-start justify-around">
        <div className="flex flex-col">
          <div className="w-24 aspect-square rounded-full bg-gradient-to-b from-gray-300 from-5% flex items-center justify-around mx-auto mb-3">
            <div className="w-16 bg-white border aspect-square rounded-full shadow-md flex items-center justify-around">
              <VscOrganization size={20} />
            </div>
          </div>
          <h2 className="text-balance text-2xl uppercase">
            Расскажите о компании
          </h2>
          <div className="divider"></div>
          <div className="space-y-3">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Название бренда*</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full max-w-xs"
                {...register("brandName", {
                  required: true,
                })}
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Название компании*</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full max-w-xs"
                {...register("companyName", {
                  required: true,
                })}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-14 flex justify-end absolute bottom-0">
        <button type="submit" className="btn btn-primary">
          Вперёд
        </button>
      </div>
    </form>
  );
};

const SecondStepForm = () => {
  return <div>Second Screen</div>;
};

const StepForms: Record<number, () => JSX.Element> = {
  1: FirstStepForm,
  2: SecondStepForm,
};

export const SignNewManufacturerWizard = () => {
  const currentStep = useStore($currentStep);
  const steps = [
    {
      number: 1,
      text: "Компания",
    },
    {
      number: 2,
      text: "Профиль",
    },
    {
      number: 3,
      text: "Итого",
    },
  ];
  const CurrentForm = StepForms[currentStep];
  return (
    <div className="flex flex-col  h-[calc(100vh-100px)]">
      <div className="border-b shadow-md">
        <div className="container py-4 flex items-center justify-between mx-auto">
          <div></div>
          <div className="flex space-x-5">
            {steps.map((step, index) => (
              <div className="flex items-center space-x-3" key={index}>
                <div>
                  {step.number < currentStep && <span></span>}
                  {step.number == currentStep && (
                    <div className="w-6 aspect-square text-sm bg-primary text-white rounded-full font-bold flex items-center justify-around">
                      {step.number}
                    </div>
                  )}
                  {step.number > currentStep && (
                    <div className="w-6 aspect-square text-sm bg-transparent text-base-content border rounded-full font-bold flex items-center justify-around">
                      {step.number}
                    </div>
                  )}
                </div>
                <div className="text-lg">{step.text}</div>
                {index != steps.length - 1 && (
                  <div>
                    <IoIosArrowForward />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div>
            <a href="/sign-up/">
              <AiOutlineClose />
            </a>
          </div>
        </div>
      </div>
      <div className="flex-1 relative pt-10">
        <CurrentForm />
      </div>
    </div>
  );
};
