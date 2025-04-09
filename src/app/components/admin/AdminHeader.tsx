// src/app/components/admin/AdminHeader.tsx
// 관리자 페이지 헤더 컴포넌트

'use client';

import { logoutUser } from '@/lib/logout';
import { useRouter } from 'next/navigation';

export default function AdminHeader() {

  const router = useRouter();

  // 로그아웃 후 로그인 페이지로 리다이렉트
  const handleLogout = async () => {
    await logoutUser();
    router.push('/login');
  }

  return (
    <header className="h-16 px-4 sm:px-6 flex items-center justify-between bg-white border-b sticky top-0 z-10 shadow-sm">
      <h1 className="ml-14 text-base md:text-lg lg:text-xl lg:ml-4 font-bold text-blue-700">관리자 페이지</h1>
      <div className="flex items-center space-x-4 text-sm text-gray-600">
        <span>안녕하세요, <span className="font-medium">관리자님</span></span>
        <span className="text-gray-300">|</span>
        <button
      onClick={handleLogout}
      className="text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
    >
      로그아웃
    </button>
      </div>
    </header>
  );
}