"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HamburgerMenu from "@/app/components/HamburgerMenu";
import ProfileIcon from "@/app/components/ProfileIcon";
import FooterLogo from "@/app/components/FooterLogo";
import FeedbackModal from "@/app/components/FeedbackModal";
import AnalysisToast from "@/app/components/AnalysisToast";

export default function YogaPage() {
// TODO: 알림 상태는 전역 관리로 전환 예정 (Zustand/Redux 등 도입 시)
// const [showToast, setShowToast] = useState(false);
// const [showFeedback, setShowFeedback] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const toastTimer = setTimeout(() => {
      // setShowToast(true);
    }, 10000);
    return () => clearTimeout(toastTimer);
  }, []);

  // const handleConfirm = () => {
  //   setShowFeedback(true);
  // };

  // const handleFeedback = (feedback) => {
  //   router.push("/result");
  // };

  const handleNavigate = (course: number) => {
    router.push(`/healing/yoga/course${course}`);
  };

  const courses = [
    { id: 1, title: "코스 1", desc: "하루를 여는 기초 요가 스트레칭" },
    { id: 2, title: "코스 2", desc: "전신 근육을 풀어주는 중급 요가" },
    { id: 3, title: "코스 3", desc: "하루를 마무리하는 릴랙스 요가" },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-100 via-purple-200 to-blue-200 flex flex-col items-center px-4 py-10 overflow-hidden">
      <HamburgerMenu />
      <ProfileIcon />

      <h1 className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-semibold text-center mt-[28px] mb-8 z-10">
        원하는 요가 코스를 선택해 보세요. 🧎
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl z-10">
        {courses.map((course) => (
          <div
            key={course.id}
            onClick={() => handleNavigate(course.id)}
            className="cursor-pointer bg-white rounded-xl shadow-md p-6 hover:bg-purple-50 transition flex flex-col justify-center items-center min-h-[150px]"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {course.title}
            </h2>
            <p className="text-sm text-gray-600 text-center">{course.desc}</p>
          </div>
        ))}

        {[4, 5, 6, 7, 8, 9].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-inner p-6 flex flex-col justify-center items-center text-gray-400 text-sm min-h-[150px]"
          >
            <h2 className="text-lg font-semibold mb-2">코스 {i}</h2>
            <p>업데이트 예정입니다.</p>
          </div>
        ))}
      </div>

      <FooterLogo />

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
