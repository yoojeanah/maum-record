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
  description: string;
}

export default function MeditationListPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<MeditationCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    publicRequest
      .get<MeditationCourse[]>("/user/healing/meditation")
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => {
        console.error("명상 코스 불러오기 실패:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleNavigate = (id: number) => {
    router.push(`/meditation/${id}`);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-100 via-purple-200 to-blue-200 px-4 py-10 flex flex-col items-center justify-center overflow-hidden">
      <HamburgerMenu />
      <ProfileIcon />

      <h1 className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-semibold text-center mb-8 mt-6 z-10">
        원하는 명상 코스를 선택해 보세요. 🧘‍♀️
      </h1>

      {isLoading || courses.length === 0 ? (
        <div className="flex justify-center items-center w-full max-w-5xl min-h-[160px] z-10">
          <p className="text-center text-gray-600 text-lg">
            {isLoading ? "로딩 중..." : "준비 중입니다."}
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-6 w-full max-w-5xl z-10">
          {courses.map((course) => (
            <div
              key={course.id}
              onClick={() => handleNavigate(course.id)}
              className="rounded-xl shadow-md p-6 flex flex-col justify-center items-center min-h-[150px] w-[250px] bg-white hover:bg-purple-50 cursor-pointer transition"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-2">{course.title}</h2>
              <p className="text-sm text-gray-600 text-center">{course.description}</p>
            </div>
          ))}
        </div>
      )}

      <FooterLogo />
    </div>
  );
}
