'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import withAdminAuth from '@/app/components/admin/withAdminAuth';

type User = {
  id: number;
  email: string;
  createdAt: string;
  journalCount: number;
  lastHealingProgram?: string; // e.g., '명상'
  lastHealingDate?: string;    // e.g., '2025-03-22'
  active: boolean;
};

function AdminUserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/admin/users');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error('사용자 데이터를 불러오지 못했습니다.', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  /*
    Spring Boot API 연동 버전 (token 필요하다면)
  useEffect(() => {
  	const fetchUsers = async () => {
  	  try {
  		const res = await fetch('https://api.myproject.com/admin/users', {
  		  headers: {
  			'Authorization': `Bearer ${accessToken}`,  // 토큰이 필요하다면
  		  },
  		});

  		if (!res.ok) throw new Error('서버 오류');

  		const data = await res.json();
  		setUsers(data);
  	  } catch (err) {
  		console.error('사용자 데이터를 불러오지 못했습니다.', err);
  	  } finally {
  		setLoading(false);
  	  }
  	};

  	fetchUsers();
    }, []);
    */

  if (loading) return <p className="p-6">로딩 중...</p>;

  const maskEmail = (email: string) => {
    const [name, domain] = email.split('@');
    const maskedName = name.length > 2 ? name.slice(0, 2) + '*'.repeat(name.length - 2) : name;
    return `${maskedName}@${domain}`;
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">👤 사용자 관리</h2>
      <div className="overflow-x-auto shadow border rounded-lg bg-white">
        <table className="min-w-full bg-white text-sm text-left whitespace-nowrap">
          <thead className="bg-gray-100 text-left text-gray-600 font-medium">
            <tr>
              <th className="px-4 py-3">이메일</th>
              <th className="px-4 py-3">가입일</th>
              <th className="px-4 py-3">일기 수</th>
              <th className="px-4 py-3">최근 힐링</th>
              <th className="px-4 py-3">상태</th>
              <th className="px-4 py-3">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y text-gray-700">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-2">{maskEmail(user.email)}</td>
                <td className="px-4 py-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-2 text-center">{user.journalCount}</td>
                <td className="px-4 py-2 text-center">
                  {user.lastHealingProgram ? `${user.lastHealingProgram} (${user.lastHealingDate})` : '없음'}
                </td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {user.active ? '활성' : '비활성'}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <Link
                    href={`/admin/users/${user.id}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    상세 보기
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default withAdminAuth(AdminUserPage);