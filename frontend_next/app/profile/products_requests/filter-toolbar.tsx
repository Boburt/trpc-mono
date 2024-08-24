"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectItem,
  DateRangePicker,
  RangeValue,
} from "@nextui-org/react";
import {
  DateValue,
  parseDate,
  startOfWeek,
  endOfWeek,
  today,
  CalendarDate,
  CalendarDateTime,
  ZonedDateTime,
} from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";

export default function FilterToolbar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentStatus = searchParams.get("status") || "all";
  const dateFrom =
    searchParams.get("dateFrom") ||
    startOfWeek(today("Asia/Tashkent"), "ru-RU").toString();
  const dateTo =
    searchParams.get("dateTo") ||
    endOfWeek(today("Asia/Tashkent"), "ru-RU").toString();

  const handleDateRangeChange = (
    range: RangeValue<CalendarDate | CalendarDateTime | ZonedDateTime>
  ) => {
    const params = new URLSearchParams(searchParams);
    params.set("dateFrom", range.start ? range.start.toString() : "");
    params.set("dateTo", range.end ? range.end.toString() : "");
    router.push(`?${params.toString()}`);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set("status", e.target.value);
    router.push(`?${params.toString()}`);
  };
  return (
    <div className="flex justify-between items-center mb-4 space-x-4">
      <I18nProvider locale="ru">
        <DateRangePicker
          value={{
            start: parseDate(dateFrom),
            end: parseDate(dateTo),
          }}
          onChange={handleDateRangeChange}
          label="Фильтр по дате"
        />
      </I18nProvider>
      <Select
        value={currentStatus}
        onChange={handleStatusChange}
        label="Фильтр по статусу"
      >
        <SelectItem key="all" value="all">
          Все
        </SelectItem>
        <SelectItem key="pending" value="pending">
          В ожидании
        </SelectItem>
        <SelectItem key="approved" value="approved">
          Обработано
        </SelectItem>
        <SelectItem key="rejected" value="rejected">
          Отклонено
        </SelectItem>
      </Select>
    </div>
  );
}
