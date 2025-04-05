"use client";
import { useEffect, useState } from "react";

export default function Notice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem("hideNotice");
    if (!hasSeen) {
      setVisible(true);
    }
  }, []);

  const handleClose = () => {
    setVisible(false);
  };

  const handleDontShowAgain = () => {
    localStorage.setItem("hideNotice", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-[9999] flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl text-center space-y-4">
        <h2 className="text-xl font-bold text-blue-600">🎉 마음레코드 런칭!</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          지금부터 당신의 하루를 감정으로 기록하고,  
          나만의 감정 나무를 키워 보세요.  
          언제 어디서든, 당신의 마음과 함께할게요.
        </p>

        <div className="flex justify-center gap-4 pt-2 text-sm">
          <button
            onClick={handleClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition"
          >
            확인
          </button>

          <button
            onClick={handleDontShowAgain}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-100 transition"
          >
            다시 보지 않기
          </button>
        </div>
      </div>
    </div>
  );
}
