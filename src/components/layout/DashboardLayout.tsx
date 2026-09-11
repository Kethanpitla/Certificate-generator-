import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface DashboardLayoutProps {
  children: ReactNode;
  activeItem?: string;
}

export default function DashboardLayout({
  children,
  activeItem = "Dashboard",
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar activeItem={activeItem} />

      <Header />

      <main className="ml-64 min-h-screen pt-20">
        <div className="p-6 lg:p-8">
          <div className="mx-auto max-w-[1600px]">{children}</div>
        </div>
      </main>
    </div>
  );
}