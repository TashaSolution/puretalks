"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";

const APP_ROUTES = ["/dashboard", "/admin"];

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAppRoute =
    pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin");

  return (
    <>
      {!isAppRoute && <Header />}
      <main className="flex-1">{children}</main>
      {!isAppRoute && <Footer />}
    </>
  );
}