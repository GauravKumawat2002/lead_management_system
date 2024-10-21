import React, { useState } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { FormField, FormLabel, FormControl, FormMessage, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignInForm, SignUpForm } from "@/schemas/auth-form-schema";
import { Eye, EyeOff } from "lucide-react"; // Import icons from lucide-react

interface CustomFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
}

export default function CustomFormField<T extends SignInForm | SignUpForm>({
  control,
  name,
  label,
  placeholder,
}: CustomFormFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="form-item pb-4">
          <FormLabel className="form-label text-gray-700 mb-4" htmlFor={label}>
            {label} <span className="text-red-500">*</span>
          </FormLabel>
          <FormControl>
            {/* Container for Input and Eye Icon */}
            <div className="relative">
              <Input
                className="input-class pr-10" // Add padding-right to make space for the icon
                {...field}
                id={label}
                placeholder={placeholder}
                type={
                  (name === "password" || name === "confirmPassword") && !showPassword
                    ? "password"
                    : "text"
                }
              />
              {/* Toggle Button (eye icon inside the input field) */}
              {(name === "password" || name === "confirmPassword") && (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              )}
            </div>
          </FormControl>
          <FormMessage {...field} className="form-message mt-2" />
        </FormItem>
      )}
    />
  );
}
