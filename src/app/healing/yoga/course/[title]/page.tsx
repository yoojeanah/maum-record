"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { publicRequest } from "@/lib/axiosInstance";
import HamburgerMenu from "@/app/components/HamburgerMenu";
import ProfileIcon from "@/app/components/ProfileIcon";
import FooterLogo from "@/app/components/FooterLogo";
import Image from "next/image";

interface Pose {
  elementId: number;
  poseId: number;
  poseTitle: string;
  time: number;
  sequenceOrder: number;
  image: string;
  description: string;
}

function formatTitle(title: string): string {
  return title.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (s) => s.toUpperCase());
}

export default function CourseDetailPage() {
  const { title } = useParams();
  const courseTitle = Array.isArray(title) ? title[0] : title;
  const router = useRouter();

  const [poses, setPoses] = useState<Pose[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);
  const [index, setIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [finished, setFinished] = useState(false);
  const bellRef = useRef<HTMLAudioElement | null>(null);

  const current = poses[index];

  useEffect(() => {
    if (!courseTitle) return;

    const fetchPoses = async () => {
      try {
        const res = await publicRequest.get(`/api/user/healing/yoga/courses/${courseTitle}`);
        setPoses(res.data);
        setTimeLeft(res.data[0]?.time || 0);
      } catch (err) {
        console.error("요가 포즈 불러오기 실패:", err);
      }
    };

    fetchPoses();
  }, [courseTitle]);

  useEffect(() => {
    if (!isStarted || poses.length === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          const bell = bellRef.current;

          if (isPreparing) {
            bell?.play?.();
            setTimeout(() => {
              setIsPreparing(false);
              setTimeLeft(poses[0].time);
            }, 1000);
          } else {
            if (index < poses.length - 1) {
              const nextIndex = index + 1;
              bell?.play?.();
              setTimeout(() => {
                setIndex(nextIndex);
                setTimeLeft(poses[nextIndex].time);
              }, 600);
            } else {
              bell?.play?.();
              setTimeout(() => setFinished(true), 300);
            }
          }

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPreparing, isStarted, index, poses]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-100 via-purple-200 to-blue-200 flex flex-col items-center px-4 py-10 pb-28 overflow-hidden">
      <HamburgerMenu />
      <ProfileIcon />

      {!isStarted ? (
        <div className="flex flex-col items-center justify-center flex-grow text-center mt-20">
          {courseTitle ? (
            <h2 className="text-2xl text-gray-700 font-semibold">
              {formatTitle(courseTitle)} 요가를 시작해 볼까요?
            </h2>
          ) : (
            <h2 className="text-2xl text-red-500 font-semibold">잘못된 경로입니다.</h2>
          )}
          <button
            onClick={() => {
              setIsStarted(true);
              setIsPreparing(true);
              setTimeLeft(20);
            }}
            className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-full shadow hover:bg-purple-700 transition"
            disabled={!courseTitle}
          >
            시작하기
          </button>
        </div>
      ) : isPreparing ? (
        <div className="flex flex-col items-center justify-center flex-grow text-center mt-20">
          <h2 className="text-2xl text-gray-700 font-semibold">요가를 준비해 주세요.</h2>
          <p className="mt-2 text-gray-600 text-sm">잠시 후 시작돼요. 🧎</p>
        </div>
      ) : !finished && current ? (
        <>
          <div className="w-full max-w-md mt-6">
            <Image
              src={current.image}
              alt={current.poseTitle}
              width={800}
              height={800}
              className="w-full h-auto object-contain rounded-xl shadow-md bg-white"
            />
          </div>

          <div className="text-center mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">{current.poseTitle}</h2>
            <p className="mt-2 text-gray-600">{current.description}</p>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center flex-grow text-center text-gray-700 text-2xl font-bold mt-10">
          🧎 코스를 모두 완료했어요! 🎉
          <button
            onClick={() => router.push("/healing/yoga")}
            className="mt-4 text-sm text-gray-600 underline hover:text-gray-600 transition"
          >
            코스 목록으로 돌아가기
          </button>
        </div>
      )}

      {isStarted && !finished && (
        <div className="fixed bottom-0 left-0 w-full bg-white bg-opacity-50 backdrop-blur-sm p-4 z-50">
          <div className="w-full max-w-xl mx-auto">
            <div className="h-4 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-500 transition-all"
                style={{
                  width: `${
                    isPreparing
                      ? ((20 - timeLeft) / 20) * 100
                      : ((poses[index]?.time - timeLeft) / poses[index]?.time) * 100
                  }%`,
                }}
              />
            </div>
            <p className="text-center mt-2 text-sm text-gray-600">{timeLeft}초 남음</p>
          </div>
        </div>
      )}

      <FooterLogo />
      <audio ref={bellRef} src="/music/bell.mp3" preload="auto" />
    </div>
  );
}
