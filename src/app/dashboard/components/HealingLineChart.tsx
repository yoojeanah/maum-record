"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: {
    month: string;
    percent: number;
  }[];
};

export default function HealingLineChart({ data }: Props) {
  if (!data || data.length === 0) {
    return (
      <div className="text-gray-400 text-sm text-center">
        아직 힐링 프로그램 피드백 데이터가 없습니다.
        <br />
        힐링 프로그램을 사용하시면 그래프가 표시돼요. 🌱
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <ResponsiveContainer width="90%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis domain={[0, 100]} />
          <Tooltip formatter={(v) => `${v}%`} />
          <Line
            type="monotone"
            dataKey="percent"
            stroke="#3b82f6"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
