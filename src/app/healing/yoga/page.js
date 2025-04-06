"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HamburgerMenu from "@/app/components/HamburgerMenu";
import ProfileIcon from "@/app/components/ProfileIcon";
import FooterLogo from "@/app/components/FooterLogo";
import FeedbackModal from "@/app/components/FeedbackModal";
import AnalysisToast from "@/app/components/AnalysisToast";

export default function YogaPage() {
// TODO: 알림 상태는 전역 관리로 전환 예정 (Zustand/Redux 등 도입 시)
// const [showToast, setShowToast] = useState(false);
// const [showFeedback, setShowFeedback] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const toastTimer = setTimeout(() => {
      // setShowToast(true);
    }, 10000);
    return () => clearTimeout(toastTimer);
  }, []);

  // const handleConfirm = () => {
  //   setShowFeedback(true);
  // };

  // const handleFeedback = (feedback) => {
  //   console.log("요가 피드백:", feedback);
  //   router.push("/result");
  // };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-100 via-purple-200 to-blue-200 flex flex-col items-center justify-start px-4 py-10 overflow-hidden">
      <HamburgerMenu />
      <ProfileIcon />

      <h1 className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-semibold text-center mt-[28px] mb-4 z-10">
        오늘의 요가 스트레칭 🧎
      </h1>

      <div className="w-full max-w-4xl aspect-[16/9] rounded-xl overflow-hidden shadow-xl z-10 mb-10">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/videoseries?list=PLui6Eyny-Uzze8RCqEOYDUwG9MtpI5tBP"
          title="요가 스트레칭 영상"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <FooterLogo />
      
      {/* TODO: 전역 알림 시스템 구축 후 알림 및 피드백 팝업 다시 연결할 것
      <AnalysisToast onConfirm={handleConfirm} />
      <FeedbackModal show={showFeedback} onSelect={handleFeedback} /> */}

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
