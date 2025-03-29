// components/admin/AdminSidebar.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* 모바일용 햄버거 버튼 */}
      <button
        className="lg:hidden fixed top-4 left-4 z-30 p-2 rounded bg-white border shadow"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* 사이드바 영역 */}
      <aside
        className={`fixed top-0 left-0 w-60 bg-white h-screen min-h-screen border-r px-4 py-6 z-20 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:block`}
      >
        <div className="pl-14 lg:pl-0 text-2xl font-bold mb-10 text-blue-700">MaumRecord</div>
        <nav className="flex flex-col gap-4 text-gray-700 font-semibold text-md lg:text-lg">
          <Link href="/admin" className="hover:text-blue-600">대시보드</Link>
          <Link href="/admin/users" className="hover:text-blue-600">사용자 관리</Link>
          {/* <Link href="/admin/stats" className="hover:text-blue-600">통계</Link>
          <Link href="/admin/settings" className="hover:text-blue-600">설정</Link> */}
        </nav>
      </aside>
    </>
  );
}