import { cn } from "@/lib/utils";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props extends React.ComponentProps<"input"> {
  register: UseFormRegisterReturn;
  error: string | undefined;
  wrapperClassName?: string;
  labelName?: string;
}

export const InputCombo = ({
  labelName,
  register,
  wrapperClassName,
  error,
  ...props
}: Props) => {
  return (
    <div className={cn("space-y-2", wrapperClassName)}>
      <label htmlFor="email" className="block font-medium">
        {labelName}
      </label>
      <input
        className={cn(
          "w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-100 focus:outline-none ",
          { "border-red-500": error }
        )}
        {...register}
        {...props}
      />
    </div>
  );
};
