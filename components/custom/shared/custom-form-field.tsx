"use client";
import { useState } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { format } from "date-fns";
import { Eye, EyeOff, CalendarRangeIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { SignInForm, SignUpForm } from "@/schemas/auth-form-schema";
import { AddLeadsForm } from "@/schemas/add-leads-form-schema";

import {
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CustomFormFieldProps<T extends FieldValues> {
  required?: boolean;
  control: Control<T>;
  label: string;
  name: FieldPath<T>;
  options?: { value: string; label: string }[];
  placeholder?: string;
  type:
    | "date"
    | "number"
    | "password"
    | "select"
    | "textarea"
    | "text"
    | "datetime-local"
    | string;
}

export default function CustomFormField<
  T extends SignInForm | SignUpForm | AddLeadsForm,
>({
  control,
  label,
  name,
  options,
  placeholder,
  type,
  required = true,
}: CustomFormFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="form-item pb-4">
          <FormLabel
            className="form-label mb-4 text-gray-700 dark:text-gray-200"
            htmlFor={label}
          >
            {label} {required && <span className="text-red-500">*</span>}
          </FormLabel>{" "}
          {type === "date" && (
            <Popover>
              <PopoverTrigger asChild className="block">
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground",
                    )}
                  >
                    {field.value ? (
                      format(new Date(field.value), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarRangeIcon className="-mt-5 ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value ? new Date(field.value) : undefined}
                  onSelect={(date) => field.onChange(date)}
                  // onSelect={(date) =>
                  //   field.onChange(date ? date.toISOString() : "")
                  // }
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}
          {type === "number" && (
            <FormControl>
              <Input
                className="input-class pr-10"
                {...field}
                id={label}
                placeholder={placeholder}
                type="number"
                value={field.value as number | undefined}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
          )}
          {type === "password" && (
            <FormControl>
              <div className="relative">
                <Input
                  className="input-class pr-10"
                  {...field}
                  id={label}
                  placeholder={placeholder}
                  type={!showPassword ? "password" : "text"}
                  value={field.value as string | undefined}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-1/2 -translate-y-1/2 transform text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </FormControl>
          )}
          {type === "select" && (
            <Select
              onValueChange={field.onChange}
              value={field.value as string}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      !placeholder ? "Please select a value" : placeholder
                    }
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {type === "textarea" && (
            <FormControl>
              <Textarea
                placeholder={!placeholder ? "Optional" : placeholder}
                className="resize-none"
                {...field}
                value={field.value as string | undefined}
              />
            </FormControl>
          )}
          {type === "text" && (
            <FormControl>
              <Input
                className="input-class pr-10"
                {...field}
                id={label}
                placeholder={placeholder}
                type="text"
                value={field.value as string | undefined}
              />
            </FormControl>
          )}
          {type === "datetime-local" && (
            <FormControl>
              <Input
                className="input-class pr-10"
                {...field}
                id={label}
                placeholder={placeholder}
                type="datetime-local"
                value={field.value as string | undefined}
              />
            </FormControl>
          )}
          <FormMessage {...field} className="form-message mt-2" />
        </FormItem>
      )}
    />
  );
}
