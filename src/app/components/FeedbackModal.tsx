"use client";
import React, { useState } from "react";

type FeedbackModalProps = {
  show: boolean;
  onSelect: (feedback: string, categories: string[]) => void;
  nickname: string;
};

export default function FeedbackModal({ show, onSelect, nickname }: FeedbackModalProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  if (!show) return null;

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleFeedback = (feedback: string) => {
    // TODO: 백엔드 연동 시 아래 onSelect를 통해 피드백 텍스트와 선택된 카테고리 배열 전달
    onSelect(feedback, selectedCategories);
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-96 text-center animate-toast">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          힐링 프로그램이 도움이 되었나요?
        </h3>

        <div className="text-sm text-gray-700 mb-3">
          {nickname} 님께서 진행하신 프로그램을 선택해 주세요.
        </div>

        <div className="flex flex-col items-start gap-2 text-sm text-gray-800 mb-6">
          {["명상", "요가 스트레칭", "음악 감상"].map((category) => (
            <label key={category} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                className="accent-blue-500 w-4 h-4 rounded border-gray-300"
              />
              <span>{category}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-center gap-6 text-3xl">
          <button
            onClick={() => handleFeedback("좋았다")}
            className="hover:scale-110 transition"
          >
            👍
          </button>
          <button
            onClick={() => handleFeedback("별로였다")}
            className="hover:scale-110 transition"
          >
            👎
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes toast {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-toast {
          animation: toast 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}

// 예시
// {
//   "feedback": "좋았다",
//   "categories": ["명상", "음악 감상"]
// }
