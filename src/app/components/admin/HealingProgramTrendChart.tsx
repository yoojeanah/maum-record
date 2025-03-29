'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const data = [
  { date: '3/17', 명상: 8, 음악감상: 5, 호흡운동: 3 },
  { date: '3/18', 명상: 6, 음악감상: 7, 호흡운동: 2 },
  { date: '3/19', 명상: 10, 음악감상: 4, 호흡운동: 5 },
  { date: '3/20', 명상: 5, 음악감상: 6, 호흡운동: 4 },
  { date: '3/21', 명상: 7, 음악감상: 8, 호흡운동: 3 },
  { date: '3/22', 명상: 4, 음악감상: 6, 호흡운동: 2 },
  { date: '3/23', 명상: 9, 음악감상: 7, 호흡운동: 4 },
];

export default function HealingProgramTrendChart() {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4">📈 힐링 프로그램 사용 추이 (최근 7일)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="명상" stroke="#3b82f6" strokeWidth={2} />
          <Line type="monotone" dataKey="음악감상" stroke="#10b981" strokeWidth={2} />
          <Line type="monotone" dataKey="호흡운동" stroke="#f97316" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}