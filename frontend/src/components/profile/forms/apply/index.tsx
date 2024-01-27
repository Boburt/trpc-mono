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
import { useRef } from "react";
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
}: {
  formItem: InferSelectModel<typeof forms>;
}) => {
  const ref = useRef<IFormViewer>(null);
  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await ref.current?.formData.validate();
          if (!ref.current?.formData.hasErrors) {
            console.log(ref.current?.formData.data);
          }
        }}
      >
        <div className="mb-6">
          <FormViewer
            view={view}
            getForm={(_) => formItem.form_json as string}
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
    </div>
  );
};

export const ProfileFormsApplyProvider = ({
  formItem,
}: {
  formItem: InferSelectModel<typeof forms>;
}) => {
  return (
    <Providers>
      <ProfileFormsApply formItem={formItem} />
    </Providers>
  );
};
