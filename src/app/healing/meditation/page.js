"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import HamburgerMenu from "@/app/components/HamburgerMenu";
import ProfileIcon from "@/app/components/ProfileIcon";
import FooterLogo from "@/app/components/FooterLogo";

export default function MeditationPage() {
  const [nickname] = useState("마음이");
  const [started, setStarted] = useState(false);
  const [fade, setFade] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");
  const audioRef = useRef(null);
  const bellAudioRef = useRef(null);
  const bellIntervalRef = useRef(null);
  const router = useRouter();

  const videoSources = [
    "/video/1.mp4",
    "/video/2.mp4",
    "/video/3.mp4",
    "/video/4.mp4",
  ];

  useEffect(() => {
    const changeVideo = () => {
      const next = videoSources[Math.floor(Math.random() * videoSources.length)];
      setVideoSrc(next);
    };

    changeVideo();
    const interval = setInterval(changeVideo, 120000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // 사용자가 클릭하지 않아도 10초 후 토스트 자동 표시
    if (!started) {
      const idleToastTimer = setTimeout(() => {
        setShowToast(true);
      }, 10000);
      return () => clearTimeout(idleToastTimer);
    }
  }, [started]);

  const startMeditation = () => {
    setTimeout(() => {
      bellAudioRef.current?.play(); // 종소리: 1초 뒤
    }, 1000);

    setTimeout(() => {
      audioRef.current?.play(); // TTS: 4초 뒤
    }, 4000);

    setTimeout(() => {
      setShowToast(true);
    }, 10000);

    bellIntervalRef.current = setInterval(() => {
      bellAudioRef.current?.play();
    }, 30000);
  };

  const handleStart = () => {
    setFade(false);
    setTimeout(() => {
      setStarted(true);
      setFade(true);
      startMeditation();
    }, 300);
  };

  const handleConfirm = () => {
    router.push("/result");
  };

  return (
    <div className="relative min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4 py-10">
      {videoSrc && (
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      )}

      <HamburgerMenu />
      <ProfileIcon />

      {/* 🧘 안내 문구 */}
      <div
        className={`absolute top-1/3 text-center z-20 h-[90px] flex flex-col items-center justify-center transition-opacity duration-500 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        {!started ? (
          <h1
            className="text-xl sm:text-2xl md:text-3xl text-white font-semibold leading-relaxed cursor-pointer"
            onClick={handleStart}
          >
            명상을 시작하시려면 이곳을 클릭하세요.
          </h1>
        ) : (
          <div className="text-xl sm:text-2xl md:text-3xl text-white font-semibold leading-relaxed">
            <div>{nickname} 님,</div>
            <div className="pl-4">마음을 편안하게 가라앉히세요. 🧘‍♀️</div>
          </div>
        )}
      </div>

      {/* 🎵 출처 */}
      <div className="absolute top-2/3 text-xs text-center text-gray-500 z-20">
        이 콘텐츠는 VOLI의 AI보이스를 활용하여 제작되었습니다. <br />
        https://voli.ai
      </div>

      <FooterLogo />

      {/* 🔊 오디오 */}
      <audio ref={bellAudioRef} src="/music/bell.mp3" />
      <audio ref={audioRef} src="/audio/VOLI_TTS_설아.wav" />

      {/* ✅ 토스트 알림 */}
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

      {/* ✨ 애니메이션 정의 */}
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
