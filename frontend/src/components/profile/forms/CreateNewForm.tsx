import { BuilderView, FormBuilder } from "@react-form-builder/designer";
import { rSuiteComponents } from "@react-form-builder/components-rsuite";
import { BiDi, Language } from "@react-form-builder/core";
import ru_RU from "./ru_RU";
import uz_UZ from "./uz_UZ";

const components = rSuiteComponents.map((c) => c.build());
const builderView = new BuilderView(components);
const ruLanguage = new Language("ru", "RU", "Русский", "Русский", BiDi.LTR);
const uzLanguage = new Language("uz", "UZ", "O'zbekcha", "O'zbekcha", BiDi.LTR);

const locales = {
  "ru-RU": { componentsLocale: "ru_RU", data: ru_RU },
  "uz-UZ": { componentsLocale: "uz_UZ", data: uz_UZ },
};

export const CreateNewForm = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Create New Form</h1>
      <FormBuilder
        view={builderView}
        language={ruLanguage}
        i18n={{
          languages: [ruLanguage, uzLanguage],
          getData: (locale) => {
            return Promise.resolve(locales[locale as keyof typeof locales]);
          },
        }}
      />
    </div>
  );
};
