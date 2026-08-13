"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/auth/auth-layout";
import { TextField } from "@/components/ui/text-field";
import { Button } from "@/components/ui/button";
import type { AccountType } from "@/lib/brand";

export function ActivateView({ type }: { type: AccountType }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const accentText =
    type === "enterprise" ? "text-enterprise-dark" : "text-personal-dark";

  const handleActivate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push(`/${type}/activation-sent`);
      }, 400);
    }, 500);
  };

  return (
    <AuthLayout
      type={type}
      rightImageSrc="/72-3607.png"
      rightTitle="Welcome to Mind You!"
      rightSubtitle="We hope you've been getting the care you need through us. We strive to make Mind You as convenient and professional as possible, and we're always happy to help if you encounter any problems while using our service."
    >
      <div className="flex w-full flex-col">
        <h2 className="mb-8 font-display text-[21px] font-semibold tracking-tight text-ink sm:mb-9 sm:text-[23px]">
          Activate your account
        </h2>

        <form
          onSubmit={handleActivate}
          className="form-field-stagger flex flex-col gap-5"
        >
          <TextField
            label={
              type === "enterprise" ? "Company Email Address" : "Email Address"
            }
            type="email"
            type_={type}
            required
            autoComplete="email"
          />

          <Button
            type="submit"
            type_={type}
            loading={loading}
            success={success}
          >
            Send activation email
          </Button>
        </form>

        <div className="mt-6 flex flex-col items-center gap-1">
          <p className="text-center font-body text-[13px] text-ink/60">
            Already have an account?
          </p>
          <Link
            href={`/${type}/login`}
            className={`text-center font-body text-[13px] font-bold tracking-wide ${accentText} transition-colors hover:text-ink`}
          >
            SIGN IN
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
