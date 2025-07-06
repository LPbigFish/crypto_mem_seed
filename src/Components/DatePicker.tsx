import { useState } from "react";
import type { CustomDatePickerProps } from "../types/types";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const calculateDaysInMonth = (month: number, year: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

const safeInt = (str: string, fallback = 0) => {
  const n = parseInt(str, 10);
  return Number.isNaN(n) ? fallback : n;
};

const isValidDate = (year: number, month: number, day: number): boolean => {
  return !(
    year < 0 ||
    year > 9999 ||
    month < 0 ||
    month > 11 ||
    day < 1 ||
    day > calculateDaysInMonth(year, month)
  );
};

export default function DatePicker({
  disabled,
  date,
  onChange,
}: CustomDatePickerProps) {
  const [day, setDay] = useState<number>(date.getDate());
  const [month, setMonth] = useState<number>(date.getUTCMonth());
  const [year, setYear] = useState<number>(date.getUTCFullYear());

  const isInvalid = !isValidDate(year, month, day);

  const handle = (el: HTMLInputElement | HTMLSelectElement) => {
    const { name, value } = el;

    let nextDay = day;
    let nextMonth = month;
    let nextYear = year;

    if (name === "day") nextDay = safeInt(value, 1);
    if (name === "month") nextMonth = safeInt(value, 0);
    if (name === "year") nextYear = Math.min(safeInt(value, year), 9999);

    const max = calculateDaysInMonth(nextMonth, nextYear);
    if (nextDay > max) nextDay = max;

    setDay(nextDay);
    setMonth(nextMonth);
    setYear(nextYear);

    console.log(nextDay, nextMonth, nextYear);
    onChange(new Date(nextYear, nextMonth, nextDay));
  };

  const alert = isInvalid ? (
    <div role="alert" className="alert alert-error alert-outline">
      <span>Error! Invalid date range</span>
    </div>
  ) : (
    <></>
  );

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
          {[...Array(calculateDaysInMonth(month, year))].map((_, i) => (
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
          value={year}
          disabled={disabled}
          onChange={(e) => handle(e.target)}
        />
      </div>
      {alert}
    </>
  );
}
