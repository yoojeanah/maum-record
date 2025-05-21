// src/app/admin/users/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
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

type HealingLog = {
  program: string;
  usedAt: string;
};

function UserDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [healingLogs, setHealingLogs] = useState<HealingLog[]>([]);

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

  useEffect(() => {
    const fetchHealingLogs = async () => {
      try {
        const res = await authRequest.get(`/admin/users/${id}/healing-logs`);
        setHealingLogs(res.data);
      } catch (err) {
        console.error("힐링 이력 불러오기 실패", err);
      }
    };

    if (user) {
      fetchHealingLogs();
    }
  }, [user]);

  // 사용자 삭제 핸들러
  const handleDelete = async () => {
    const confirmed = window.confirm("정말로 이 사용자를 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      const res = await authRequest.delete(`/admin/delete/${id}`);
      alert(res.data.result || "삭제되었습니다.");
      router.push("/admin/users"); // 삭제 후 목록으로 이동
    } catch (err) {
      console.error("사용자 삭제 실패", err);
      alert("사용자 삭제에 실패했습니다.");
    }
  };

  if (loading) return <p className="p-6">로딩 중...</p>;
  if (!user) return <p className="p-6">사용자 정보를 찾을 수 없습니다.</p>;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">👤 사용자 상세 정보</h2>

      <div className="bg-white p-4 rounded shadow space-y-2">
        <p>
          <strong>권한:</strong>{" "}
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              user.role === "ADMIN"
                ? "bg-purple-100 text-purple-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {user.role}
          </span>
        </p>
        <p>
          <strong>이메일:</strong> {user.email}
        </p>
        <p>
          <strong>닉네임:</strong> {user.nickName}
        </p>
        <p>
          <strong>가입일:</strong>{" "}
          {new Date(user.createdAt).toLocaleDateString()}
        </p>
        <p>
          <strong>작성한 일기 수:</strong> {user.count}
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
        <div className="mt-4 text-right">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            사용자 삭제
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">
          🧘 힐링 프로그램 사용 이력
        </h3>
        {healingLogs.length === 0 ? (
          <p className="text-gray-500 text-sm">사용 이력이 없습니다.</p>
        ) : (
          <ul className="text-sm space-y-1">
            {healingLogs.map((log, index) => (
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

export default UserDetailPage;

// mock data
// const mockUser: User = {
//   id: 1,
//   email: "yoojin@example.com",
//   nickName: "유진",
//   image: null,
//   role: "USER",
//   createdAt: "2025-01-01T10:00:00Z",
//   count: 12,
//   lastHealingProgram: "명상",
//   lastHealingDate: "2025-05-18",
//   active: true,
// };

// const mockHealingLogs: HealingLog[] = [
//   { program: "명상", usedAt: "2025-05-18T08:30:00Z" },
//   { program: "요가", usedAt: "2025-05-16T07:20:00Z" },
//   { program: "음악 감상", usedAt: "2025-05-10T22:10:00Z" },
// ];

// useEffect(() => {
//   setTimeout(() => {
//     setUser(mockUser);
//     setHealingLogs(mockHealingLogs);
//     setLoading(false);
//   }, 300); // 간단한 로딩 효과 시뮬레이션
// }, []);
