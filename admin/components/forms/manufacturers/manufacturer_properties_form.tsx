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
import { CalendarIcon, Loader2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useImmer } from "use-immer";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { toast } from "sonner";
import { apiClient } from "@admin/utils/eden";
import { useQueries } from "@tanstack/react-query";
import useToken from "@admin/store/get-token";

dayjs.extend(localizedFormat);

export const ManufacturerPropertiesForm = ({
  recordId,
}: {
  recordId: string;
}) => {
  const token = useToken();
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
    {
      data: manufacturerPropertyValues,
      isLoading: isLoadingManufacturerPropertyValues,
    },
  ] = useQueries({
    queries: [
      {
        enabled: !!token,
        queryKey: ["manufacturers_properties_categories_cached"],
        queryFn: async () => {
          const { data } =
            await apiClient.api.manufacturers_properties_categories.cached.get({
              $headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          return data;
        },
      },
      {
        enabled: !!token,
        queryKey: ["manufacturers_properties_cached"],
        queryFn: async () => {
          const { data } =
            await apiClient.api.manufacturers_properties.cached.get({
              $headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          return data;
        },
      },
      {
        enabled: !!token && !!recordId,
        queryKey: ["manufacturers_properties_values", recordId],
        queryFn: async () => {
          const { data } =
            await apiClient.api.manufacturers_properties.property_value[
              recordId
            ].get({
              $headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          return data;
        },
      },
    ],
  });

  const {
    mutateAsync: setManufacturerProperties,
    isLoading: isLoadingSetManufacturerProperties,
  } = trpc.manufacturersProperties.setPropertiesValues.useMutation({
    onSettled: () => {
      toast.success("Свойства успешно обновлены");
    },
  });

  const onSubmit = useCallback(async () => {
    try {
      const result = await setManufacturerProperties({
        manufacturerId: recordId,
        properties: Object.keys(propertyValues).map((key: string) => {
          return {
            propertyId: key.toString(),
            value:
              typeof propertyValues[key] === "object"
                ? JSON.stringify(propertyValues[key])
                : (propertyValues[key] as string),
          };
        }),
      });
    } catch (error) {
      console.log(error);
    }
  }, [propertyValues, recordId]);

  useEffect(() => {
    if (
      manufacturerPropertyValues &&
      Array.isArray(manufacturerPropertyValues)
    ) {
      setPropertyValues((prev) => {
        manufacturerPropertyValues.forEach((property) => {
          prev[property.property_id] = property.value;
        });
      });
    }
  }, [manufacturerPropertyValues]);

  const formGroupedFields = useMemo(() => {
    if (
      manufacturerPropertiesCategories &&
      manufacturerProperties &&
      Array.isArray(manufacturerProperties)
    ) {
      if (Array.isArray(manufacturerPropertiesCategories)) {
        return manufacturerPropertiesCategories?.map((category) => {
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
      } else {
        return [];
      }
    }
    return [];
  }, [manufacturerPropertiesCategories, manufacturerProperties]);

  return (
    <>
      <div className="relative h-[calc(100dvh-120px)]">
        <div className="pb-36 max-h-[calc(92dvh)] overflow-y-auto">
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
                      <Input
                        defaultValue={propertyValues[field.value]}
                        onChange={(e) => {
                          setPropertyValues((prev) => {
                            prev[field.value] = e.target.value;
                          });
                        }}
                      />
                    )}
                    {field.type ==
                      manufacturers_properties_typesSchema.Values.number && (
                      <Input
                        type="number"
                        defaultValue={propertyValues[field.value]}
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
                        <Select
                          defaultValue={propertyValues[field.value]}
                          value={propertyValues[field.value]}
                          onValueChange={(value) => {
                            setPropertyValues((prev) => {
                              prev[field.value] = value;
                            });
                          }}
                        >
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
                        <Select
                          defaultValue={propertyValues[field.value]}
                          onValueChange={(value) => {
                            setPropertyValues((prev) => {
                              prev[field.value] = value;
                            });
                          }}
                        >
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
                              `${dayjs(
                                propertyValues[field.value].replaceAll('"', "")
                              ).format("LL")}`
                            ) : (
                              <span>Выберите дату</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={
                              propertyValues[field.value] &&
                              dayjs(
                                propertyValues[field.value].replaceAll('"', "")
                              ).toDate()
                            }
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
        </div>
        <div className="absolute bottom-0 left-0 w-full bg-background py-4">
          <div className="flex">
            <Button onClick={onSubmit}>
              {/* {isLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )} */}
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
