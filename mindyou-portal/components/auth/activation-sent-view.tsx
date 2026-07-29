"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import type { AccountType } from "@/lib/brand";

export function ActivationSentView({ type }: { type: AccountType }) {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const accentText = type === "enterprise" ? "text-enterprise-dark" : "text-personal-dark";

  return (
    <AuthLayout
      type={type}
      rightImageSrc="/72-3253.png"
      rightTitle="Welcome Back to Mind You!"
      rightSubtitle="We hope you've been getting the care you need through us. We strive to make Mind You as convenient and professional as possible, and we're always happy to help if you encounter any problems while using our service."
    >
      <div className="flex w-full flex-col items-center text-center">
        <h2 className={`mb-5 font-display text-[21px] font-semibold tracking-tight sm:text-[23px] ${accentText}`}>
          Activation email sent
        </h2>

        <p className="mb-8 max-w-[320px] font-body text-[14px] leading-relaxed text-ink/70 sm:text-[15px]">
          Great! We have sent an activation email to
          <br />
          a********@mindyou.com.ph
          <br />
          <br />
          Please follow the link in your email to access your Mind You account.
        </p>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-8 h-[170px] w-[230px] sm:h-[210px] sm:w-[280px]"
        >
          <Image src="/96-201.svg" alt="" fill className="object-contain" />
          <Image
            src="/96-345.svg"
            alt=""
            width={32}
            height={32}
            className="absolute left-[36%] top-[24%] h-7 w-7 sm:h-8 sm:w-8"
          />
        </motion.div>

        <p className="mb-4 font-body text-[13px] text-ink/60">
          Haven&rsquo;t received the activation email?
        </p>

        <Button
          type_={type}
          className="mb-5"
          onClick={() => router.push(`/${type}/resend-activation`)}
        >
          Resend activation email
        </Button>

        <Link
          href={`/${type}/activate`}
          className="font-body text-[13px] font-medium text-ink/50 transition-colors hover:text-ink"
        >
          Change activation email
        </Link>
      </div>
    </AuthLayout>
  );
}
