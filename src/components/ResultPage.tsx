"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FaFastForward } from "react-icons/fa";
import { useUser } from "@/context/UserContext";
import HamburgerMenu from "@/app/components/HamburgerMenu";
import ProfileIcon from "@/app/components/ProfileIcon";
import FooterLogo from "@/app/components/FooterLogo";

type ResultPageProps = {
  longSummary: string;
  emotion: string;
  positive: number;
  negative: number;
};

// 요약 문장을 단락 단위로 포맷팅
function formatSummaryToParagraphs(summary: string, sentencesPerParagraph = 2) {
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

export default function ResultPage({ longSummary, emotion, positive, negative }: ResultPageProps) {
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

  // 타자 애니메이션 효과
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

  // 페이드 아웃 후 전체 결과 표시
  useEffect(() => {
    if (fadeOut) {
      setTimeout(() => {
        setShowFullResult(true);
      }, 1000);
    }
  }, [fadeOut]);

  // 타자 효과 스킵
  const skipTyping = () => {
    setTypingSkipped(true);
    setFadeOut(true);
  };

  // 감정 이모지 매핑
  const emotionEmojiMap: Record<string, string> = {
    공포: "😱",
    놀람: "😲",
    분노: "😠",
    슬픔: "😢",
    중립: "😐",
    행복: "😊",
    혐오: "🤢",
  };

  const emotionWithEmoji = `${emotionEmojiMap[emotion] || ""} ${emotion}`;

  // 감정별 응원 메시지
  let emotionMessage = "";
  if (emotion === "공포") {
    emotionMessage = "괜찮아요, 당신은 혼자가 아니에요. 천천히 숨을 고르며 이겨낼 수 있어요.";
  } else if (emotion === "놀람") {
    emotionMessage = "놀라셨죠? 하지만 당신은 언제나 빠르게 적응하는 멋진 사람이에요!";
  } else if (emotion === "분노") {
    emotionMessage = "마음이 많이 답답했겠어요. 감정을 잘 표현한 당신, 정말 멋져요.";
  } else if (emotion === "슬픔") {
    emotionMessage = "슬픔이 밀려올 땐 잠시 쉬어가도 괜찮아요. 오늘도 애썼어요.";
  } else if (emotion === "중립") {
    emotionMessage = "평온한 하루였네요. 그런 날도 참 소중해요. 오늘도 수고했어요!";
  } else if (emotion === "행복") {
    emotionMessage = "오늘도 빛나는 하루를 보냈군요! 당신의 긍정이 멋져요.";
  } else if (emotion === "혐오") {
    emotionMessage = "불쾌한 순간이 있었군요. 마음을 지킨 당신, 정말 대단해요.";
  } else {
    emotionMessage = "오늘 하루도 고생 많으셨어요.";
  }

  return (
    <div className="relative min-h-screen">
      {showFullResult && <HamburgerMenu />}
      {showFullResult && <ProfileIcon />}

      {/* 타자 효과 화면 */}
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

      {/* 전체 결과 화면 */}
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
            {emotionMessage}
          </p>

          <div className="flex justify-around text-sm text-gray-700 mb-2">
            <div>
              감정: <span className="font-semibold">{emotionWithEmoji}</span>
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
