import { ReactNode } from 'react';

type StatCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
  className?: string;
};

export default function StatCard({ title, value, icon, className = '' }: StatCardProps) {
  return (
    <div className={`bg-white rounded-xl shadow p-4 flex items-center gap-4 ${className}`}>
      <div className="w-12 h-12 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full text-xl">
        {icon}
      </div>
      <div>
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-xl font-semibold">{value}</div>
      </div>
    </div>
  );
}