"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { healingFeedbackData } from "@/lib/healingFeedbackData";

export default function HealingLineChart() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <ResponsiveContainer width="90%" height="100%">
        <LineChart data={healingFeedbackData}>
          <XAxis dataKey="month" />
          <YAxis domain={[0, 100]} />
          <Tooltip formatter={(v) => `${v}%`} />
          <Line type="monotone" dataKey="percent" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
