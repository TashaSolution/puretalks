import type { Metadata } from "next";
import { AdminLayoutClient } from "@/components/dashboard/AdminLayoutClient";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute roles={["admin"]} forbiddenPath="/dashboard">
      <AdminLayoutClient>{children}</AdminLayoutClient>
    </ProtectedRoute>
  );
}
