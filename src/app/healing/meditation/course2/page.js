"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import HamburgerMenu from "@/app/components/HamburgerMenu";
import ProfileIcon from "@/app/components/ProfileIcon";
import FooterLogo from "@/app/components/FooterLogo";
import FeedbackModal from "@/app/components/FeedbackModal";
import AnalysisToast from "@/app/components/AnalysisToast";

export default function MeditationPage() {
  const [nickname, setNickname] = useState("마음이");
  const [started, setStarted] = useState(false);
  const [fade, setFade] = useState(true);
// TODO: 알림 상태는 전역 관리로 전환 예정 (Zustand/Redux 등 도입 시)
// const [showToast, setShowToast] = useState(false);
// const [showFeedback, setShowFeedback] = useState(false);
  const audioRef1 = useRef(null);
  const audioRef2 = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (!started) {
      const toastTimer = setTimeout(() => {
        // setShowToast(true);
      }, 10000);
      return () => clearTimeout(toastTimer);
    }
  }, [started]);

  const startMeditation = () => {
    setTimeout(() => {
      audioRef1.current?.play();
    }, 3000);
    audioRef1.current?.addEventListener("ended", () => {
      setTimeout(() => {
        audioRef2.current?.play();
      }, 1500);
    });
  };

  const handleStart = () => {
    setFade(false);
    setTimeout(() => {
      setStarted(true);
      setFade(true);
      startMeditation();
    }, 300);
  };

  // const handleConfirm = () => {
  //   setShowFeedback(true);
  // };

  // const handleFeedback = (feedback) => {
  //   router.push("/result");
  // };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/book-bg.jpg')" }}
    >
      <HamburgerMenu />
      <ProfileIcon />

      <div
        className={`absolute top-1/3 text-center z-20 h-[90px] flex flex-col items-center justify-center transition-opacity duration-500 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        {!started ? (
          <h1
            className="text-xl sm:text-2xl md:text-3xl text-neutral-100 font-semibold leading-relaxed cursor-pointer"
            onClick={handleStart}
          >
            명상을 시작하시려면 이곳을 클릭하세요.
          </h1>
        ) : (
          <div className="text-xl sm:text-2xl md:text-3xl text-neutral-100 font-semibold leading-relaxed">
            <div>{nickname} 님,</div>
            <div className="pl-4">조용한 이야기 속으로 걸어 들어가 볼까요? 📖</div>
          </div>
        )}
      </div>

      <div className="absolute top-2/3 text-xs text-center text-gray-300 z-20">
        이 콘텐츠는 VOLI의 AI보이스를 활용하여 제작되었습니다. <br />
        https://voli.ai
      </div>

      <FooterLogo />

      <audio ref={audioRef1} src="/audio/essay-meditation-part1.wav" />
      <audio ref={audioRef2} src="/audio/essay-meditation-part2.wav" />

      {/* TODO: 전역 알림 시스템 구축 후 알림 및 피드백 팝업 다시 연결할 것
      <AnalysisToast onConfirm={handleConfirm} />
      <FeedbackModal show={showFeedback} onSelect={handleFeedback} nickname={nickname} /> */}

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
