"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/auth/auth-layout";
import { TextField } from "@/components/ui/text-field";
import { Button } from "@/components/ui/button";
import type { AccountType } from "@/lib/brand";

export function ForgotPasswordView({ type }: { type: AccountType }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push(`/${type}/create-password`);
    }, 500);
  };

  return (
    <AuthLayout
      type={type}
      rightImageSrc="/96-396.png"
      rightTitle="Welcome Back to Mind You!"
      rightSubtitle="We hope you've been getting the care you need through us. We strive to make Mind You as convenient and professional as possible, and we're always happy to help if you encounter any problems while using our service."
    >
      <div className="flex w-full flex-col">
        <h2 className="mb-8 font-display text-[21px] font-semibold tracking-tight text-ink sm:mb-9 sm:text-[23px]">
          Forgot password
        </h2>

        <form onSubmit={handleReset} className="form-field-stagger flex flex-col gap-5">
          <TextField label="Email Address" type="email" type_={type} required autoComplete="email" />
          <Button type="submit" type_={type} loading={loading}>
            Reset password
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
}
