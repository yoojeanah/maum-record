"use client";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { publicRequest } from "@/lib/axiosInstance";
import HamburgerMenu from "@/app/components/HamburgerMenu";
import ProfileIcon from "@/app/components/ProfileIcon";
import FooterLogo from "@/app/components/FooterLogo";
import { useUser } from "@/context/UserContext";

interface MeditationCourseData {
  id: number;
  video: string;
  preStartText: string;
  postStartText: string;
}

export default function MeditationDetailPage() {
  const { id } = useParams();
  const courseId = Array.isArray(id) ? parseInt(id[0]) : parseInt(id as string);
  const { nickname } = useUser();

  const [data, setData] = useState<MeditationCourseData | null>(null);
  const [started, setStarted] = useState(false);
  const [fade, setFade] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (isNaN(courseId)) return;
    publicRequest
      .get(`/user/healing/{id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error("명상 데이터 불러오기 실패:", err));
  }, [courseId]);

  const handleStart = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 1;
      videoRef.current.play().catch(() => {});
    }

    setFade(false);
    setTimeout(() => {
      setStarted(true);
      setFade(true);
    }, 300);
  };

  if (!data) return <div className="text-white text-center mt-20">로딩 중...</div>;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-500 ${
          started ? "opacity-100" : "opacity-0"
        }`}
        src={data.video}
        loop
        playsInline
      />

      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          started ? "opacity-0" : "opacity-100"
        } bg-gradient-to-br from-pink-100 via-purple-200 to-blue-200 z-0`}
      />

      <HamburgerMenu />
      <ProfileIcon />

      <div
        className={`absolute top-1/3 w-full text-center z-20 h-[90px] flex flex-col items-center justify-center transition-opacity duration-500 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        {!started ? (
          <h1
            className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-semibold leading-relaxed cursor-pointer"
            onClick={handleStart}
          >
            {data.preStartText}
          </h1>
        ) : (
          <h1 className="text-xl sm:text-2xl md:text-3xl text-white font-semibold leading-relaxed whitespace-pre-line">
            {data.postStartText.replace("{{nickname}}", nickname)}
          </h1>
        )}
      </div>

      <FooterLogo />
    </div>
  );
}
