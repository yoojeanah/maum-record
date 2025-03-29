'use client';

import { useEffect, useState } from 'react';
import AdminLogoutButton from './AdminLogout';

export default function AdminHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin-token');
    setIsLoggedIn(!!token);
    
    // 로그인 이벤트 수신
    const handleLogin = () => setIsLoggedIn(true);
    const handleLogout = () => setIsLoggedIn(false);

    window.addEventListener('admin-login', handleLogin);
    window.addEventListener('admin-logout', handleLogout);

    return () => {
      window.removeEventListener('admin-login', handleLogin);
      window.removeEventListener('admin-logout', handleLogout);
    };
  }, []);

  return (
    <header className="h-16 px-4 sm:px-6 flex items-center justify-between bg-white border-b sticky top-0 z-10 shadow-sm">
      <h1 className="text-xl sm:text-lg font-bold text-gray-800 sm:ml-10">관리자 페이지</h1>

      {isLoggedIn && (
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span>안녕하세요, <span className="font-medium">관리자님</span></span>
          <span className="text-gray-300">|</span>
          <AdminLogoutButton />
        </div>
      )}
    </header>
  );
}