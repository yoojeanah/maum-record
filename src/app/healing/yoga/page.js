"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HamburgerMenu from "@/app/components/HamburgerMenu";
import ProfileIcon from "@/app/components/ProfileIcon";
import FooterLogo from "@/app/components/FooterLogo";

export default function YogaPage() {
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleConfirm = () => {
    router.push("/result");
  };

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
