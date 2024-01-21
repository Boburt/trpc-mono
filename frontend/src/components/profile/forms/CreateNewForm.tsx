import {
  BuilderView,
  FormBuilder,
  IFormStorage,
} from "@react-form-builder/designer";
import { rSuiteComponents } from "@react-form-builder/components-rsuite";
import { BiDi, IFormViewer, Language } from "@react-form-builder/core";
import ru_RU from "./ru_RU";
import uz_UZ from "./uz_UZ";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { IndexedDbFormStorage } from "./IndexedDbFormStorage";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import type { Field, RuleGroupType } from "react-querybuilder";
import { QueryBuilder, formatQuery } from "react-querybuilder";
import { QueryBuilderFluent } from "@react-querybuilder/fluent";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { useMutation } from "@tanstack/react-query";
import { useStore } from "@nanostores/react";
import { $accessToken } from "@frontend/src/store/auth";
import { apiClient } from "@frontend/src/utils/eden";

const components = rSuiteComponents.map((c) => c.build());
const builderView = new BuilderView(components);
const ruLanguage = new Language("ru", "RU", "Русский", "Русский", BiDi.LTR);
const uzLanguage = new Language("uz", "UZ", "O'zbekcha", "O'zbekcha", BiDi.LTR);

const locales = {
  "ru-RU": { componentsLocale: "ru_RU", data: ru_RU },
  "uz-UZ": { componentsLocale: "uz_UZ", data: uz_UZ },
};

const steps = [
  {
    title: "Форма",
    description: "Соберите форму из полей",
  },
  {
    title: "Дополнительные настройки",
    description:
      "Укажите название формы и выберите пользователей и время отправки формы",
  },
];

const formName = "form_builder";

const formStorage = new IndexedDbFormStorage(formName, "forms");

const emptyForm = `
{
  "version": "1",
  "tooltipType": "RsTooltip",
  "errorType": "RsErrorMessage",
  "form": {
    "key": "Screen",
    "type": "Screen",
    "props": {},
    "children": [
    ]
  },
  "localization": {},
  "languages": [
    {
      "code": "ru",
      "dialect": "RU",
      "name": "Русский",
      "description": "Русский",
      "bidi": "ltr"
    }
  ],
  "defaultLanguage": "ru-RU"
}
`;

const initialQuery: RuleGroupType = {
  combinator: "and",
  rules: [],
};

const fields: Field[] = [
  {
    name: "role",
    label: "Роль",
    valueEditorType: "select",
    values: [
      {
        name: "manufacturer",
        label: "Производитель",
      },
      {
        name: "customer",
        label: "Заказчик",
      },
      {
        name: "lawyer",
        label: "Юрист",
      },
      {
        name: "logistic",
        label: "Логист",
      },
    ],
  },
  { name: "created_at", label: "Дата регистрации", inputType: "date" },
];

const operators = [
  { name: "=", label: "=" },
  { name: "!=", label: "!=" },
  { name: "<", label: "<" },
  { name: ">", label: ">" },
  { name: "<=", label: "<=" },
  { name: ">=", label: ">=" },
  { name: "contains", label: "Содержит" },
  { name: "beginsWith", label: "Начинается с" },
  { name: "endsWith", label: "Заканчивается на" },
  { name: "doesNotContain", label: "Не содержит" },
  { name: "doesNotBeginWith", label: "Не начинается с" },
  { name: "doesNotEndWith", label: "Не заканчивается на" },
  { name: "null", label: "Пусто" },
  { name: "notNull", label: "Не пусто" },
  { name: "in", label: "Входит в" },
  { name: "notIn", label: "Не входит в" },
  { name: "between", label: "Между" },
  { name: "notBetween", label: "Не между" },
];

export const CreateNewForm = () => {
  const accessToken = useStore($accessToken);
  const ref = useRef<IFormViewer>(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const [query, setQuery] = useState(initialQuery);

  const createMutation = useMutation({
    mutationFn: async (newTodo: {
      name: string;
      form_json: string;
      form_recipients: string;
      schedule_type: string;
      schedule_time?: string;
    }) => {
      const { data, error, status } = await apiClient.api.forms.post({
        data: newTodo,
        $headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (status === 200) {
        return data;
      } else {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Обращение успешно создано");
      location.href = "/profile/forms";
    },
    onError: (error: any) => {
      toast.error(
        error.value && error.value.message
          ? error.value.message
          : JSON.stringify(error.value)
      );
    },
  });

  const form = useForm<{
    name: string;
    schedule_type: string;
    schedule_time?: string;
    appliers: Record<string, string>;
  }>({
    defaultValues: {
      name: "",
      schedule_type: "",
      appliers: {},
    },
    onSubmit: async ({ value }) => {
      const formJson = await formStorage?.getForm(formName);
      const form_json = formJson;
      const form_recipients = formatQuery(query, "json_without_ids");
      console.log("value", value);
      createMutation.mutate({
        name: value.name,
        form_json,
        form_recipients,
        schedule_type: value.schedule_type,
        schedule_time: value.schedule_time,
      });
    },
  });

  const handleNext = async () => {
    console.log("builderView", builderView);
    console.log("saving ref", ref.current?.formData.state);
    // setTimeout(async () => {
    const formJson = await formStorage?.getForm(formName);
    const form = JSON.parse(formJson);
    console.log("davr", form);
    if (form.form.children && form.form.children.length === 0) {
      toast.error("Сохраните форму для продолжения");
      return;
    }
    if (!form.form.children) {
      toast.error("Форма пустая");
      return;
    }

    setActiveIndex(activeIndex + 1);
    // }, 200);
  };

  const handlePrev = () => {
    setActiveIndex(activeIndex - 1);
  };

  const activeStep = steps[activeIndex - 1];

  useEffect(() => {
    formStorage.saveForm(formName, emptyForm);
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Create New Form</h1>
      <div className="w-full">
        <ul className="relative flex flex-row gap-x-2 w-2/4 mx-auto">
          {steps.map((step, index) => {
            const isActive = index + 1 === activeIndex;
            const isCompleted = index + 1 < activeIndex;
            return (
              <li
                className="flex items-center gap-x-2 shrink basis-0 flex-1 group active"
                key={step.title}
              >
                <span className="min-w-[28px] min-h-[28px] group inline-flex items-center text-xs align-middle focus:outline-none disabled:opacity-50 disabled:pointer-events-none">
                  <span
                    className={clsx([
                      "w-7 h-7 flex justify-center items-center flex-shrink-0  font-medium  rounded-full group-focus:bg-gray-200 dark:bg-gray-700 dark:text-white dark:group-focus:bg-gray-600",
                      !isActive && !isCompleted && "text-gray-800 bg-gray-100",
                      isActive && "bg-blue-600 text-white",
                      isCompleted && "bg-blue-600 text-white",
                    ])}
                  >
                    {!isCompleted && <span>{index + 1}</span>}
                    {isCompleted && (
                      <svg
                        className="flex-shrink-0 h-3 w-3"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </span>
                  <span className="ms-2 text-sm font-medium text-gray-800 group-focus:text-gray-500 dark:text-white dark:group-focus:text-gray-400">
                    {step.title}
                  </span>
                </span>
                <div className="w-full h-px flex-1 bg-gray-200 group-last:hidden dark:bg-blue-500 hs-stepper-success:bg-blue-600 hs-stepper-completed:bg-teal-600"></div>
              </li>
            );
          })}
        </ul>
        <div className="mt-5 sm:mt-8">
          <div
            className={clsx([
              "mb-5 space-y-2",
              activeIndex === 1 ? "block" : "hidden",
            ])}
          >
            <div
              className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 dark:bg-gray-800 dark:border-gray-700"
              role="alert"
            >
              <div className="flex">
                <div className="ms-3">
                  <h3 className="text-gray-800 font-semibold dark:text-white">
                    {activeStep.description}
                  </h3>
                </div>
              </div>
            </div>
            <FormBuilder
              view={builderView}
              language={ruLanguage}
              formStorage={formStorage}
              viewerRef={ref}
              formName="form_builder"
              initialData={{}}
              i18n={{
                languages: [ruLanguage, uzLanguage],
                getData: (locale) => {
                  return Promise.resolve(
                    locales[locale as keyof typeof locales]
                  );
                },
              }}
            />
          </div>
          <div
            className={clsx([
              "mb-5 space-y-6",
              activeIndex === 2 ? "block" : "hidden",
            ])}
          >
            <div
              className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 dark:bg-gray-800 dark:border-gray-700"
              role="alert"
            >
              <div className="flex">
                <div className="ms-3">
                  <h3 className="text-gray-800 font-semibold dark:text-white">
                    {activeStep.description}
                  </h3>
                </div>
              </div>
            </div>
            <div>
              <form.Provider>
                <form
                  className="space-y-4 w-full mx-auto md:w-2/4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    void form.handleSubmit();
                  }}
                >
                  <form.Field
                    name="name"
                    validators={{
                      onChange({ value }) {
                        if (!value) {
                          return "Введите название";
                        }
                      },
                    }}
                  >
                    {(field) => (
                      <div>
                        <label className="block text-sm font-bold mb-2 dark:text-white">
                          Название
                        </label>

                        <div className="relative">
                          <input
                            type="text"
                            className={clsx([
                              "border py-2 px-3 pe-11 block w-full shadow-sm rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none  dark:text-gray-400",
                              field.state.meta.errors &&
                              field.state.meta.errors.length
                                ? "border-red-500 focus:ring-red-500 focus:border-red-500 dark:bg-slate-900 dark:border-gray-700 dark:focus:ring-gray-600"
                                : "border-gray-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:focus:ring-gray-600",
                            ])}
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                          />
                          {field.state.meta.errors &&
                          field.state.meta.errors.length ? (
                            <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                              <svg
                                className="flex-shrink-0 h-4 w-4 text-red-500"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" x2="12" y1="8" y2="12" />
                                <line x1="12" x2="12.01" y1="16" y2="16" />
                              </svg>
                            </div>
                          ) : null}
                        </div>
                        {field.state.meta.errors ? (
                          <p className="text-sm text-red-600 mt-2">
                            {field.state.meta.errors.join(", ")}
                          </p>
                        ) : null}
                      </div>
                    )}
                  </form.Field>
                  <form.Field
                    name="appliers"
                    validators={{
                      onChange({ value }) {
                        if (!value) {
                          return "Выберите получателей";
                        }
                      },
                    }}
                  >
                    {(field) => (
                      <div>
                        <label className="block text-sm font-bold mb-2 dark:text-white">
                          Получатели
                        </label>
                        <FluentProvider theme={webLightTheme}>
                          <QueryBuilderFluent>
                            <QueryBuilder
                              fields={fields}
                              query={query}
                              onQueryChange={(query) => setQuery(query)}
                              operators={operators}
                            />
                          </QueryBuilderFluent>
                        </FluentProvider>
                      </div>
                    )}
                  </form.Field>
                  <form.Field
                    name="schedule_type"
                    validators={{
                      onChange({ value }) {
                        if (!value) {
                          return "Выберите время отправки";
                        }
                      },
                    }}
                  >
                    {(field) => (
                      <div>
                        <label className="block text-sm font-bold mb-2 dark:text-white">
                          Время отправки
                        </label>
                        <ul className="flex flex-col sm:flex-row">
                          <li className="cursor-pointer inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                            <div className="relative flex items-start w-full">
                              <div className="flex items-center h-5">
                                <input
                                  id="schedule_type-later"
                                  type="radio"
                                  name={field.name}
                                  className="border-gray-200 rounded-full disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  value="later"
                                  onBlur={field.handleBlur}
                                  onChange={(e) =>
                                    field.handleChange(e.target.value)
                                  }
                                />
                              </div>
                              <label
                                htmlFor="schedule_type-later"
                                className="cursor-pointer ms-3 block w-full text-sm text-gray-600 dark:text-gray-500"
                              >
                                Позже вручную
                              </label>
                            </div>
                          </li>

                          <li className="cursor-pointer inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                            <div className="relative flex items-start w-full">
                              <div className="flex items-center h-5">
                                <input
                                  id="schedule_type-now"
                                  name={field.name}
                                  type="radio"
                                  className="border-gray-200 rounded-full disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  value="now"
                                  onBlur={field.handleBlur}
                                  onChange={(e) =>
                                    field.handleChange(e.target.value)
                                  }
                                />
                              </div>
                              <label
                                htmlFor="schedule_type-now"
                                className="cursor-pointer ms-3 block w-full text-sm text-gray-600 dark:text-gray-500"
                              >
                                Сейчас
                              </label>
                            </div>
                          </li>

                          <li className="cursor-pointer inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                            <div className="relative flex items-start w-full">
                              <div className="flex items-center h-5">
                                <input
                                  id="schedule_type-scheduled"
                                  name={field.name}
                                  type="radio"
                                  className="border-gray-200 rounded-full disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  value="scheduled"
                                  onBlur={field.handleBlur}
                                  onChange={(e) =>
                                    field.handleChange(e.target.value)
                                  }
                                />
                              </div>
                              <label
                                htmlFor="schedule_type-scheduled"
                                className="cursor-pointer ms-3 block w-full text-sm text-gray-600 dark:text-gray-500"
                              >
                                Запланировать
                              </label>
                            </div>
                          </li>
                        </ul>
                        {field.state.meta.errors ? (
                          <p className="text-sm text-red-600 mt-2">
                            {field.state.meta.errors.join(", ")}
                          </p>
                        ) : null}
                      </div>
                    )}
                  </form.Field>
                  <form.Subscribe
                    selector={(state) => [state.values.schedule_type]}
                  >
                    {([value]) =>
                      value === "scheduled" && (
                        <form.Field
                          name="schedule_time"
                          validators={{
                            onChange({ value }) {
                              if (!value) {
                                return "Выберите время отправки";
                              }
                            },
                          }}
                        >
                          {(field) => (
                            <div>
                              <label className="block text-sm font-bold mb-2 dark:text-white">
                                Запланированное время
                              </label>
                              <div className="relative">
                                <input
                                  type="datetime-local"
                                  className={clsx([
                                    "border py-2 px-3 pe-11 block w-full shadow-sm rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none  dark:text-gray-400",
                                    field.state.meta.errors &&
                                    field.state.meta.errors.length
                                      ? "border-red-500 focus:ring-red-500 focus:border-red-500 dark:bg-slate-900 dark:border-gray-700 dark:focus:ring-gray-600"
                                      : "border-gray-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:focus:ring-gray-600",
                                  ])}
                                  id={field.name}
                                  name={field.name}
                                  value={field.state.value}
                                  onBlur={field.handleBlur}
                                  onChange={(e) =>
                                    field.handleChange(e.target.value)
                                  }
                                />
                                {field.state.meta.errors &&
                                field.state.meta.errors.length ? (
                                  <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                                    <svg
                                      className="flex-shrink-0 h-4 w-4 text-red-500"
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <circle cx="12" cy="12" r="10" />
                                      <line x1="12" x2="12" y1="8" y2="12" />
                                      <line
                                        x1="12"
                                        x2="12.01"
                                        y1="16"
                                        y2="16"
                                      />
                                    </svg>
                                  </div>
                                ) : null}
                              </div>
                              {field.state.meta.errors ? (
                                <p className="text-sm text-red-600 mt-2">
                                  {field.state.meta.errors.join(", ")}
                                </p>
                              ) : null}
                            </div>
                          )}
                        </form.Field>
                      )
                    }
                  </form.Subscribe>
                </form>
              </form.Provider>
            </div>
          </div>

          <div className="mt-5 flex justify-between items-center gap-x-2">
            <button
              type="button"
              disabled={createMutation.isPending}
              onClick={handlePrev}
              className={clsx([
                "py-2 px-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none",
                activeIndex === 1 ? "invisible" : "visible",
              ])}
            >
              <svg
                className="flex-shrink-0 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Назад
            </button>
            <button
              type="button"
              onClick={handleNext}
              className={clsx([
                "py-2 px-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none",
                activeIndex === 2 ? "invisible" : "visible",
              ])}
            >
              Далее
              <svg
                className="flex-shrink-0 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
            <button
              type="button"
              disabled={createMutation.isPending}
              onClick={() => {
                void form.handleSubmit();
              }}
              className={clsx([
                "py-2 px-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none",
                activeIndex === 2 ? "block" : "hidden",
              ])}
            >
              {createMutation.isPending ? (
                <>
                  <span
                    className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full"
                    role="status"
                    aria-label="loading"
                  ></span>
                  Загрузка...
                </>
              ) : (
                "Сохранить"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
