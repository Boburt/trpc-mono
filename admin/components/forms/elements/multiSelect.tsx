"use client";
import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@admin/lib/utils";
import { Button } from "@components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { CommandList } from "cmdk";

interface IMultiSelectData {
  value: string;
  label: string;
}

export default function MultiSelect({
  data,
  onValueChange,
  value,
}: {
  data: IMultiSelectData[];
  onValueChange: (value: string[]) => void;
  value: string[];
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-auto"
        >
          <div>
            {value
              ? data
                  .filter((framework) => value.includes(framework.value))
                  .map((framework) => (
                    <div
                      className="bg-secondary max-w-max min-w-[8rem] px-2 rounded-lg mx-1 my-1"
                      key={framework.value}
                    >
                      {framework.label}
                    </div>
                  ))
              : "Выберите филиал..."}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <Command>
          <CommandInput placeholder="Поиск филиал..." />
          <CommandEmpty>Филиал не найден.</CommandEmpty>
          <CommandList>
            {data.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue: string) => {
                  let res = [];
                  if (value.includes(currentValue)) {
                    res = value.filter((value) => value !== currentValue);
                  } else {
                    res = [...value, currentValue];
                  }

                  onValueChange(res);
                }}
                className="cursor-pointer"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value.includes(framework.value)
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
