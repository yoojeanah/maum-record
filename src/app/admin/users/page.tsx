"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import withAdminAuth from "@/app/components/auth/withAdminAuth";
import { Users } from "lucide-react";
import { authRequest } from "@/lib/axiosInstance";

type User = {
  id: number;
  email: string;
  createdAt: string;
  journalCount: number;
  lastHealingProgram?: string; // e.g., '명상'
  lastHealingDate?: string; // e.g., '2025-03-22'
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
                <td className="px-4 py-2">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-center">{user.journalCount}</td>
                <td className="px-4 py-2 text-center">
                  {user.lastHealingProgram
                    ? `${user.lastHealingProgram} (${user.lastHealingDate})`
                    : "없음"}
                </td>
                <td className="px-4 py-2">
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
// TODO: 관리자 페이지 구현 완료 시, 관리자 인증 HOC를 추가
// export default withAdminAuth(AdminUserPage);
export default AdminUserPage;

// mock data
// const fetchMockUsers = async () => {
//   const mockUsers: User[] = [
//     {
//       id: 1,
//       email: "euuser@example.com",
//       createdAt: "2024-12-01",
//       journalCount: 14,
//       active: true,
//     },
//     {
//       id: 2,
//       email: "causer@example.com",
//       createdAt: "2025-01-10",
//       journalCount: 7,
//       active: false,
//     },
//     {
//       id: 3,
//       email: "kimuser1@example.com",
//       createdAt: "2025-01-10T12:34:56Z",
//       journalCount: 12,
//       lastHealingProgram: "명상",
//       lastHealingDate: "2025-04-30",
//       active: true,
//     },
//     {
//       id: 4,
//       email: "leeuser2@example.com",
//       createdAt: "2025-02-15T08:20:00Z",
//       journalCount: 0,
//       active: false,
//     },
//     {
//       id: 5,
//       email: "parkuser3@example.com",
//       createdAt: "2025-03-01T15:00:00Z",
//       journalCount: 7,
//       lastHealingProgram: "요가",
//       lastHealingDate: "2025-05-04",
//       active: true,
//     },
//   ];
//   await new Promise((r) => setTimeout(r, 300)); // 로딩 흉내
//   setUsers(mockUsers);
//   setLoading(false);
// };

// fetchMockUsers();
