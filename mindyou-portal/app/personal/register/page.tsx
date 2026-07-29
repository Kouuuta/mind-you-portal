import type { Metadata } from "next";
import { RegisterView } from "@/components/auth/register-view";

export const metadata: Metadata = {
  title: "Register | Mind You",
};

export default function Page() {
  return <RegisterView type="personal" />;
}
