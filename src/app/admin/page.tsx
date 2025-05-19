// src/app/admin/page.tsx
// 관리자 대시보드 페이지

"use client";

import { authRequest } from "@/lib/axiosInstance";
import StatCard from "@/app/components/admin/StatCard";
import UserTrendChart, {
  UserTrendData,
} from "@/app/components/admin/UserTrendChart";
import HealingProgramTrendChart, {
  HealingTrendItem,
} from "@/app/components/admin/HealingProgramTrendChart";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Users, PenSquare, MailQuestion } from "lucide-react";
import { LayoutDashboard } from "lucide-react";

type StatsData = {
  userCount: number;
  todayJournalCount: number;
  unansweredCount: number;
};

function AdminDashboardPage() {
  const router = useRouter();

  // 통계 카드용 요약 데이터: 전체 가입자 수, 오늘 작성된 일기 수
  const [stats, setStats] = useState<StatsData | null>(null);
  // 당일 가입자 & 활성 사용자 증가 추이 데이터
  const [userTrend, setUserTrend] = useState<UserTrendData[] | null>(null);
  // 힐링 프로그램 사용 추이 데이터
  const [healingTrend, setHealingTrend] = useState<HealingTrendItem[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await authRequest.get("/admin/dashboard");
        const userTrendsCleaned = response.data.userTrends.map((item: any) => ({
          ...item,
          signUps: item.signUps < 0 ? 0 : item.signUps,
          activeUsers: item.activeUsers < 0 ? 0 : item.activeUsers,
        }));

        setStats(response.data.stats);
        setUserTrend(userTrendsCleaned);
        setHealingTrend(response.data.healingUsage);
      } catch (err) {
        alert("대시보드 데이터 불러오기 실패");
        console.error("대시보드 데이터 불러오기 실패:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-8 space-y-8">
      <h2 className="inline-flex items-center gap-2 text-2xl font-bold">
        <LayoutDashboard className="w-8 h-8" />
        관리자 대시보드
      </h2>

      {/* 요약 카드 */}
      <div className="grid sm:grid-cols-3 lg:grid-cols-3 gap-4">
        <StatCard
          title="전체 사용자 수"
          value={stats ? stats?.userCount : "-"}
          icon={<Users />}
        />
        <StatCard
          title="오늘 일기 수"
          value={stats ? stats.todayJournalCount : "-"}
          icon={<PenSquare />}
        />
        <StatCard
          title="미답변 문의 수"
          value={
            typeof stats?.unansweredCount === "number"
              ? `${stats.unansweredCount}건`
              : "-"
          }
          icon={<MailQuestion />}
          // 클릭 시 문의 목록 페이지로 이동
          onClick={() => router.push("/admin/inquiries?filter=pending")}
        />
      </div>

      {/* 차트(그래프) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 당일 가입자 & 활성 사용자 증가 추이 */}
        <div>{userTrend && <UserTrendChart trends={userTrend} />}</div>
        <div>
          <HealingProgramTrendChart trends={healingTrend} />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;

// const fetchMockData = async () => {
//   // mock data 정의
//   const mockStats = {
//     userCount: 1234,
//     todayJournalCount: 56,
//     unansweredCount: 3,
//   };

//   const mockUserTrend = [
//     { date: "2025-04-29", signUps: 12, activeUsers: 34 },
//     { date: "2025-04-30", signUps: 15, activeUsers: 40 },
//     { date: "2025-05-01", signUps: 8, activeUsers: 28 },
//     { date: "2025-05-02", signUps: 10, activeUsers: 35 },
//     { date: "2025-05-03", signUps: 17, activeUsers: 42 },
//     { date: "2025-05-04", signUps: 20, activeUsers: 50 },
//     { date: "2025-05-05", signUps: 18, activeUsers: 45 },
//   ];

//   const mockHealingTrend = [
//     {
//       date: "2025-04-29",
//       명상: 10,
//       요가: 8,
//       음악감상: 5,
//     },
//     {
//       date: "2025-04-30",
//       명상: 14,
//       요가: 12,
//       음악감상: 6,
//     },
//     {
//       date: "2025-05-01",
//       명상: 13,
//       요가: 9,
//       음악감상: 7,
//     },
//     {
//       date: "2025-05-02",
//       명상: 15,
//       요가: 14,
//       음악감상: 9,
//     },
//     {
//       date: "2025-05-03",
//       명상: 17,
//       요가: 10,
//       음악감상: 11,
//     },
//     {
//       date: "2025-05-04",
//       명상: 19,
//       요가: 13,
//       음악감상: 10,
//     },
//     {
//       date: "2025-05-05",
//       명상: 20,
//       요가: 15,
//       음악감상: 12,
//     },
//   ];

//   // state 세팅
//   setStats(mockStats);
//   setUserTrend(mockUserTrend);
//   setHealingTrend(mockHealingTrend);
// };

// fetchMockData();
