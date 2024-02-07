import { apiClient } from "@frontend/src/utils/eden";
import { useStore } from "@nanostores/react";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useMemo } from "react";
import {
  $values,
  $facets,
  $isValuesFilled,
  setValue,
  removeValue,
  resetValues,
  setMultipleValues,
} from "@frontend/src/store/manufacturers_filter";
import { Divider } from "@nextui-org/divider";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { CheckboxGroup, Checkbox } from "@nextui-org/checkbox";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { useMediaQuery } from "@frontend/src/utils/hooks";

export const ManufacturersFilter = ({
  setOpen,
}: {
  setOpen?: (open: boolean) => void;
}) => {
  const facets = useStore($facets);
  const values = useStore($values);
  const isValuesFilled = useStore($isValuesFilled);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const expandedKeys = useMemo(() => {
    return facets?.map((f: any) => f.code) || [];
  }, [facets]);

  return (
    <>
      <div className=" bg-white mx-auto rounded-md items-center p-4 mb-2">
        <h2 className="text-large font-medium text-foreground mb-4">Фильтр</h2>
        <Divider />
        {facets && (
          <Accordion
            selectionMode="multiple"
            showDivider={false}
            defaultExpandedKeys={expandedKeys}
            className="px-0"
          >
            {facets.map((f: any) => (
              <AccordionItem
                key={f.code}
                title={f.name}
                className="flex flex-col gap-2"
              >
                {f.multiple ? (
                  <CheckboxGroup
                    size="sm"
                    defaultValue={values[f.code]}
                    onChange={(value) => {
                      setMultipleValues(f.code, value as string[]);
                    }}
                  >
                    {f.value.map((v: any) => (
                      <Checkbox key={v.value} value={v.value}>
                        <div className="flex items-center gap-2">
                          <div>{v.value}</div>
                          <span className="text-sm text-gray-500">
                            ({v.count})
                          </span>
                        </div>
                      </Checkbox>
                    ))}
                  </CheckboxGroup>
                ) : (
                  <RadioGroup
                    size="sm"
                    defaultValue={values[f.code]}
                    onChange={(e) => {
                      setValue(f.code, e.target.value);
                    }}
                  >
                    {f.value.map((v: any) => (
                      <Radio key={v.value} value={v.value}>
                        <div className="flex items-center gap-2">
                          <div>{v.value}</div>
                          <span className="text-sm text-gray-500">
                            ({v.count})
                          </span>
                        </div>
                      </Radio>
                    ))}
                  </RadioGroup>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        )}
        {isValuesFilled && (
          <>
            <Divider className="mt-2" />
            <button
              className="btn btn-outline btn-md flex justify-between w-full my-3 mx-auto"
              onClick={() => {
                resetValues();
              }}
            >
              <span>Сбросить фильтр</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </>
        )}
        {!isDesktop && (
          <button
            className="btn btn-primary btn-md my-3 w-full mx-auto"
            onClick={() => {
              setOpen?.(false);
            }}
          >
            <span>Показать</span>
          </button>
        )}
      </div>
    </>
  );
};
