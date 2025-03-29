'use client';

import { useRouter } from 'next/navigation';

export default function AdminLogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    window.dispatchEvent(new Event('admin-logout'));
    router.push('/admin/login');
  };

  return (
<button
  onClick={handleLogout}
  className="text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
>
  로그아웃
</button>
  );
}