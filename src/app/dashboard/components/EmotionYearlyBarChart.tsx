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
  { year: "2023", positive: 64 },
  { year: "2024", positive: 71 },
  { year: "2025", positive: 82 },
];

export default function EmotionYearlyBarChart() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <ResponsiveContainer width="90%" height="100%">
        <BarChart data={data} barCategoryGap={24}>
          <XAxis dataKey="year" />
          <YAxis domain={[0, 100]} />
          <Tooltip formatter={(v) => `${v}%`} />
          <Bar dataKey="positive" fill="#60a5fa" barSize={24} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
