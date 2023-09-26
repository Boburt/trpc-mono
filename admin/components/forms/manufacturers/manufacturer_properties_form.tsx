import { Button } from "@admin/components/ui/button";
import { Calendar } from "@admin/components/ui/calendar";
import { Input } from "@admin/components/ui/input";
import { Label } from "@admin/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@admin/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@admin/components/ui/select";
import { Switch } from "@admin/components/ui/switch";
import { cn } from "@admin/lib/utils";
import { AdditionalDataItem } from "@admin/types/ui-types";
import { trpc } from "@admin/utils/trpc";
import { manufacturers_properties_typesSchema } from "@backend/lib/zod";
import dayjs from "dayjs";
import { CalendarIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useImmer } from "use-immer";

export const ManufacturerPropertiesForm = ({
  recordId,
}: {
  recordId: string;
}) => {
  const [propertyValues, setPropertyValues] = useImmer<Record<string, any>>({});
  const [
    {
      data: manufacturerPropertiesCategories,
      isLoading: isLoadingManufacturerPropertiesCategories,
    },
    {
      data: manufacturerProperties,
      isLoading: isLoadingManufacturerProperties,
    },
  ] = trpc.useQueries((t) => [
    t.manufacturersPropertiesCategories.cachedManufacturerPropertiesCategories(
      {}
    ),
    t.manufacturersProperties.cachedManufacturerProperties({}),
  ]);

  const formGroupedFields = useMemo(() => {
    if (manufacturerPropertiesCategories && manufacturerProperties) {
      return manufacturerPropertiesCategories.map((category) => {
        return {
          label: category.name,
          fields: manufacturerProperties
            .filter((property) => {
              return property.category_id === category.id;
            })
            .map((property) => {
              return {
                label: property.name,
                value: property.id,
                type: property.type,
                additional_data:
                  property.additional_data as AdditionalDataItem[],
              };
            }),
        };
      });
    }
    return [];
  }, [manufacturerPropertiesCategories, manufacturerProperties]);
  console.log("formGroupedFields", formGroupedFields);
  return (
    <>
      {formGroupedFields.map((category) => (
        <div key={category.label}>
          <div className="border-b-2 my-4 text-lg font-bold uppercase">
            <h2>{category.label}</h2>
          </div>
          <div className="space-y-3">
            {category.fields.map((field) => (
              <div key={field.value} className="flex flex-col space-y-2">
                <Label>{field.label}</Label>
                {field.type ===
                  manufacturers_properties_typesSchema.Values.string && (
                  <Input />
                )}
                {field.type ==
                  manufacturers_properties_typesSchema.Values.number && (
                  <Input
                    type="number"
                    onChange={(e) => {
                      setPropertyValues((prev) => {
                        prev[field.value] = e.target.value;
                      });
                    }}
                  />
                )}
                {field.type ===
                  manufacturers_properties_typesSchema.Values.boolean && (
                  <div className="flex items-center space-x-2">
                    <Select>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Да</SelectItem>
                        <SelectItem value="false">Нет</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {field.type ==
                  manufacturers_properties_typesSchema.Values.list && (
                  <div className="flex items-center space-x-2">
                    <Select>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {field.additional_data?.map(
                          (item: AdditionalDataItem) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.value}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {field.type ===
                  manufacturers_properties_typesSchema.Values.date && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !propertyValues[field.value] &&
                            "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {propertyValues[field.value] ? (
                          `${dayjs(propertyValues[field.value]).format("LL")}`
                        ) : (
                          <span>Выберите дату</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={propertyValues[field.value]}
                        onSelect={(date) => {
                          setPropertyValues((prev) => {
                            prev[field.value] = date;
                          });
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};
