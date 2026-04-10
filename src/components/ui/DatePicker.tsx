"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

interface DatePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  min?: string;
  placeholder?: string;
}

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const toIsoDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const parseIsoDate = (value: string): Date | null => {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
};

const startOfMonth = (date: Date): Date => new Date(date.getFullYear(), date.getMonth(), 1);

const isSameDate = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const mondayFirstDayIndex = (day: Date): number => (day.getDay() + 6) % 7;

const isWeekend = (day: Date): boolean => day.getDay() === 0 || day.getDay() === 6;

const DatePicker = ({
  label,
  value,
  onChange,
  min,
  placeholder = "Select date",
}: DatePickerProps) => {
  const [open, setOpen] = useState(false);
  const selectedDate = parseIsoDate(value);
  const minDate = parseIsoDate(min ?? "");
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState<Date>(
    selectedDate ? startOfMonth(selectedDate) : startOfMonth(today),
  );
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!selectedDate) return;
    setCurrentMonth(startOfMonth(selectedDate));
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const root = rootRef.current;
      if (!root) return;
      if (!root.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const visibleDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const startOffset = mondayFirstDayIndex(monthStart);
    const calendarStart = new Date(monthStart);
    calendarStart.setDate(monthStart.getDate() - startOffset);

    return Array.from({ length: 42 }, (_, idx) => {
      const day = new Date(calendarStart);
      day.setDate(calendarStart.getDate() + idx);
      return day;
    });
  }, [currentMonth]);

  const monthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("en-GB", {
        month: "long",
        year: "numeric",
      }).format(currentMonth),
    [currentMonth],
  );

  const displayValue = selectedDate
    ? new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(selectedDate)
    : placeholder;

  const isBeforeMin = (day: Date): boolean => {
    if (!minDate) return false;
    return day.getTime() < minDate.getTime();
  };

  return (
    <div ref={rootRef} className="relative text-left">
      <label className="mb-1 flex items-center gap-1 text-sm font-medium text-gray-300">
        <CalendarDays className="h-4 w-4" /> {label}
      </label>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-lg border-2 border-navy-light bg-white px-4 py-3 text-gray-900 shadow-sm transition hover:border-amber-400 focus:border-amber-500 focus:outline-none"
      >
        <span className={selectedDate ? "text-gray-900" : "text-gray-500"}>{displayValue}</span>
        <CalendarDays className="h-4 w-4 text-amber-600" />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full min-w-[290px] rounded-xl border border-gray-200 bg-white p-3 shadow-xl">
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() =>
                setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
              }
              className="rounded-md p-1.5 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <p className="text-sm font-semibold text-gray-900">{monthLabel}</p>
            <button
              type="button"
              onClick={() =>
                setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
              }
              className="rounded-md p-1.5 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-500">
            {WEEK_DAYS.map((day) => (
              <span key={day} className="py-1">
                {day}
              </span>
            ))}
          </div>

          <div className="mt-1 grid grid-cols-7 gap-1">
            {visibleDays.map((day) => {
              const inCurrentMonth = day.getMonth() === currentMonth.getMonth();
              const isSelected = selectedDate ? isSameDate(day, selectedDate) : false;
              const isDisabled = isBeforeMin(day);
              const weekend = isWeekend(day);

              return (
                <button
                  key={toIsoDate(day)}
                  type="button"
                  onClick={() => {
                    if (isDisabled) return;
                    onChange(toIsoDate(day));
                    setOpen(false);
                  }}
                  disabled={isDisabled}
                  className={[
                    "h-9 rounded-lg text-sm transition",
                    inCurrentMonth
                      ? weekend
                        ? "bg-red-50 text-red-700"
                        : "text-gray-900"
                      : "text-gray-400",
                    isSelected
                      ? "bg-amber-500 font-semibold text-white hover:bg-amber-500"
                      : weekend
                        ? "hover:bg-red-100"
                        : "hover:bg-gray-100",
                    isDisabled ? "cursor-not-allowed text-gray-300 hover:bg-transparent" : "",
                  ].join(" ")}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
            <button
              type="button"
              className="text-xs font-medium text-gray-600 transition hover:text-gray-900"
              onClick={() => onChange("")}
            >
              Clear
            </button>
            <button
              type="button"
              className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 transition hover:bg-gray-200"
              onClick={() => {
                const todayIso = toIsoDate(today);
                if (!minDate || today.getTime() >= minDate.getTime()) {
                  onChange(todayIso);
                  setCurrentMonth(startOfMonth(today));
                  setOpen(false);
                }
              }}
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
