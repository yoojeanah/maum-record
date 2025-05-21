// src/app/admin/users/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { authRequest } from "@/lib/axiosInstance";

type User = {
  id: number;
  email: string;
  nickName: string;
  image: string | null;
  role: "USER" | "ADMIN";
  createdAt: string;
  count: number;
  lastHealingProgram: string | null;
  lastHealingDate: string | null;
  active: boolean;
};

function AdminUserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await authRequest.get("/admin/users");
        setUsers(res.data);
      } catch (error) {
        console.error("사용자 데이터를 불러오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <p className="p-6">로딩 중...</p>;

  const maskEmail = (email: string) => {
    const [name, domain] = email.split("@");
    const maskedName =
      name.length > 2 ? name.slice(0, 2) + "*".repeat(name.length - 2) : name;
    return `${maskedName}@${domain}`;
  };

  return (
    <div className="p-6">
      <h2 className="inline-flex gap-2 items-center text-2xl font-bold mb-4">
        <Users className="w-8 h-8" />
        사용자 관리
      </h2>
      <div className="overflow-x-auto shadow border rounded-lg bg-white">
        <table className="min-w-full bg-white text-sm whitespace-nowrap">
          <thead className="bg-gray-100 text-gray-600 font-medium">
            <tr>
              <th className="px-4 py-3 text-left">이메일</th>
              <th className="px-4 py-3 text-left">가입일</th>
              <th className="px-4 py-3 text-center">일기 수</th>
              <th className="px-4 py-3 text-center">최근 힐링</th>
              <th className="px-4 py-3 text-center">상태</th>
              <th className="px-4 py-3 text-center">권한</th>
              <th className="px-4 py-3 text-center">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y text-gray-700">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-2 text-left">{maskEmail(user.email)}</td>
                <td className="px-4 py-2 text-left">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-center">{user.count}</td>
                <td className="px-4 py-2 text-center">
                  {user.lastHealingProgram
                    ? `${user.lastHealingProgram} (${user.lastHealingDate})`
                    : "없음"}
                </td>
                <td className="px-4 py-2 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      user.active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.active ? "활성" : "비활성"}
                  </span>
                </td>
                <td className="px-4 py-2 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      user.role === "ADMIN"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-2 text-center">
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

export default AdminUserPage;

// ✅ MOCK DATA
// 아래 mockUsers를 useEffect에서 setUsers(mockUsers)로 사용 가능
const mockUsers: User[] = [
  {
    id: 1,
    email: "admin@example.com",
    nickName: "관리자",
    image: null,
    role: "ADMIN",
    createdAt: "2024-12-01T10:00:00Z",
    count: 14,
    lastHealingProgram: "명상",
    lastHealingDate: "2025-05-20",
    active: true,
  },
  {
    id: 2,
    email: "user1@example.com",
    nickName: "유저1",
    image: null,
    role: "USER",
    createdAt: "2025-01-10T14:22:00Z",
    count: 5,
    lastHealingProgram: "요가",
    lastHealingDate: "2025-05-19",
    active: true,
  },
  {
    id: 3,
    email: "user2@example.com",
    nickName: "유저2",
    image: null,
    role: "USER",
    createdAt: "2025-03-05T09:00:00Z",
    count: 0,
    lastHealingProgram: null,
    lastHealingDate: null,
    active: false,
  },
];

// 모의 데이터로 실행하고 싶을 경우 여기를 주석 해제하고 위 fetchUsers()를 주석 처리하세요
// setTimeout(() => {
//   setUsers(mockUsers);
//   setLoading(false);
// }, 300);
