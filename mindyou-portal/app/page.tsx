import type { Metadata } from "next";
import { AccountTypeView } from "@/components/auth/account-type-view";

export const metadata: Metadata = {
  title: "Choose Account Type | Mind You",
};

export default function Page() {
  return <AccountTypeView />;
}
