"use client";

import React, { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  isBefore,
  startOfToday,
} from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";

interface DatePickerProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export default function DatePicker({
  selectedDate,
  onDateSelect,
}: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = startOfToday();

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-[#C9A84C]" />
          <span className="text-sm font-bold tracking-widest uppercase font-display">
            {format(currentMonth, "MMMM yyyy")}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-[#9E9E9E] hover:text-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-[#9E9E9E] hover:text-white"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div className="grid grid-cols-7 mb-2">
        {days.map((day) => (
          <div
            key={day}
            className="text-center text-[10px] font-bold text-[#5A5A5A] uppercase tracking-tighter py-2"
          >
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const cloneDay = day;
        const isDisabled = isBefore(day, today) && !isSameDay(day, today);
        const isSelected = isSameDay(day, selectedDate);
        const isCurrentMonth = isSameMonth(day, monthStart);

        days.push(
          <div
            key={day.toString()}
            className={`relative h-12 flex items-center justify-center cursor-pointer transition-all duration-300 group
              ${!isCurrentMonth ? "opacity-20" : ""}
              ${isDisabled ? "cursor-not-allowed opacity-10" : "hover:scale-110"}
            `}
            onClick={() => !isDisabled && onDateSelect(cloneDay)}
          >
            {isSelected && (
              <div className="absolute inset-1 bg-gradient-to-br from-[#C9A84C] to-[#8B732E] rounded-xl shadow-[0_0_15px_rgba(201,168,76,0.3)] animate-in fade-in zoom-in duration-300"></div>
            )}
            <span
              className={`relative text-xs font-bold font-accent
              ${isSelected ? "text-black" : isCurrentMonth ? "text-[#9E9E9E] group-hover:text-white" : "text-[#5A5A5A]"}
            `}
            >
              {formattedDate}
            </span>
            {isSameDay(day, today) && !isSelected && (
              <div className="absolute bottom-2 w-1 h-1 bg-[#C9A84C] rounded-full"></div>
            )}
          </div>,
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day.toString()}>
          {days}
        </div>,
      );
      days = [];
    }
    return <div className="px-2 pb-4">{rows}</div>;
  };

  return (
    <div className="w-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl animate-fade-in-up">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
}
