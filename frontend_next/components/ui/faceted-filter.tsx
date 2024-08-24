import * as React from "react";
import { Check, PlusCircle } from "lucide-react";
import { cn } from "@frontend_next/lib/utils";
import { Badge } from "@frontend_next/components/ui/badge";
import { Button } from "@frontend_next/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@frontend_next/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@frontend_next/components/ui/popover";
import { Separator } from "@frontend_next/components/ui/separator";

export function FacetedFilter({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: {
    value: string;
    label: string;
    icon?: React.ElementType;
    count?: number;
  }[];
  value?: string[];
  onChange: (value: string[]) => void;
}) {
  const selectedValues = React.useMemo(() => {
    return value || [];
  }, [value]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircle className="mr-2 h-4 w-4" />
          {title}
          {selectedValues?.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.length}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.length > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.length} выбрано
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.includes(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-content1" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>Результатов нет</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.includes(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        onChange(
                          [...selectedValues].filter((v) => v !== option.value)
                        );
                      } else {
                        onChange([...selectedValues, option.value]);
                      }
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check className={cn("h-4 w-4")} />
                    </div>
                    {option.icon && (
                      <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{option.label}</span>
                    {option.count !== undefined && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {option.count}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      onChange([]);
                    }}
                    className="justify-center text-center"
                  >
                    Очистить
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
