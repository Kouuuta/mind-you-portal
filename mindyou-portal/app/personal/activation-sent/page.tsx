import type { Metadata } from "next";
import { ActivationSentView } from "@/components/auth/activation-sent-view";

export const metadata: Metadata = {
  title: "Activation Email Sent | Mind You",
};

export default function Page() {
  return <ActivationSentView type="personal" />;
}
