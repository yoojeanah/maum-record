// app/admin/layout.tsx
"use client";

import { ReactNode } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Area */}
        <div className="flex flex-col flex-1 ">
          {/* Top Header */}
          <AdminHeader />

          {/* Page Content */}
          <main className="p-6">{children}</main>
        </div>
      </div>
      {/*TODO: 개발 중에만 켜두기, 배포 전 주석 처리 */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
