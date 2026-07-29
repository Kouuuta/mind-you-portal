"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { TextField } from "@/components/ui/text-field";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AccountType } from "@/lib/brand";

const RULES = [
  { key: "length", label: "Minimum 8 characters", test: (v: string) => v.length >= 8 },
  { key: "upper", label: "At least one uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { key: "lower", label: "At least one lowercase letter", test: (v: string) => /[a-z]/.test(v) },
  { key: "number", label: "At least one number", test: (v: string) => /[0-9]/.test(v) },
];

export function CreatePasswordView({ type }: { type: AccountType }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);

  const allValid = useMemo(() => RULES.every((r) => r.test(password)), [password]);
  const matches = confirm.length > 0 && confirm === password;
  const confirmError = touched && confirm.length > 0 && !matches ? "Passwords don't match" : undefined;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!allValid || !matches) return;
    setLoading(true);
    setTimeout(() => {
      router.push(`/${type}`);
    }, 500);
  };

  return (
    <AuthLayout
      type={type}
      rightImageSrc="/70-3240.png"
      rightTitle="Welcome Back to Mind You!"
      rightSubtitle="We hope you've been getting the care you need through us. We strive to make Mind You as convenient and professional as possible, and we're always happy to help if you encounter any problems while using our service."
    >
      <div className="flex w-full flex-col">
        <h2 className="mb-7 font-display text-[21px] font-semibold tracking-tight text-ink sm:mb-8 sm:text-[23px]">
          Create password
        </h2>

        <form onSubmit={handleCreate} className="form-field-stagger flex flex-col gap-4">
          <TextField
            label="Password"
            type="password"
            type_={type}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />

          <TextField
            label="Confirm Password"
            type="password"
            type_={type}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            onBlur={() => setTouched(true)}
            error={confirmError}
            autoComplete="new-password"
            required
          />

          <ul className="flex flex-col gap-2 pt-1" aria-label="Password requirements">
            {RULES.map((rule) => {
              const valid = rule.test(password);
              return (
                <li key={rule.key} className="flex items-center gap-2.5">
                  <span
                    className={cn(
                      "flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border transition-all duration-200",
                      valid ? "border-success bg-success" : "border-ink/15 bg-transparent"
                    )}
                  >
                    <Check
                      size={11}
                      strokeWidth={3.5}
                      className={cn(
                        "text-white transition-all duration-200",
                        valid ? "scale-100 opacity-100" : "scale-75 opacity-0"
                      )}
                    />
                  </span>
                  <span
                    className={cn(
                      "font-body text-[13px] transition-colors duration-200",
                      valid ? "text-success" : "text-ink/50"
                    )}
                  >
                    {rule.label}
                  </span>
                </li>
              );
            })}
          </ul>

          <Button type="submit" type_={type} loading={loading} disabled={!allValid || !matches}>
            Create password
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
}
