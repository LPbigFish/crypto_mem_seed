import { useState } from "react";
import type { CustomDatePickerProps } from "../types/types";
import { calculateDaysInMonth, MONTHS, safeInt } from "..";

export default function DatePicker({
  disabled,
  date,
  onChange,
}: CustomDatePickerProps) {
  const [day, setDay] = useState<number>(date.getDate());
  const [month, setMonth] = useState<number>(date.getUTCMonth());
  const [year, setYear] = useState<number>(date.getUTCFullYear());

  const handle = (el: HTMLInputElement | HTMLSelectElement) => {
    const { name, value } = el;

    let nextDay = day;
    let nextMonth = month;
    let nextYear = year;

    if (name === "day") nextDay = safeInt(value, 1);
    if (name === "month") nextMonth = safeInt(value, 0);
    if (name === "year") nextYear = safeInt(value, Number.NaN); // allow blank & overflow

    const max = calculateDaysInMonth(
      nextMonth,
      Number.isNaN(nextYear) ? 2000 : nextYear // safe fallback for days list
    );
    if (nextDay > max) nextDay = max;

    setDay(nextDay);
    setMonth(nextMonth);
    setYear(nextYear);

    onChange(new Date(nextYear, nextMonth, nextDay));
  };

  return (
    <>
      <div className="fieldset grid-cols-3 bg-base-200">
        <select
          name="day"
          className="select"
          disabled={disabled}
          value={day}
          onChange={(e) => handle(e.target)}
        >
          {[...Array(
            calculateDaysInMonth(
              month,
              Number.isNaN(year) ? 2000 : year
            )
          )].map((_, i) => (
            <option value={i + 1} key={i}>
              {i + 1}
            </option>
          ))}
        </select>

        <select
          name="month"
          className="select"
          value={month}
          disabled={disabled}
          onChange={(e) => handle(e.target)}
        >
          {MONTHS.map((x, i) => (
            <option value={i} key={i}>
              {x}
            </option>
          ))}
        </select>

        <input
          name="year"
          className="input"
          type="number"
          value={Number.isNaN(year) ? "" : year}
          disabled={disabled}
          onChange={(e) => handle(e.target)}
        />
      </div>
    </>
  );
}
