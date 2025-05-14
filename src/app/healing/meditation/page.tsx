"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { publicRequest } from "@/lib/axiosInstance";
import HamburgerMenu from "@/app/components/HamburgerMenu";
import ProfileIcon from "@/app/components/ProfileIcon";
import FooterLogo from "@/app/components/FooterLogo";

interface MeditationCourse {
  id: number;
  title: string;
  summary: string;
  locked: boolean;
}

export default function MeditationListPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<MeditationCourse[]>([
    { id: 1, title: "코스 1", summary: "업데이트 예정입니다.", locked: true },
    { id: 2, title: "코스 2", summary: "업데이트 예정입니다.", locked: true },
    { id: 3, title: "코스 3", summary: "업데이트 예정입니다.", locked: true },
  ]);

  useEffect(() => {
    publicRequest.get<MeditationCourse[]>("/meditation-courses")
      .then((res) => {
        const updated = courses.map((defaultCourse) => {
          const fromServer = res.data.find((c) => c.id === defaultCourse.id);
          return fromServer
            ? {
                ...defaultCourse,
                locked: fromServer.locked,
                title: fromServer.locked ? defaultCourse.title : fromServer.title,
                summary: fromServer.locked ? defaultCourse.summary : fromServer.summary,
              }
            : defaultCourse;
        });
        setCourses(updated);
      })
      .catch((err) => {
        console.error("명상 코스 불러오기 실패:", err);
      });
  }, []);

  const handleNavigate = (id: number) => {
    router.push(`/healing/meditation/course${id}`);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-100 via-purple-200 to-blue-200 px-4 py-10 flex flex-col items-center justify-center overflow-hidden">
      <HamburgerMenu />
      <ProfileIcon />
      <h1 className="text-2xl text-center mb-8">원하는 명상 코스를 선택해 보세요. 🧘‍♀️</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl z-10">
        {courses.map((course) => (
          <div
            key={course.id}
            onClick={() => !course.locked && handleNavigate(course.id)}
            className={`rounded-xl shadow-md p-6 flex flex-col justify-center items-center min-h-[150px] transition ${
              course.locked ? "opacity-60 cursor-default" : "hover:bg-purple-50 cursor-pointer"
            }`}
            style={course.locked ? { pointerEvents: "none" } : {}}
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{course.title}</h2>
            <p className="text-sm text-gray-600 text-center">{course.summary}</p>
          </div>
        ))}
      </div>
      <FooterLogo />
    </div>
  );
}
