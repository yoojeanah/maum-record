// src/app/components/admin/HealingProgramTrendChart.tsx
// 힐링 프로그램 사용 추이 차트 컴포넌트

"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useEffect, useState } from "react";

export type HealingTrendItem = {
  date: string;
  [program: string]: string | number;
};

interface Props {
  trends: HealingTrendItem[];
}

export default function HealingProgramTrendChart({ trends }: Props) {
  // 추출된 동적 key
  const [programKeys, setProgramKeys] = useState<string[]>([]);

  // trends(객체의 배열) 데이터에서 동적 key 추출
  useEffect(() => {
    if (trends.length > 0) {
      const keys = Object.keys(trends[0]).filter((key) => key !== "date"); // 첫 번째 객체에서 'date' 제외한 key들 추출
      setProgramKeys(keys);
    }
  }, [trends]);

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4">
        📈 힐링 프로그램 사용 추이 (최근 7일)
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={trends}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />

          {programKeys.map((key, idx) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={getColor(idx)}
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// 동적으로 색상 반환하는 함수
const getColor = (index: number) => {
  const colors = [
    "#3b82f6",
    "#10b981",
    "#f97316",
    "#6366f1",
    "#ec4899",
    "#22d3ee",
    "#facc15",
    "#8b5cf6",
  ];
  return colors[index % colors.length];
};
