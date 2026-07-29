import type { Metadata } from "next";
import { ResendActivationView } from "@/components/auth/resend-activation-view";

export const metadata: Metadata = {
  title: "Resend Activation Email | Mind You",
};

export default function Page() {
  return <ResendActivationView type="personal" />;
}
