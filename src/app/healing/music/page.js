"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaPlay, FaPause } from "react-icons/fa";
import HamburgerMenu from "@/app/components/HamburgerMenu";
import ProfileIcon from "@/app/components/ProfileIcon";
import FooterLogo from "@/app/components/FooterLogo";
import FeedbackModal from "@/app/components/FeedbackModal";
import AnalysisToast from "@/app/components/AnalysisToast";

function ChalkboardCanvas() {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#ffffff";

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches?.[0]?.clientX ?? e.clientX;
      const clientY = e.touches?.[0]?.clientY ?? e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const startDrawing = (e) => {
      const { x, y } = getPos(e);
      ctx.beginPath();
      ctx.moveTo(x, y);
      isDrawing.current = true;
    };

    const draw = (e) => {
      if (!isDrawing.current) return;
      const { x, y } = getPos(e);
      ctx.lineTo(x, y);
      ctx.stroke();
    };

    const stopDrawing = () => {
      isDrawing.current = false;
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);
    canvas.addEventListener("touchstart", startDrawing);
    canvas.addEventListener("touchmove", draw);
    canvas.addEventListener("touchend", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseleave", stopDrawing);
      canvas.removeEventListener("touchstart", startDrawing);
      canvas.removeEventListener("touchmove", draw);
      canvas.removeEventListener("touchend", stopDrawing);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0"
      style={{ touchAction: "none", pointerEvents: "auto" }}
    />
  );
}

export default function MusicPage() {
  const router = useRouter();
  const [nickname, setNickname] = useState("마음이");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState("");
// TODO: 알림 상태는 전역 관리로 전환 예정 (Zustand/Redux 등 도입 시)
// const [showToast, setShowToast] = useState(false);
// const [showFeedback, setShowFeedback] = useState(false);
  const audioRef = useRef(null);

  const tracks = [
    "/music/1.mp3",
    "/music/2.mp3",
    "/music/3.mp3",
    "/music/4.mp3",
    "/music/5.mp3",
    "/music/6.mp3",
  ];

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      if (!currentTrack) {
        const newTrack = tracks[Math.floor(Math.random() * tracks.length)];
        setCurrentTrack(newTrack);
        audio.src = newTrack;
        audio.load();
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.warn("재생 실패:", err.message);
        });
      } else {
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.warn("재생 실패:", err.message);
        });
      }
    }
  };

  const handleTrackEnd = () => {
    const nextTrack = tracks[Math.floor(Math.random() * tracks.length)];
    setCurrentTrack(nextTrack);
    const audio = audioRef.current;
    if (audio) {
      audio.src = nextTrack;
      audio.load();
      audio.play().catch((err) => {
        console.warn("다음 트랙 재생 실패:", err.message);
      });
    }
  };

  // const handleConfirm = () => {
  //   setShowFeedback(true);
  // };

  // const handleFeedback = (feedback) => {
  //   console.log("음악 피드백:", feedback);
  //   router.push("/result");
  // };

  useEffect(() => {
    const toastTimer = setTimeout(() => {
      // setShowToast(true);
    }, 10000);
    return () => clearTimeout(toastTimer);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-100 via-purple-200 to-blue-200 flex flex-col items-center justify-center px-4 py-10 overflow-hidden">
      <ChalkboardCanvas />
      <HamburgerMenu />
      <ProfileIcon />

      <h1 className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-semibold text-center mb-8 mt-6 animate-sway relative z-10">
        {nickname} 님, <br />
        평화로운 피아노 음악과 함께 마음의 힐링을 느껴 보세요. 🎶
      </h1>

      <div className="flex justify-center mb-6 relative z-10">
        <button onClick={togglePlay} className="text-white text-3xl transition">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
      </div>

      <audio ref={audioRef} onEnded={handleTrackEnd} controls={false} />
      <FooterLogo />

      {/* TODO: 전역 알림 시스템 구축 후 알림 및 피드백 팝업 다시 연결할 것
      <AnalysisToast onConfirm={handleConfirm} />
      <FeedbackModal show={showFeedback} onSelect={handleFeedback} /> */}

      <style jsx>{`
        @keyframes sway {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }

        .animate-sway {
          display: inline-block;
          animation: sway 3s ease-in-out infinite;
        }

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
