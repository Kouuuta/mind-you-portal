export type AccountType = "enterprise" | "personal";

export const brand: Record<
  AccountType,
  {
    label: string;
    accent: string;
    accentDark: string;
    accentTint: string;
    ring: string;
  }
> = {
  enterprise: {
    label: "ENTERPRISE",
    accent: "bg-enterprise",
    accentDark: "hover:bg-enterprise-dark",
    accentTint: "text-enterprise-tint",
    ring: "focus:border-enterprise",
  },
  personal: {
    label: "PERSONAL",
    accent: "bg-personal",
    accentDark: "hover:bg-personal-dark",
    accentTint: "text-personal-tint",
    ring: "focus:border-personal",
  },
};
