"use client";
import { useRef, useState } from "react";
import { useUser } from "@/context/UserContext";
import HamburgerMenu from "@/app/components/HamburgerMenu";
import ProfileIcon from "@/app/components/ProfileIcon";
import FooterLogo from "@/app/components/FooterLogo";
import { useToast } from "@/context/ToastContext";

export default function MeditationPage() {
  const { nickname } = useUser();
  const [started, setStarted] = useState(false);
  const [fade, setFade] = useState(true);
  const audioRef1 = useRef<HTMLAudioElement | null>(null);
  const audioRef2 = useRef<HTMLAudioElement | null>(null);

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

  // TODO: toast Mock 사용 지우기
  // const { setJobId } = useToast();
  // const onClickMock = () => {
  //   // jobId 를 하나 넣으면, ToastContext 가 SSE 대신
  //   // 바로 분석 완료 흐름을 띄우도록 임시로 처리할 수 있어요.
  //   setJobId("MOCK_JOB_ID");
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
            <div className="pl-4">
              조용한 이야기 속으로 걸어 들어가 볼까요? 📖
            </div>
          </div>
        )}
      </div>

      {/* TODO: Toast Mock 사용 지우기 */}

      {/* <button
        onClick={onClickMock}
        className="px-4 py-2 bg-indigo-600 text-white rounded shadow"
      >
        토스트 테스트
      </button> */}

      <div className="absolute top-2/3 text-xs text-center text-gray-300 z-20">
        이 콘텐츠는 VOLI의 AI보이스를 활용하여 제작되었습니다. <br />
        https://voli.ai
      </div>

      <FooterLogo />

      <audio ref={audioRef1} src="/audio/essay-meditation-part1.wav" />
      <audio ref={audioRef2} src="/audio/essay-meditation-part2.wav" />
    </div>
  );
}
