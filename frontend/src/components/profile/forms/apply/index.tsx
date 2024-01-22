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
  Language,
  createView,
} from "@react-form-builder/core";

import ru_RU from "@frontend/src/components/profile/forms/ru_RU";
import uz_UZ from "@frontend/src/components/profile/forms/uz_UZ";
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
  return (
    <div>
      <FormViewer
        view={view}
        getForm={(_) => formItem.form_json as string}
        language={ruLanguage}
      />
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
