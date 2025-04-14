"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useUser } from "@/context/UserContext";
import HamburgerMenu from "@/app/components/HamburgerMenu";
import ProfileIcon from "@/app/components/ProfileIcon";
import FooterLogo from "@/app/components/FooterLogo";

export default function MeditationPage() {
  const { nickname } = useUser();
  const [started, setStarted] = useState(false);
  const [fade, setFade] = useState(true);
  const [videoSrc, setVideoSrc] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);
  const bellAudioRef = useRef<HTMLAudioElement>(null);
  const bellIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const videoSources = useMemo(
    () => ["/video/1.mp4", "/video/2.mp4", "/video/3.mp4", "/video/4.mp4"],
    []
  );

  useEffect(() => {
    const changeVideo = () => {
      const next = videoSources[Math.floor(Math.random() * videoSources.length)];
      setVideoSrc(next);
    };
    changeVideo();
    const interval = setInterval(changeVideo, 120000);
    return () => clearInterval(interval);
  }, [videoSources]);

  const startMeditation = () => {
    setTimeout(() => bellAudioRef.current?.play(), 1000);
    setTimeout(() => audioRef.current?.play(), 4000);
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
            <div className="pl-4">마음을 편안하게 가라앉히세요. 🔔</div>
          </div>
        )}
      </div>

      <div className="absolute top-2/3 text-xs text-center text-gray-500 z-20">
        이 콘텐츠는 VOLI의 AI보이스를 활용하여 제작되었습니다. <br />
        https://voli.ai
      </div>

      <FooterLogo />

      <audio ref={bellAudioRef} src="/music/bell.mp3" />
      <audio ref={audioRef} src="/audio/VOLI_TTS_설아.wav" />
    </div>
  );
}
