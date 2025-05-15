"use client";
import { getHealingProgramStats } from "@/lib/userDashboard";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#a78bfa", "#f87171", "#34d399"];

type ProgramStat = {
  name: string;
  value: number;
};

export default function HealingPieChart() {
  const [data, setData] = useState<ProgramStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getHealingProgramStats();
        setData(res);
      } catch (err) {
        console.error("힐링 프로그램 통계 요청 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <p className="text-gray-400 text-sm">로딩 중...</p>;
  }

  if (data.length === 0) {
    return (
      <p className="text-gray-400 text-sm text-center">
        아직 힐링 프로그램 사용 기록이 없습니다.
        <br />
        원하는 프로그램을 선택해 마음을 돌봐 보세요.
      </p>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip formatter={(v) => `${v}회`} />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={60}
            labelLine={false}
            label={({ name }) => name}
          >
            {(data as { name: string; value: number }[]).map(
              (_, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              )
            )}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
