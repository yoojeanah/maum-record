'use client';
import React from 'react';

type Props = {
  onConfirm: () => void;
};

export default function AnalysisToast({ onConfirm }: Props) {
    return (
      <div className="fixed bottom-6 right-6 z-50 bg-white border border-gray-200 rounded-xl shadow-md px-7 py-6 w-96 animate-toast">
        <h2 className="text-lg font-semibold text-gray-800">
          AI 분석이 완료되었어요!
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          프로그램을 마치고 결과를 확인하시겠어요?
        </p>
        <button
          onClick={onConfirm}
          className="mt-4 text-sm bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          결과 보러 가기
        </button>
  
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
  