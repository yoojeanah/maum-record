"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import HamburgerMenu from "@/app/components/HamburgerMenu";
import ProfileIcon from "@/app/components/ProfileIcon";
import FooterLogo from "@/app/components/FooterLogo";
import FeedbackModal from "@/app/components/FeedbackModal";
import AnalysisToast from "@/app/components/AnalysisToast";

// ✅ 타입 인터페이스 정의
interface Pose {
  id: string;
  name: string;
  duration: number;
  image: string;
  description: string;
}

interface YogaCourse {
  id: number;
  title: string;
  summary: string;
  locked: boolean;
  poses?: Pose[];
}

export default function YogaPage() {
  // TODO: 알림 상태는 전역 관리로 전환 예정 (Zustand/Redux 등 도입 시)
  // const [showToast, setShowToast] = useState(false);
  // const [showFeedback, setShowFeedback] = useState(false);
  const router = useRouter();

  const [courses, setCourses] = useState<YogaCourse[]>([ // 더미 기반 - 서버 응답 오면 setCourses()로 덮어씀
    {
      id: 1,
      title: "하루를 여는 기초 요가",
      summary: "부드러운 스트레칭으로 하루를 가볍게 시작하세요.",
      locked: true,
      poses: [],
    },
    {
      id: 2,
      title: "코스 2",
      summary: "업데이트 예정입니다.",
      locked: true,
      poses: [],
    },
    {
      id: 3,
      title: "코스 3",
      summary: "업데이트 예정입니다.",
      locked: true,
      poses: [],
    },
    {
      id: 4,
      title: "코스 4",
      summary: "업데이트 예정입니다.",
      locked: true,
      poses: [],
    },
    {
      id: 5,
      title: "코스 5",
      summary: "업데이트 예정입니다.",
      locked: true,
      poses: [],
    },
    {
      id: 6,
      title: "코스 6",
      summary: "업데이트 예정입니다.",
      locked: true,
      poses: [],
    },
    {
      id: 7,
      title: "코스 7",
      summary: "업데이트 예정입니다.",
      locked: true,
      poses: [],
    },
    {
      id: 8,
      title: "코스 8",
      summary: "업데이트 예정입니다.",
      locked: true,
      poses: [],
    },
    {
      id: 9,
      title: "코스 9",
      summary: "업데이트 예정입니다.",
      locked: true,
      poses: [],
    },
  ]);

  useEffect(() => {
    const toastTimer = setTimeout(() => {
      // setShowToast(true);
    }, 10000);
    return () => clearTimeout(toastTimer);
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get<{ courses: YogaCourse[] }>("/api/yoga-courses");
        setCourses(res.data.courses);
      } catch (error) {
        console.error("코스 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchCourses();
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
            onClick={() => {
              if (!course.locked) handleNavigate(course.id);
            }}
            className={`rounded-xl shadow-md p-6 flex flex-col justify-center items-center min-h-[150px] transition ${course.locked ? "bg-white opacity-60 cursor-default" : "bg-white hover:bg-purple-50 cursor-pointer"}`}
            style={course.locked ? { pointerEvents: "none" } : {}}
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {course.title}
            </h2>
            <p className="text-sm text-gray-600 text-center">
              {course.summary}
            </p>
          </div>
        ))}
      </div>

      <FooterLogo />

      {/* TODO: 전역 알림 시스템 구축 후 알림 및 피드백 팝업 다시 연결할 것
      <AnalysisToast onConfirm={handleConfirm} />
      <FeedbackModal show={showFeedback} onSelect={handleFeedback} nickname={"마음이"} /> */}

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
