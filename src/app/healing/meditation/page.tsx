"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HamburgerMenu from "@/app/components/HamburgerMenu";
import ProfileIcon from "@/app/components/ProfileIcon";
import FooterLogo from "@/app/components/FooterLogo";
import FeedbackModal from "@/app/components/FeedbackModal";
import AnalysisToast from "@/app/components/AnalysisToast";

export default function MeditationPage() {
  const [nickname, setNickname] = useState("마음이");
// TODO: 알림 상태는 전역 관리로 전환 예정 (Zustand/Redux 등 도입 시)
// const [showToast, setShowToast] = useState(false);
// const [showFeedback, setShowFeedback] = useState(false);
  const router = useRouter();

  // const handleConfirm = () => {
  //   setShowFeedback(true);
  // };

  // const handleFeedback = (feedback) => {
  //   router.push("/result");
  // };

  const handleNavigate = (course: number) => {
    router.push(`/healing/meditation/course${course}`);
  };

  const courses = [
    { id: 1, title: "종소리 명상 🔔", desc: "고요한 울림에 마음을 천천히 실어보는 시간" },
    { id: 2, title: "에세이 명상 📖", desc: "문장들 속에서 사유를 깊이 새겨보는 시간" },
    { id: 3, title: "모닥불 소리 명상 🔥", desc: "타닥대는 불소리에 기대어 마음을 내려놓는 시간" },
  ];  

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-100 via-purple-200 to-blue-200 flex flex-col items-center px-4 py-10 overflow-hidden">
      <HamburgerMenu />
      <ProfileIcon />

      <div className="flex flex-col items-center justify-center flex-grow w-full max-w-5xl z-10">
        <h1 className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-semibold text-center mb-8">
          원하는 명상 코스를 선택해 보세요. 🧘‍♀️
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
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
        </div>
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
