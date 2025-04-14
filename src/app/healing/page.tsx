"use client";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import HamburgerMenu from "@/app/components/HamburgerMenu";
import ProfileIcon from "@/app/components/ProfileIcon";
import FooterLogo from "@/app/components/FooterLogo";

export default function HealingPage() {
  const router = useRouter();
  const { nickname } = useUser(); // 전역 닉네임 가져오기

  const handleSelect = (type: string) => {
    console.log(`✅ 선택된 힐링 프로그램: ${type}`);
    router.push(`/healing/${type}`);
  };

  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-10">
      <HamburgerMenu />
      <ProfileIcon />

      <h1 className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-semibold text-center mb-8 mt-6">
        {nickname} 님, <br />
        오늘도 힐링의 시간을 가져 볼까요?
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
        <div
          onClick={() => handleSelect("meditation")}
          className="bg-white hover:bg-blue-50 cursor-pointer shadow-md rounded-xl p-6 flex flex-col items-center transition"
        >
          <span className="text-4xl mb-2">🧘‍♀️</span>
          <h2 className="text-lg font-semibold text-gray-700">명상</h2>
        </div>
        <div
          onClick={() => handleSelect("yoga")}
          className="bg-white hover:bg-blue-50 cursor-pointer shadow-md rounded-xl p-6 flex flex-col items-center transition"
        >
          <span className="text-4xl mb-2">🧎</span>
          <h2 className="text-lg font-semibold text-gray-700">요가 스트레칭</h2>
        </div>
        <div
          onClick={() => handleSelect("music")}
          className="bg-white hover:bg-blue-50 cursor-pointer shadow-md rounded-xl p-6 flex flex-col items-center transition"
        >
          <span className="text-4xl mb-2">🎧</span>
          <h2 className="text-lg font-semibold text-gray-700">힐링 음악 감상</h2>
        </div>
      </div>

      <div className="mt-10 text-sm text-gray-500">
        🧠 AI 분석이 진행되고 있습니다...
      </div>

      <FooterLogo />
    </div>
  );
}
