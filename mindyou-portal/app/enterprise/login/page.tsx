import type { Metadata } from "next";
import { LoginView } from "@/components/auth/login-view";

export const metadata: Metadata = {
  title: "Login | Mind You",
};

export default function Page() {
  return <LoginView type="enterprise" />;
}
