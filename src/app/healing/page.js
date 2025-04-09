// 힐링 프로그램 선택 페이지('/healing')입니다 
// TODO: AI 분석 완료 여부를 백엔드에서 실시간으로 전달받는 방식(WebSocket 등)으로 변경 예정
// 현재는 10초 후 자동 노출되며, 전역 상태나 세션 유지 기능은 미구현 상태입니다 - meditation, yoga, music 파일에서는 주석 처리
// AnalysisToast는 별도 컴포넌트로 분리되었으며, 페이지 이동과 무관한 전역 알림으로 확장 가능
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HamburgerMenu from "@/app/components/HamburgerMenu";
import ProfileIcon from "@/app/components/ProfileIcon";
import FooterLogo from "@/app/components/FooterLogo";
import FeedbackModal from "@/app/components/FeedbackModal";
import AnalysisToast from "@/app/components/AnalysisToast";

export default function HealingPage() {
  const router = useRouter();
  const [nickname, setNickname] = useState("마음이");
  const [showToast, setShowToast] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const toastTimer = setTimeout(() => {
      setShowToast(true);
    }, 10000);
    return () => clearTimeout(toastTimer);
  }, []);

  const handleSelect = (type) => {
    console.log(`✅ 선택된 힐링 프로그램: ${type}`);
    router.push(`/healing/${type}`);
  };

  const handleConfirm = () => {
    setShowFeedback(true);
  };

  const handleFeedback = (feedback) => {
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

      {showToast && <AnalysisToast onConfirm={handleConfirm} />}
      <FeedbackModal show={showFeedback} onSelect={handleFeedback} nickname={nickname} />

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
