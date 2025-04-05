"use client";
import React from "react";

type FeedbackModalProps = {
  show: boolean;
  onSelect: (feedback: string) => void;
};

export default function FeedbackModal({ show, onSelect }: FeedbackModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-96 text-center animate-toast">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          힐링 프로그램이 도움이 되셨나요?
        </h3>
        <div className="flex justify-center gap-6 text-3xl">
          <button
            onClick={() => onSelect("좋았다")}
            className="hover:scale-110 transition"
          >
            👍
          </button>
          <button
            onClick={() => onSelect("별로였다")}
            className="hover:scale-110 transition"
          >
            👎
          </button>
        </div>
      </div>
    </div>
  );
}
