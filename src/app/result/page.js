"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaFastForward } from "react-icons/fa";
import HamburgerMenu from "@/app/components/HamburgerMenu";
import ProfileIcon from "@/app/components/ProfileIcon";
import FooterLogo from "@/app/components/FooterLogo";

export default function ResultPage({
  longSummary = `오늘은 아침 일찍 일어나 출근 준비를 했어요. 버스가 평소보다 붐벼서 약간 지치긴 했지만, 출근길에 들은 팟캐스트 덕분에 마음이 조금은 편안해졌습니다. 회사에서는 업무량이 많아서 정신없이 하루를 보냈고, 팀 회의 중에는 내가 준비했던 발표가 생각보다 반응이 좋지 않아서 살짝 속상했어요. 점심은 간단히 편의점에서 해결했는데, 급하게 먹어서 그런지 속이 불편했네요.

오후엔 메일과 업무 처리에 시달리다 보니 시간이 훌쩍 흘렀고, 퇴근 무렵에는 비까지 내려 우산 없이 젖은 채로 집에 도착했어요. 그래도 집에 돌아와서 따뜻한 물로 샤워를 하고, 조용한 음악을 틀어놓고 일기를 쓰며 하루를 마무리하니 마음이 조금은 가라앉는 느낌입니다. 오늘은 전반적으로 힘든 하루였지만, 내일은 좀 더 나은 하루가 되길 바라는 마음이에요.`,
  shortSummary = "오늘은 지치고 속상한 일이 많았던 하루였어요. 스스로를 잘 돌보는 시간이 필요해 보여요.",
  emotion = "😔 우울",
  positive = 34,
  negative = 66,
}) {
  const router = useRouter();
  const [nickname] = useState("마음이");
  const [charIndex, setCharIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [showFullResult, setShowFullResult] = useState(false);
  const [typingSkipped, setTypingSkipped] = useState(false);

  useEffect(() => {
    if (typingSkipped) return;

    const interval = setInterval(() => {
      if (charIndex < longSummary.length) {
        setDisplayedText((prev) => prev + longSummary[charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        clearInterval(interval);
        setTimeout(() => setShowFullResult(true), 1000);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [charIndex, typingSkipped, longSummary]);

  const skipTyping = () => {
    setTypingSkipped(true);
    setDisplayedText(longSummary);
    setShowFullResult(true);
  };

  return (
    <div className="relative min-h-screen">
      {showFullResult && <HamburgerMenu />}
      {showFullResult && <ProfileIcon />}

      {/* 검정 배경 */}
      {!showFullResult && (
        <div className="absolute inset-0 flex items-center justify-center px-6 bg-black z-50 transition-opacity duration-700">
          <p className="text-white text-lg sm:text-xl md:text-2xl leading-loose max-w-3xl whitespace-pre-wrap">
            {displayedText}
          </p>

          <button
            onClick={skipTyping}
            aria-label="타이핑 스킵"
            className="fixed bottom-6 right-6 z-50 p-2"
          >
            <FaFastForward className="text-white text-2xl transition hover:scale-110" />
          </button>
        </div>
      )}

      <div
        className={`absolute inset-0 bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 flex flex-col items-center justify-center px-4 py-10 transition-opacity duration-1000 ${
          showFullResult ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl text-center">
          <h2 className="text-xl font-bold text-blue-600 mb-3">
            {nickname} 님의 하루 요약
          </h2>
          <p className="text-gray-700 text-base leading-relaxed mb-4">
            {shortSummary}
          </p>

          <div className="flex justify-around text-sm text-gray-700 mb-2">
            <div>감정: <span className="font-semibold">{emotion}</span></div>
            <div>긍정 지수: <span className="font-semibold">{positive}%</span></div>
            <div>부정 지수: <span className="font-semibold">{negative}%</span></div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => router.push("/calendar")}
              className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              캘린더로 이동
            </button>
          </div>
        </div>

        {showFullResult && <FooterLogo />}
      </div>
    </div>
  );
}
