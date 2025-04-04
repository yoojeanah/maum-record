"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

export default function MainPage() {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);

    const elements = document.querySelectorAll(".animate-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animation =
              entry.target.getAttribute("data-animate") || "fade-in-up";
            entry.target.classList.add(animation);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-blue-100 via-purple-100 to-white flex flex-col items-center text-gray-800 font-sans font-semibold"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <section
        className="w-full py-24 flex flex-col items-center text-center px-4 animate-on-scroll"
        data-animate="fade-in-up"
      >
        <h1 className="text-5xl font-bold text-blue-600 mb-4 tracking-tight">
          MaumRecord
        </h1>
        <p className="text-lg max-w-2xl text-gray-700 leading-relaxed">
          목소리로 기록하는 하루, AI가 분석해 주는 감정의 여정.
        </p>
      </section>

      <section className="w-full py-24 flex flex-col items-center gap-24 px-4">
        <div className="animate-on-scroll" data-animate="fade-in-left">
          <Feature
            emoji="🎤"
            title="녹음하기"
            text="하루 일기를 10분 이내로 녹음해 보세요. 목소리로 마음을 기록할 수 있어요."
            image="/images/record-example.png"
          />
        </div>

        <div className="animate-on-scroll" data-animate="fade-in-right">
          <Feature
            emoji="🧘"
            title="힐링 프로그램 하기"
            text="오늘의 감정을 가다듬기 위해 명상, 요가, 음악 감상 중 하나를 선택해 보세요."
            image="/images/healing-example.png"
          />
        </div>

        <div className="animate-on-scroll" data-animate="fade-in-up">
          <Feature
            emoji="🤖"
            title="AI 분석 받기"
            text="AI가 당신의 감정을 요약하고 분석해 드려요. 감정에 어울리는 색도 추천해 줘요."
            image="/images/result-example.png"
          />
        </div>

        <div className="animate-on-scroll" data-animate="fade-in-zoom">
          <Feature
            emoji="🌸"
            title="기록 남기기"
            text="감정 색을 캘린더에 남기고, 마음꽃밭에 꽃 두 송이를 피워 보세요."
            image="/images/calendar-example.png"
          />
        </div>
      </section>

      <section
        className="relative w-full pt-32 pb-56 flex flex-col items-center animate-on-scroll"
        data-animate="fade-in-up"
      >
        <div className="relative z-10 flex flex-col items-center gap-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            지금 바로, 당신의 이야기를 기록해 보세요.
          </h2>
          <div className="flex gap-6 mb-16">
            <button
              onClick={() => router.push("/signup")}
              className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-300 transition duration-300 font-bold"
            >
              회원가입
            </button>
            <button
              onClick={() => router.push("/login")}
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-gray-300 transition duration-300 font-bold"
            >
              로그인
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(40px);
        }

        .fade-in-up {
          opacity: 1 !important;
          transform: translateY(0px) !important;
          transition: all 0.7s ease-out;
        }

        .fade-in-left {
          opacity: 1 !important;
          transform: translateX(0px) !important;
          transition: all 0.7s ease-out;
        }

        .fade-in-right {
          opacity: 1 !important;
          transform: translateX(0px) !important;
          transition: all 0.7s ease-out;
        }

        .fade-in-zoom {
          opacity: 1 !important;
          transform: scale(1) !important;
          transition: all 0.7s ease-out;
        }

        [data-animate="fade-in-left"] {
          transform: translateX(-50px);
        }

        [data-animate="fade-in-right"] {
          transform: translateX(50px);
        }

        [data-animate="fade-in-zoom"] {
          transform: scale(0.8);
        }
      `}</style>
    </div>
  );
}

function Feature({
  emoji,
  title,
  text,
  image,
}: {
  emoji: string;
  title: string;
  text: string;
  image: string;
}) {
  return (
    <div className="flex flex-col items-center text-center gap-6 max-w-2xl">
      <span className="text-4xl">{emoji}</span>
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-lg text-gray-700">{text}</p>
      <Image
        src={image}
        alt={title}
        width={800}
        height={450}
        style={{ imageRendering: "crisp-edges" }}
        className="rounded-2xl border border-gray-200 shadow-xl w-full max-w-2xl object-contain transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
}
