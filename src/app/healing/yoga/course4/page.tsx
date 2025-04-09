"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import HamburgerMenu from "@/app/components/HamburgerMenu";
import ProfileIcon from "@/app/components/ProfileIcon";
import FooterLogo from "@/app/components/FooterLogo";
import FeedbackModal from "@/app/components/FeedbackModal";
import AnalysisToast from "@/app/components/AnalysisToast";

interface Pose {
  id: string;
  name: string;
  duration: number;
  description: string;
  image: string;
}

export default function Course1Page() {
  // TODO: 알림 상태는 전역 관리로 전환 예정 (Zustand/Redux 등 도입 시)
  // const [showToast, setShowToast] = useState(false);
  // const [showFeedback, setShowFeedback] = useState(false);
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
    const toastTimer = setTimeout(() => {
      // setShowToast(true);
    }, 10000);
    return () => clearTimeout(toastTimer);
  }, []);

  useEffect(() => {
    const fetchPoses = async () => {
      try {
        const res = await axios.get("/api/yoga-courses/4");
        setPoses(res.data.poses);
        setTimeLeft(res.data.poses[0]?.duration || 0);
      } catch (err) {
        console.error("요가 포즈 불러오기 실패:", err);
      }
    };

    fetchPoses();
  }, []);

  useEffect(() => {
    if (!isStarted || poses.length === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);

          if (isPreparing) {
            bellRef.current?.play();
            setTimeout(() => {
              setIsPreparing(false);
              setTimeLeft(poses[0].duration);
            }, 1000);
          } else {
            if (index < poses.length - 1) {
              const nextIndex = index + 1;

              const playAndGoNext = () => {
                bellRef.current?.play().catch(() => {});
                setTimeout(() => {
                  setIndex(nextIndex);
                  setTimeLeft(poses[nextIndex].duration);
                }, 600);
              };

              if (bellRef.current && bellRef.current.readyState >= 2) {
                playAndGoNext();
              } else if (bellRef.current) {
                bellRef.current.addEventListener("canplaythrough", playAndGoNext, { once: true });
              }
            } else {
              setTimeout(() => {
                const playBell = () => {
                  bellRef.current?.play().catch((err) => {
                    console.warn("🔕 마지막 종소리 실패:", err);
                  });
                };

                if (bellRef.current && bellRef.current.readyState >= 2) {
                  playBell();
                } else if (bellRef.current) {
                  bellRef.current.addEventListener("canplaythrough", playBell, { once: true });
                }

                setFinished(true);
              }, 300);
            }
          }

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [index, isPreparing, isStarted, poses]);

  // const handleConfirm = () => {
  //   setShowFeedback(true);
  // };

  // const handleFeedback = (feedback) => {
  //   router.push("/result");
  // };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-100 via-purple-200 to-blue-200 flex flex-col items-center px-4 py-10 pb-28 overflow-hidden">
      <HamburgerMenu />
      <ProfileIcon />

      {!isStarted ? (
        <div className="flex flex-col items-center justify-center flex-grow text-center mt-20">
          <h2 className="text-2xl text-gray-700 font-semibold">요가를 시작해 볼까요?</h2>
          <button
            onClick={() => {
              setIsStarted(true);
              setIsPreparing(true);
              setTimeLeft(20);
            }}
            className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-full shadow hover:bg-purple-700 transition"
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
              alt={current.name}
              width={800}
              height={800}
              className="w-full h-auto object-contain rounded-xl shadow-md bg-white"
            />
          </div>

          <div className="text-center mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">{current.name}</h2>
            <p className="mt-2 text-gray-600">{current.description}</p>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center flex-grow text-center text-gray-700 text-2xl font-bold mt-10">
          🧎 코스를 모두 완료했어요! 🎉
          <button
            onClick={() => router.push("/healing")}
            className="mt-4 text-sm text-gray-600 underline hover:text-gray-600 transition"
          >
            홈으로 돌아가기
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
                      : ((poses[index]?.duration - timeLeft) / poses[index]?.duration) * 100
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
