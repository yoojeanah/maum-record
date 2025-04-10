// src/app/components/admin/StatCard.tsx
// 관리자 대시보드에서 요약 카드 보여주는 컴포넌트 (전체 사용자 수, 오늘 일기 수, 평균 긍정률, 미답변 문의 수)

import { ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function StatCard({
  title,
  value,
  icon,
  className = "",
  onClick,
}: StatCardProps) {
  const clickable = !!onClick;

  return (
    <div
      onClick={onClick} // 미답변 문의 수 카드 클릭 가능하게 (클릭 시, 문의 목록 페이지로 이동)
      className={`bg-white rounded-xl shadow-sm border border-transparent p-4 flex items-center gap-4 
      ${
        clickable
          ? "cursor-pointer hover:shadow-lg hover:border-blue-500 hover:border-2 transition"
          : ""
      }
      ${className}`}
    >
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
