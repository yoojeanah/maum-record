"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "2024.11", positive: 68 },
  { month: "2024.12", positive: 75 },
  { month: "2025.01", positive: 61 },
  { month: "2025.02", positive: 70 },
  { month: "2025.03", positive: 79 },
  { month: "2025.04", positive: 85 },
];

export default function EmotionBarChart() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <ResponsiveContainer width="90%" height="100%">
        <BarChart data={data} barCategoryGap={24} barGap={4}>
          <XAxis dataKey="month" />
          <YAxis domain={[0, 100]} />
          <Tooltip formatter={(v) => `${v}%`} />
          <Bar dataKey="positive" fill="#34d399" barSize={16} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
