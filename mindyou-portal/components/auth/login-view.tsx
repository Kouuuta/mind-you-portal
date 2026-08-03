"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/auth/auth-layout";
import { TextField } from "@/components/ui/text-field";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import type { AccountType } from "@/lib/brand";

const rightCopy: Record<AccountType, { image: string; title: string; subtitle: string }> = {
  personal: {
    image: "/72-3961.png",
    title: "Welcome to Mind You!",
    subtitle:
      "We hope you've been getting the care you need through us. If your company isn't signed up for Mind You yet, please reach out to us.",
  },
  enterprise: {
    image: "/72-3961.png",
    title: "Welcome to Mind You!",
    subtitle:
      "We hope you've been getting the care you need through us. Your safe space providing holistic and expert well-being programs.",
  },
};

export function LoginView({ type }: { type: AccountType }) {
  const router = useRouter();
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const copy = rightCopy[type];
  const accentText = type === "enterprise" ? "text-enterprise-dark" : "text-personal-dark";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push(`/${type}`);
      }, 400);
    }, 500);
  };

  return (
    <AuthLayout
      type={type}
      rightImageSrc={copy.image}
      rightTitle={copy.title}
      rightSubtitle={copy.subtitle}
      showSignUp={type === "personal"}
    >
      <form onSubmit={handleSubmit} className="form-field-stagger flex w-full flex-col">
        <h2 className="mb-7 font-display text-[21px] font-semibold tracking-tight text-ink sm:mb-8 sm:text-[23px]">
          Log in
        </h2>

        <div className="mb-6 flex flex-col gap-4">
          <TextField label="Email Address" type="email" type_={type} required autoComplete="email" />
          <TextField label="Password" type="password" type_={type} required autoComplete="current-password" />
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Checkbox checked={keepLoggedIn} onChange={setKeepLoggedIn} label="Keep me logged in" type_={type} />
          <Link
            href={`/${type}/forgot-password`}
            className="font-body text-[13px] font-medium text-ink/50 transition-colors hover:text-ink"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" type_={type} loading={loading} success={success} className="mb-5">
          Log in
        </Button>

        {type === "personal" ? (
          <div className="flex flex-col items-center gap-3">
            <span className="font-body text-[13px] text-ink/60">
              Don&rsquo;t have a Mind You account?
            </span>
            <Button
              type="button"
              type_={type}
              variant="outline"
              onClick={() => router.push(`/${type}/register`)}
            >
              Sign up
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <p className="text-center font-body text-[13px] text-ink/60">
              Haven&rsquo;t activated your account?
            </p>
            <Link
              href={`/${type}/activate`}
              className={`text-center font-body text-[13px] font-bold tracking-wide ${accentText} transition-colors hover:text-ink`}
            >
              ACTIVATE
            </Link>
          </div>
        )}
      </form>
    </AuthLayout>
  );
}
