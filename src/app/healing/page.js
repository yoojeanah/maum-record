"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HamburgerMenu from "@/app/components/HamburgerMenu";
import ProfileIcon from "@/app/components/ProfileIcon";
import FooterLogo from "@/app/components/FooterLogo";

export default function HealingPage() {
  const router = useRouter();
  const [nickname] = useState("마음이");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleSelect = (type) => {
    console.log(`✅ 선택된 힐링 프로그램: ${type}`);
    router.push(`/healing/${type}`);
  };

  const handleConfirm = () => {
    router.push("/result");
  };

  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-10">
      <HamburgerMenu />
      <ProfileIcon />

      <h1 className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-semibold text-center mb-8 mt-6">
        {nickname} 님, <br />
        오늘도 힐링의 시간을 가져 볼까요?
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
        <div
          onClick={() => handleSelect("meditation")}
          className="bg-white hover:bg-blue-50 cursor-pointer shadow-md rounded-xl p-6 flex flex-col items-center transition"
        >
          <span className="text-4xl mb-2">🧘‍♀️</span>
          <h2 className="text-lg font-semibold text-gray-700">명상</h2>
        </div>

        <div
          onClick={() => handleSelect("yoga")}
          className="bg-white hover:bg-blue-50 cursor-pointer shadow-md rounded-xl p-6 flex flex-col items-center transition"
        >
          <span className="text-4xl mb-2">🧎</span>
          <h2 className="text-lg font-semibold text-gray-700">요가 스트레칭</h2>
        </div>

        <div
          onClick={() => handleSelect("music")}
          className="bg-white hover:bg-blue-50 cursor-pointer shadow-md rounded-xl p-6 flex flex-col items-center transition"
        >
          <span className="text-4xl mb-2">🎧</span>
          <h2 className="text-lg font-semibold text-gray-700">힐링 음악 감상</h2>
        </div>
      </div>

      <div className="mt-10 text-sm text-gray-500">
        🧠 AI 분석이 진행되고 있습니다...
      </div>

      <FooterLogo />

      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-white border border-gray-200 rounded-xl shadow-md px-7 py-6 w-96 animate-toast">
          <h2 className="text-lg font-semibold text-gray-800">
            AI 분석이 완료되었어요!
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            프로그램을 마치고 결과를 확인하시겠어요?
          </p>
          <button
            onClick={handleConfirm}
            className="mt-4 text-sm bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            결과 보러 가기
          </button>
        </div>
      )}

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
