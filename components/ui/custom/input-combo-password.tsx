"use client";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props extends React.ComponentProps<"input"> {
  register: UseFormRegisterReturn;
  error: string | undefined;
  wrapperClassName?: string;
  labelName?: string;
}

export const InputComboForPassword = ({
  labelName,
  register,
  wrapperClassName,
  error,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={cn("space-y-2", wrapperClassName)}>
      <label htmlFor="password" className="block font-medium">
        {labelName}
      </label>
      <div className="relative">
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          className={cn(
            "w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-100 focus:outline-none ",
            { "border-red-500": error }
          )}
          {...(error && {
            "aria-invalid": true,
            "aria-describedby": "password-error",
            "aria-errormessage": "password-error",
          })}
          {...register}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          aria-label="Toggle password visibility"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>
  );
};
