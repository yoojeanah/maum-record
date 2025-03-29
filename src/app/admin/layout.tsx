// app/admin/layout.tsx
import { ReactNode } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';

export default function AdminLayout({ children }: { children: ReactNode }) {
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Area */}
      <div className="flex flex-col flex-1 ">
        {/* Top Header */}
        <AdminHeader />

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
