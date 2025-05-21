"use client";
import { getMonthlyEmotion } from "@/lib/userDashboard";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type EmotionData = {
  month: string;
  positive: number;
};

export default function EmotionBarChart() {
  const [data, setData] = useState<EmotionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonthlyEmotion = async () => {
      try {
        const res = await getMonthlyEmotion();
        setData(res);
      } catch (err) {
        console.error("월별 긍정 지수 요청 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyEmotion();
  }, []);

  if (loading) {
    return <p className="text-gray-400 text-sm">로딩 중...</p>;
  }

  if (data.length === 0) {
    return (
      <p className="text-gray-400 text-sm text-center">
        감정 데이터가 아직 없습니다.
        <br />
        음성 일기를 작성하시면 긍정 지수가 기록돼요. ✨
      </p>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <ResponsiveContainer width="90%" height="100%">
        <BarChart data={data} barCategoryGap={24} barGap={4}>
          <XAxis dataKey="month" />
          <YAxis domain={[0, 100]} />
          <Tooltip formatter={(v) => `${v}%`} />
          <Bar
            dataKey="positive"
            fill="#34d399"
            barSize={16}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
