import type { Metadata } from "next";
import { CreatePasswordView } from "@/components/auth/create-password-view";

export const metadata: Metadata = {
  title: "Create Password | Mind You",
};

export default function Page() {
  return <CreatePasswordView type="enterprise" />;
}
