import * as Yup from "yup";
import { twM } from "@/utils/tm";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

const inputVariant = cva("", {
  variants: {
    variant: {
      error: "bg-white text-red-500 border-red-500",
      success: "bg-white text-green-500 border-green-500",
      default: "bg-white text-gray-900 border-gray-400",
    },
    cSize: {
      fullWidth: "w-full",
    },
  },
  defaultVariants: {
    variant: "default",
    cSize: "fullWidth",
  },
});

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onInvalid">,
    VariantProps<typeof inputVariant> {
  label?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  containerClassName?: string;
  startAdornmentClassName?: string;
  endAdornmentClassName?: string;
  labelShrink?: boolean;
  validation?: Yup.MixedSchema<any>; // Accept any Yup schema
  errorMessage?: string;
  onInvalid?: (error: Yup.ValidationError) => void; //
}

/**
 * Input Component
 * @description A flexible and accessible input component with support for validation, icons, and various states.
 * @param {InputProps} props - The properties to customize the input component.
 * @param {React.Ref<HTMLInputElement>} ref - The reference to the input element.
 * @returns {JSX.Element} The Input component.
 */

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      containerClassName,
      startAdornmentClassName,
      endAdornmentClassName,
      className,
      startAdornment,
      endAdornment,
      placeholder,
      type,
      label,
      variant,
      cSize,
      labelShrink = false,
      validation,
      errorMessage,
      onInvalid,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(
      !!props.value ? true : labelShrink
    );
    const [isFilled, setIsFilled] = React.useState(
      !!props.value ? true : labelShrink
    );
    const [error, setError] = React.useState<string | null>(null);

    // Validate the value based on the provided schema
    const validate = (value: string) => {
      if (validation && !props.disabled) {
        validation
          .validate(value)
          .then(() => setError(null))
          .catch((err: Yup.ValidationError) => {
            onInvalid?.(err);
            setError(err.message);
          });
      }
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      if (!props.disabled) {
        setIsFocused(false);
        setIsFilled(event.target.value !== "");
        validate(event.target.value);
      }
    };

    const containerRef = React.useRef<HTMLDivElement | null>(null);

    return (
      <div className={twM(inputVariant({ cSize }))} dir={props.dir ?? "ltr"}>
        <div
          ref={containerRef}
          className={twM(
            "relative border flex items-center border-gray-400 rounded-md",
            props.disabled && "opacity-50 [&>*]:cursor-not-allowed",
            inputVariant({ variant: error ? "error" : variant, cSize }),
            containerClassName
          )}
        >
          {(label || placeholder) && (
            <label
              htmlFor={props.id}
              onClick={() => {
                if (!props.disabled) setIsFocused(true);
              }}
              className={twM(
                "absolute top-1/2 bg-inherit -translate-y-1/2  transition-all",
                startAdornment ? "start-10" : "start-4",
                (isFocused || isFilled) &&
                  "text-xs px-2 font-bold start-4 -top-1/2 transform translate-y-1/2"
              )}
            >
              {label || placeholder}
            </label>
          )}

          {startAdornment && (
            <span
              className={twM(
                "size-10 flex items-center justify-center overflow-hidden",
                startAdornmentClassName
              )}
            >
              {startAdornment}
            </span>
          )}

          <input
            type={type}
            className={twM(
              `flex flex-1 h-full rounded-md px-3 py-2 text-sm placeholder:text-slate-500 !bg-transparent outline-none`,
              className
            )}
            ref={ref}
            aria-invalid={!!error}
            aria-describedby={error ? `${props.id}-error` : undefined}
            onFocus={() => setIsFocused(true)}
            onBlur={handleBlur}
            {...props}
          />

          {endAdornment && (
            <span
              className={twM(
                "size-10 flex items-center justify-center overflow-hidden",
                endAdornmentClassName
              )}
            >
              {endAdornment}
            </span>
          )}
        </div>
        {error && (
          <span className="text-red-500 text-sm mt-1 max-w-md block">
            {errorMessage || error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
