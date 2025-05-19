"use client";
import { getDailyEmotion } from "@/lib/userDashboard";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type DailyEmotion = {
  date: string;
  positive: number;
};

export default function EmotionDailyBarChart() {
  const [data, setData] = useState<DailyEmotion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDailyEmotion = async () => {
      try {
        const res = await getDailyEmotion();
        setData(res);
      } catch (err) {
        console.error("일일 감정 지수 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDailyEmotion();
  }, []);

  if (loading) {
    return <p className="text-gray-400 text-sm">로딩 중...</p>;
  }

  if (data.length < 2) {
    return (
      <p className="text-gray-400 text-sm text-center">
        일일 감정 데이터가 부족합니다.
        <br />
        음성 일기를 며칠 더 작성해 보세요.
      </p>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <ResponsiveContainer width="95%" height="100%">
        <BarChart
          data={data}
          barCategoryGap={8}
          margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
        >
          <XAxis dataKey="date" angle={-45} textAnchor="end" height={60} />
          <YAxis domain={[0, 100]} />
          <Tooltip formatter={(v) => `${v}%`} />
          <Bar
            dataKey="positive"
            fill="#4f46e5"
            barSize={12}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
