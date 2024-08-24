import Providers from "@frontend/src/store/provider";
import { forms } from "backend/drizzle/schema";
import {
  RsLocalizationWrapper,
  ltrCssLoader,
  rSuiteComponents,
  rtlCssLoader,
} from "@react-form-builder/components-rsuite";
import { InferSelectModel } from "drizzle-orm";

import {
  BiDi,
  FormViewer,
  IFormViewer,
  Language,
  createView,
} from "@react-form-builder/core";

import ru_RU from "@frontend/src/components/profile/forms/ru_RU";
import uz_UZ from "@frontend/src/components/profile/forms/uz_UZ";
import { useRef, useState } from "react";
import { $accessToken } from "@frontend/src/store/auth";
import { apiClient } from "@frontend/src/utils/eden";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useStore } from "@nanostores/react";
import { useCookieState } from "use-cookie-state";

const ruLanguage = new Language("ru", "RU", "Русский", "Русский", BiDi.LTR);
const uzLanguage = new Language("uz", "UZ", "O'zbekcha", "O'zbekcha", BiDi.LTR);

const locales = {
  "ru-RU": { componentsLocale: "ru_RU", data: ru_RU },
  "uz-UZ": { componentsLocale: "uz_UZ", data: uz_UZ },
};

// Here you can pass the metadata of your components
const componentsMetadata = rSuiteComponents.map(
  (definer) => definer.build().model
);

const view = createView(componentsMetadata)
  // The following parameters are required for correct CSS loading in LTR and RTL modes
  .withViewerWrapper(RsLocalizationWrapper)
  .withCssLoader(BiDi.LTR, ltrCssLoader)
  .withCssLoader(BiDi.RTL, rtlCssLoader);

export const ProfileFormsApply = ({
  formItem,
  formSentItemId,
}: {
  formItem: InferSelectModel<typeof forms>;
  formSentItemId: string;
}) => {
  const [accessToken, setAccessToken] = useCookieState("x-token", "");
  const [isFilled, setIsFilled] = useState(false);
  const ref = useRef<IFormViewer>(null);
  const fillFormMutation = useMutation({
    mutationFn: async (newTodo: Record<string, any>) => {
      const { data, error, status } = await apiClient.api.forms_sent_items[
        formSentItemId
      ].fill.post({
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
      setIsFilled(true);
    },
    onError: (error: any) => {
      toast.error(
        error.value && error.value.message
          ? error.value.message
          : JSON.stringify(error.value)
      );
    },
  });
  return (
    <div>
      {!isFilled ? (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            await ref.current?.formData.validate();
            if (!ref.current?.formData.hasErrors) {
              console.log(ref.current?.formData.data);
              if (ref.current?.formData.data) {
                fillFormMutation.mutate(ref.current?.formData.data);
              }
            }
          }}
        >
          <div className="mb-6">
            <FormViewer
              view={view}
              getForm={(_) => JSON.stringify(formItem.form_json)}
              language={ruLanguage}
              viewerRef={ref}
            />
          </div>
          <button
            type="submit"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            Отправить
          </button>
        </form>
      ) : (
        <div
          className="bg-teal-50 border-t-2 border-teal-500 rounded-lg p-4 dark:bg-teal-800/30 w-6/12 mx-auto"
          role="alert"
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="inline-flex justify-center items-center w-8 h-8 rounded-full border-4 border-teal-100 bg-teal-200 text-teal-800 dark:border-teal-900 dark:bg-teal-800 dark:text-teal-400">
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
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </span>
            </div>
            <div className="ms-3">
              <h3 className="text-gray-800 font-semibold dark:text-white">
                Спасибо за заполнение формы!
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const ProfileFormsApplyProvider = ({
  formItem,
  formSentItemId,
}: {
  formItem: InferSelectModel<typeof forms>;
  formSentItemId: string;
}) => {
  return (
    <Providers>
      <ProfileFormsApply formItem={formItem} formSentItemId={formSentItemId} />
    </Providers>
  );
};
