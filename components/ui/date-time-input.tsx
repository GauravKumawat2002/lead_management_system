"use client";

import * as React from "react";
import { format, parse } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

export interface DateTimeInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onDateTimeChange?: (date: Date | undefined) => void;
}

export default function Component({
  className,
  onDateTimeChange,
  ...props
}: DateTimeInputProps) {
  const [date, setDate] = React.useState<Date>();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const newDate = date ? new Date(date) : new Date();
      newDate.setFullYear(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
      );
      setDate(newDate);
      onDateTimeChange?.(newDate);
    }
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const timeValue = event.target.value;
    if (timeValue && date) {
      const [hours, minutes] = timeValue.split(":");
      const newDate = new Date(date);
      newDate.setHours(parseInt(hours), parseInt(minutes));
      setDate(newDate);
      onDateTimeChange?.(newDate);
    }
  };

  const formattedDateTime = date ? format(date, "PPP p") : "";
  const timeValue = date ? format(date, "HH:mm") : "";

  return (
    <div className={cn("grid w-full max-w-sm items-center gap-1.5", className)}>
      <Label htmlFor="datetime">Date and Time</Label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="datetime"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formattedDateTime || <span>Pick a date and time</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
          />
          <div className="border-t border-border p-3">
            <Label htmlFor="time" className="mb-2 block text-sm font-medium">
              Time
            </Label>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 opacity-50" />
              <Input
                type="time"
                id="time"
                value={timeValue}
                onChange={handleTimeChange}
                className="w-full"
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <Input
        {...props}
        type="datetime-local"
        value={date ? format(date, "yyyy-MM-dd'T'HH:mm") : ""}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      />
    </div>
  );
}
