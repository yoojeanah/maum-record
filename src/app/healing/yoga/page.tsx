"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { publicRequest } from "@/lib/axiosInstance";
import HamburgerMenu from "@/app/components/HamburgerMenu";
import ProfileIcon from "@/app/components/ProfileIcon";
import FooterLogo from "@/app/components/FooterLogo";

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
  const router = useRouter();

  const defaultCourses: YogaCourse[] = [
    { id: 1, title: "코스 1", summary: "업데이트 예정입니다.", locked: true, poses: [] },
    { id: 2, title: "코스 2", summary: "업데이트 예정입니다.", locked: true, poses: [] },
    { id: 3, title: "코스 3", summary: "업데이트 예정입니다.", locked: true, poses: [] },
    { id: 4, title: "코스 4", summary: "업데이트 예정입니다.", locked: true, poses: [] },
    { id: 5, title: "코스 5", summary: "업데이트 예정입니다.", locked: true, poses: [] },
    { id: 6, title: "코스 6", summary: "업데이트 예정입니다.", locked: true, poses: [] },
    { id: 7, title: "코스 7", summary: "업데이트 예정입니다.", locked: true, poses: [] },
    { id: 8, title: "코스 8", summary: "업데이트 예정입니다.", locked: true, poses: [] },
    { id: 9, title: "코스 9", summary: "업데이트 예정입니다.", locked: true, poses: [] },
  ];

  const [courses, setCourses] = useState<YogaCourse[]>(defaultCourses);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await publicRequest.get<{ courses: YogaCourse[] }>("/yoga-courses");

        const updated = defaultCourses.map((defaultCourse) => {
          const serverCourse = res.data.courses.find((c) => c.id === defaultCourse.id);
          return serverCourse ? { ...defaultCourse, ...serverCourse } : defaultCourse;
        });

        setCourses(updated);
      } catch (error) {
        console.error("코스 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleNavigate = (courseId: number) => {
    router.push(`/healing/yoga/course${courseId}`);
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
            className={`rounded-xl shadow-md p-6 flex flex-col justify-center items-center min-h-[150px] transition ${
              course.locked
                ? "bg-white opacity-60 cursor-default"
                : "bg-white hover:bg-purple-50 cursor-pointer"
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
