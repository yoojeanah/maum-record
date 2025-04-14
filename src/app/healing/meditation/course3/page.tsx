"use client";
import { useRef, useState } from "react";
import { useUser } from "@/context/UserContext"; 
import HamburgerMenu from "@/app/components/HamburgerMenu";
import ProfileIcon from "@/app/components/ProfileIcon";
import FooterLogo from "@/app/components/FooterLogo";

export default function MeditationPage() {
  const { nickname } = useUser(); 
  const [started, setStarted] = useState(false);
  const [fade, setFade] = useState(true);
  const fireplaceRef = useRef<HTMLAudioElement | null>(null);

  const startMeditation = () => {
    setTimeout(() => {
      fireplaceRef.current?.play();
    }, 2000);
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
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-10 overflow-hidden">
      <video
        src="/video/fireplace.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

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
            <div className="pl-4">불꽃 소리에 귀를 기울여 보세요. 🔥</div>
          </div>
        )}
      </div>

      <FooterLogo />

      <audio
        ref={fireplaceRef}
        src="/audio/fireplace.mp3"
        loop
        preload="auto"
      />
    </div>
  );
}
