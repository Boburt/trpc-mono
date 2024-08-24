"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@frontend_next/lib/utils";
import { Button } from "@frontend_next/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@frontend_next/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@frontend_next/components/ui/popover";
import countries from "@frontend_next/components/country-select/data/countries.json";
import { Label } from "@radix-ui/react-label";

export function CountryDropdown() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full min-w-[300px] justify-between"
        >
          {value
            ? countries.find((country) => country.name === value)?.name
            : "Выберите страну..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 bg-white">
        <Command>
          <CommandInput placeholder="Найти страну..." />
          <CommandList>
            <CommandEmpty>Не найдено</CommandEmpty>
            <CommandGroup>
              {countries.map((country) => (
                <CommandItem
                  key={country.id}
                  value={country.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === country.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {country.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
