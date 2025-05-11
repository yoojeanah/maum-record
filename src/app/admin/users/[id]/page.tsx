"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import withAdminAuth from "@/app/components/auth/withAdminAuth";
import { authRequest } from "@/lib/axiosInstance";

type UserDetail = {
  id: number;
  email: string;
  createdAt: string;
  journalCount: number;
  active: boolean;
  healingLogs: {
    program: string;
    usedAt: string;
  }[];
};

function UserDetailPage() {
  const { id } = useParams();
  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const res = await authRequest.get(`/admin/users/${id}`);
        setUser(res.data);
      } catch (err: any) {
        console.error("사용자 상세 정보를 불러오지 못했습니다.", err);
        if (err.response?.status === 404) {
          notFound(); // 해당 유저 존재하지 않는 경우, Next.js 내장 404 페이지로 이동
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetail();
  }, [id]);

  if (loading) return <p className="p-6">로딩 중...</p>;
  if (!user) return <p className="p-6">사용자 정보를 찾을 수 없습니다.</p>;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">👤 사용자 상세 정보</h2>

      <div className="bg-white p-4 rounded shadow space-y-2">
        <p>
          <strong>이메일:</strong> {user.email}
        </p>
        <p>
          <strong>가입일:</strong>{" "}
          {new Date(user.createdAt).toLocaleDateString()}
        </p>
        <p>
          <strong>작성한 일기 수:</strong> {user.journalCount}
        </p>
        <p>
          <strong>계정 상태:</strong>{" "}
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              user.active
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {user.active ? "활성" : "비활성"}
          </span>
        </p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">
          🧘 힐링 프로그램 사용 이력
        </h3>
        {user.healingLogs.length === 0 ? (
          <p className="text-gray-500 text-sm">사용 이력이 없습니다.</p>
        ) : (
          <ul className="text-sm space-y-1">
            {user.healingLogs.map((log, index) => (
              <li key={index} className="flex justify-between">
                <span>{log.program}</span>
                <span>{new Date(log.usedAt).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
// TODO: 관리자 페이지 구현 완료 시, 관리자 인증 HOC를 추가
// export default withAdminAuth(UserDetailPage);
export default UserDetailPage;

// mock data
// const mockUser = {
//   id: 1,
//   email: "yoojin@example.com",
//   createdAt: "2024-12-01T10:00:00Z",
//   journalCount: 14,
//   active: true,
//   healingLogs: [
//     { program: "명상", usedAt: "2025-03-23" },
//     { program: "요가", usedAt: "2025-03-21" },
//     { program: "음악 감상", usedAt: "2025-03-19" },
//   ],
// };
// type UserDetail = typeof mockUser;
