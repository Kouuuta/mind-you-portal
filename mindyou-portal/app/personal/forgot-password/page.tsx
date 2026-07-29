import type { Metadata } from "next";
import { ForgotPasswordView } from "@/components/auth/forgot-password-view";

export const metadata: Metadata = {
  title: "Forgot Password | Mind You",
};

export default function Page() {
  return <ForgotPasswordView type="personal" />;
}
