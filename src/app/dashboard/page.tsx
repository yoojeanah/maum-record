"use client";
import HealingLineChart from "./components/HealingLineChart";
import EmotionBarChart from "./components/EmotionBarChart";
import EmotionYearlyBarChart from "./components/EmotionDailyBarChart";
import HealingPieChart from "./components/HealingPieChart";
import HamburgerMenu from "@/app/components/HamburgerMenu";

import { getHealingFeedback } from "@/lib/userDashboard";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [data, setData] = useState<{ month: string; percent: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealingFeedback = async () => {
      try {
        const res = await getHealingFeedback();
        setData(res);
      } catch (error) {
        console.error("힐링 피드백 데이터를 가져오는 데 실패했습니다:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHealingFeedback();
  }, []);

  const latest = data[data.length - 1];
  const currentMonthLabel = latest?.month ?? "-";
  const currentPercent = latest?.percent ?? 0;

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50">
      <HamburgerMenu />
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-10">
        나의 감정 대시보드 🌿
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/3 bg-white rounded-xl shadow p-4 flex flex-col">
          <div className="pt-1 pb-2">
            <p className="text-sm font-semibold text-gray-700">
              {currentMonthLabel} 힐링 피드백
            </p>
            <p className="text-4xl font-bold text-blue-600 mt-1">
              {currentPercent}%
            </p>
          </div>
          <div className="w-full h-48 mt-8 flex items-center justify-center">
            <HealingLineChart data={data} />
          </div>
        </div>

        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <div className="bg-white rounded-xl shadow p-4 h-48">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">
              월별 긍정 지수
            </h2>
            <div className="w-full h-full">
              <EmotionBarChart />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 h-48">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">
              일일 긍정 지수
            </h2>
            <div className="w-full h-full">
              <EmotionYearlyBarChart />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3 bg-white rounded-xl shadow p-4 flex flex-col items-center">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">
            힐링 프로그램 이용 통계
          </h2>
          <div className="w-full h-64 mt-8">
            <HealingPieChart />
          </div>
        </div>
      </div>
    </div>
  );
}
