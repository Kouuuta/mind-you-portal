import type { Metadata } from "next";
import { ActivateView } from "@/components/auth/activate-view";

export const metadata: Metadata = {
  title: "Activate Account | Mind You",
};

export default function Page() {
  return <ActivateView type="personal" />;
}
