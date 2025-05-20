"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { publicRequest } from "@/lib/axiosInstance";
import HamburgerMenu from "@/app/components/HamburgerMenu";
import ProfileIcon from "@/app/components/ProfileIcon";
import FooterLogo from "@/app/components/FooterLogo";

// camelCase -> 공백 삽입 + 첫 글자 대문자
function formatTitle(title: string): string {
  return title.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (s) => s.toUpperCase());
}

export default function YogaPage() {
  const router = useRouter();
  const [courseTitles, setCourseTitles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await publicRequest.get<string[]>("/api/user/healing/yoga/courses");
        setCourseTitles(res.data);
      } catch (error) {
        console.error("요가 코스 목록 불러오기 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleNavigate = (title: string) => {
    const encodedTitle = encodeURIComponent(title);
    router.push(`/healing/yoga/course/${encodedTitle}`);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-100 via-purple-200 to-blue-200 flex flex-col items-center justify-center px-4 py-10 overflow-hidden">
      <HamburgerMenu />
      <ProfileIcon />

      <h1 className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-semibold text-center mt-6 mb-8 z-10">
        원하는 요가 코스를 선택해 보세요. 🧎
      </h1>

      {isLoading || courseTitles.length === 0 ? (
        <div className="flex justify-center items-center w-full max-w-5xl min-h-[160px] z-10">
          <p className="text-center text-gray-600 text-lg">
            {isLoading ? "로딩 중..." : "등록된 요가 코스가 없습니다."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl z-10">
          {courseTitles.map((title, index) => (
            <div
              key={index}
              onClick={() => handleNavigate(title)}
              className="rounded-xl shadow-md p-6 flex flex-col justify-center items-center min-h-[150px] bg-white hover:bg-purple-50 cursor-pointer transition"
            >
              <h2 className="text-lg font-semibold text-gray-800">{formatTitle(title)}</h2>
            </div>
          ))}
        </div>
      )}

      <FooterLogo />
    </div>
  );
}
