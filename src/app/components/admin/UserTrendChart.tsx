// src/app/components/admin/UserTrendChart.tsx
// 당일 가입자 & 활성 사용자 증가 추이 차트 보여주는 컴포넌트

"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// UserTrend 데이터 타입 정의
export type UserTrendData = {
  date: string;
  signUps: number;
  activeUsers: number;
};

interface Props {
  trends: UserTrendData[];
}

export default function UserTrendChart({ trends }: Props) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4">
        📈 가입자 & 활성 사용자 증가 추이 (최근 7일)
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
          <Line
            type="monotone"
            dataKey="signUps"
            stroke="#3b82f6"
            name="가입자 수"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="activeUsers"
            stroke="#f97316"
            name="활성 사용자 수"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
