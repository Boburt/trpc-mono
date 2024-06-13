import {
  $currentStep,
  $nextStep,
} from "@frontend/src/store/sign_new_manufacturer_wizard";
import { useStore } from "@nanostores/react";
import { AiOutlineClose, AiFillCheckCircle } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { useForm } from "react-hook-form";
import { VscOrganization, VscPerson } from "react-icons/vsc";

type SecondFormData = {
  brandName: string;
  companyName: string;
  companyCategory: string;
  companyCity: string;
};

type FirstFormData = {
  roleName: string;
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
      <div className="grid h-screen w-full">
        <div className="flex justify-center items-center">
          <div className="max-w-md">
            <div className="flex space-x-5 justify-around mt-5">
              <a
                href="/sign-up/existing"
                className="w-44 aspect-square shadow-lg rounded-xl bg-primary flex flex-col space-y-3 justify-center items-center text-white font-bold text-lg cursor-pointer hover:bg-opacity-80 transition-colors duration-300 ease-in-out"
              >
                <span>
                  <VscOrganization size="4rem" />
                </span>
                <span>Существующей</span>
              </a>

              <a
                href="/sign-up/new"
                className="w-44 aspect-square shadow-lg rounded-xl bg-primary flex flex-col space-y-3 justify-center items-center text-white font-bold text-lg cursor-pointer hover:bg-opacity-80 transition-colors duration-300 ease-in-out"
              >
                <span>
                  <VscPerson size="4rem" />
                </span>
                <span> Новой</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

const SecondStepForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SecondFormData>();
  const onSubmit = handleSubmit((data) => $nextStep());
  return (
    <form onSubmit={onSubmit}>
      <div className="flex items-start justify-around">
        <div className="flex flex-col">
          {/* <div className="w-24 aspect-square rounded-full bg-gradient-to-b from-gray-300 from-5% flex items-center justify-around mx-auto mb-3">
            <div className="w-16 bg-white border aspect-square rounded-full shadow-md flex items-center justify-around">
              <VscOrganization size={20} />
            </div>
          </div> */}
          <h2 className="text-balance text-2xl dark:text-white uppercase">
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

const ThirdStepForm = () => {
  return <div>Second Screen</div>;
};

const StepForms: Record<number, () => JSX.Element> = {
  1: FirstStepForm,
  2: SecondStepForm,
};

export const SetupNewUserWizard = () => {
  const currentStep = useStore($currentStep);
  const steps = [
    {
      number: 1,
      text: "Выбор роли",
    },
    {
      number: 2,
      text: "Компания",
    },
    {
      number: 3,
      text: "Профиль",
    },
    {
      number: 4,
      text: "Итого",
    },
  ];
  const CurrentForm = StepForms[currentStep];
  return (
    <div className="flex items-center justify-start p-4">
      <div className="flex h-[calc(100vh_-_40px)] w-full gap-x-2">
        <div className="bg-gradient-to-b flex flex-col flex-shrink-0 from-default-100 gap-y-8 h-full hidden items-start lg:flex px-8 py-6 rounded-large shadow-small to-secondary-100 via-danger-100 w-[344px]">
          <div>
            <a href="/sign-up/">
              <AiOutlineClose />
            </a>
          </div>
          <div>
            <div></div>
          </div>

          {steps.map((step, index) => (
            <div className="flex space-x-3" key={index}>
              <div>
                {step.number < currentStep && (
                  <AiFillCheckCircle size={24} color="#3BC592" />
                )}
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
              {index != steps.length - 1}
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 relative">
        <CurrentForm />
      </div>
    </div>
  );
};
