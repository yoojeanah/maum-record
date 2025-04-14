"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FaFastForward } from "react-icons/fa";
import { useUser } from "@/context/UserContext";
import HamburgerMenu from "@/app/components/HamburgerMenu";
import ProfileIcon from "@/app/components/ProfileIcon";
import FooterLogo from "@/app/components/FooterLogo";

function formatSummaryToParagraphs(summary, sentencesPerParagraph = 2) {
  const sentences = summary.split(/(?<=[.!?])\s+/);
  let formatted = "";

  for (let i = 0; i < sentences.length; i++) {
    formatted += sentences[i];
    if ((i + 1) % sentencesPerParagraph === 0) {
      formatted += "\n\n";
    } else {
      formatted += " ";
    }
  }

  return formatted.trim();
}

export default function ResultPage({
  longSummary,
  shortSummary,
  emotion,
  positive,
  negative,
}) {
  const { nickname } = useUser();
  const router = useRouter();

  const [charIndex, setCharIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [typingSkipped, setTypingSkipped] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [showFullResult, setShowFullResult] = useState(false);

  const formattedSummary = useMemo(() => {
    const totalSentences = longSummary.split(/(?<=[.!?])\s+/).length;
    const sentencesPerParagraph = Math.ceil(totalSentences / 2);
    return formatSummaryToParagraphs(longSummary, sentencesPerParagraph);
  }, [longSummary]);

  useEffect(() => {
    if (typingSkipped) return;

    const interval = setInterval(() => {
      if (charIndex < formattedSummary.length) {
        setDisplayedText((prev) => prev + formattedSummary[charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        clearInterval(interval);
        setTimeout(() => setFadeOut(true), 500);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [charIndex, typingSkipped, formattedSummary]);

  useEffect(() => {
    if (fadeOut) {
      setTimeout(() => {
        setShowFullResult(true);
      }, 1000);
    }
  }, [fadeOut]);

  const skipTyping = () => {
    setTypingSkipped(true);
    setFadeOut(true);
  };

  return (
    <div className="relative min-h-screen">
      {showFullResult && <HamburgerMenu />}
      {showFullResult && <ProfileIcon />}

      {!showFullResult && (
        <div
          className={`absolute inset-0 flex items-center justify-center px-6 bg-black z-50 transition-opacity duration-1000 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <p
            className="text-white text-lg sm:text-xl md:text-2xl max-w-3xl whitespace-pre-wrap"
            style={{ lineHeight: "2.0" }}
          >
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
          fadeOut ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl text-center">
          <h2 className="text-xl font-bold text-blue-600 mb-3">
            {nickname} 님의 하루 요약
          </h2>
          <p className="text-gray-700 text-base leading-relaxed mb-4 whitespace-pre-wrap">
            {shortSummary}
          </p>

          <div className="flex justify-around text-sm text-gray-700 mb-2">
            <div>
              감정: <span className="font-semibold">{emotion}</span>
            </div>
            <div>
              긍정 지수: <span className="font-semibold">{positive}%</span>
            </div>
            <div>
              부정 지수: <span className="font-semibold">{negative}%</span>
            </div>
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
