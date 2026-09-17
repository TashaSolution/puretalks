import React from "react";
import { ClientLayoutWrapper } from "./ClientLayoutWrapper";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return <ClientLayoutWrapper>{children}</ClientLayoutWrapper>;
}
