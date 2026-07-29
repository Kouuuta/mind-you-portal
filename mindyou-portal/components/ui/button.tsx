"use client";

import { forwardRef } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import type { AccountType } from "@/lib/brand";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  type_?: AccountType;
  variant?: "solid" | "outline" | "ghost";
  loading?: boolean;
  children?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      type_ = "personal",
      variant = "solid",
      loading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const shouldReduceMotion = useReducedMotion();
    const isPersonal = type_ === "personal";
    const solidClasses = isPersonal
      ? "bg-gradient-to-b from-personal to-personal-dark shadow-[var(--shadow-button)] hover:shadow-[var(--shadow-glow-personal)] active:shadow-[var(--shadow-button)]"
      : "bg-gradient-to-b from-enterprise to-enterprise-dark shadow-[var(--shadow-button)] hover:shadow-[var(--shadow-glow-enterprise)] active:shadow-[var(--shadow-button)]";

    return (
      <motion.button
        ref={ref}
        disabled={disabled || loading}
        whileHover={shouldReduceMotion || disabled || loading ? undefined : { scale: 1.015, y: -1 }}
        whileTap={shouldReduceMotion || disabled || loading ? undefined : { scale: 0.975 }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
        className={cn(
          "relative flex h-12 sm:h-13 w-full items-center justify-center gap-2 rounded-xl px-6 text-[13px] sm:text-[14px] font-bold tracking-wider text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-45",
          variant === "solid" && solidClasses,
          variant === "outline" &&
            "border border-ink/15 bg-white/50 backdrop-blur-sm text-ink shadow-none hover:bg-white hover:border-ink/25 active:bg-ink/5",
          variant === "ghost" && "bg-transparent text-ink shadow-none hover:bg-ink/5 active:bg-ink/10",
          className
        )}
        {...props}
      >
        <span className={cn("inline-flex items-center gap-2", loading && "opacity-0")}>
          {children}
        </span>
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="h-4 w-4 rounded-full border-2 border-white/25 border-t-white animate-spin" />
          </span>
        )}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
