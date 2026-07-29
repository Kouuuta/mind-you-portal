"use client";

import { forwardRef, useId, useState, useCallback } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AccountType } from "@/lib/brand";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type_?: AccountType;
  hint?: string;
  error?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, type_ = "personal", hint, error, className, id, type, onChange, onFocus, onBlur, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const [show, setShow] = useState(false);
    const [focused, setFocused] = useState(false);
    const [hasInternalValue, setHasInternalValue] = useState(
      !!(props.defaultValue ?? false)
    );
    const isPassword = type === "password";
    const hasValue = props.value !== undefined ? props.value !== "" : hasInternalValue;
    const isFloating = focused || hasValue;
    const accentClasses =
      type_ === "enterprise"
        ? "focus:border-enterprise/60 focus:ring-enterprise/10"
        : "focus:border-personal/60 focus:ring-personal/10";

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setHasInternalValue(e.target.value !== "");
        onChange?.(e);
      },
      [onChange]
    );

    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setFocused(true);
        onFocus?.(e);
      },
      [onFocus]
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setFocused(false);
        setHasInternalValue(e.target.value !== "");
        onBlur?.(e);
      },
      [onBlur]
    );

    return (
      <div className="flex flex-col gap-1">
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type={isPassword ? (show ? "text" : "password") : type}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder={label}
            className={cn(
              "peer h-12 w-full rounded-xl border bg-white/80 backdrop-blur-sm px-3.5 pt-3 pb-1 text-[14px] text-ink placeholder-transparent outline-none transition-all duration-150",
              accentClasses,
              "focus:bg-white",
              isPassword && "pr-11",
              error
                ? "border-red-300 focus:border-red-400 focus:ring-red-500/10"
                : "border-hairline",
              className
            )}
            {...props}
          />
          <label
            htmlFor={inputId}
            className={cn(
              "pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[14px] text-ink-50 transition-all duration-150",
              isFloating && "top-2.5 translate-y-0 text-[11px] font-medium"
            )}
          >
            {label}
          </label>
          {isPassword && (
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? "Hide password" : "Show password"}
              className="absolute right-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-ink/40 transition-colors hover:text-ink hover:bg-ink/5"
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
        </div>
        {error ? (
          <p id={`${inputId}-error`} className="px-1 text-[12px] font-medium text-red-500" role="alert">
            {error}
          </p>
        ) : hint ? (
          <p id={`${inputId}-hint`} className="px-1 text-[12px] text-ink-50">
            {hint}
          </p>
        ) : null}
      </div>
    );
  }
);
TextField.displayName = "TextField";
