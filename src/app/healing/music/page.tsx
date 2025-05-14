"use client";
import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { useUser } from "@/context/UserContext";
import { publicRequest } from "@/lib/axiosInstance";
import HamburgerMenu from "@/app/components/HamburgerMenu";
import ProfileIcon from "@/app/components/ProfileIcon";
import FooterLogo from "@/app/components/FooterLogo";

interface MusicTrack {
  id: number;
  title?: string;
  src: string;
}

function ChalkboardCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#ffffff";

    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e instanceof TouchEvent ? e.touches[0]?.clientX : e.clientX;
      const clientY = e instanceof TouchEvent ? e.touches[0]?.clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const startDrawing = (e: MouseEvent | TouchEvent) => {
      const { x, y } = getPos(e);
      ctx.beginPath();
      ctx.moveTo(x, y);
      isDrawing.current = true;
    };

    const draw = (e: MouseEvent | TouchEvent) => {
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
  const { nickname } = useUser();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracks, setTracks] = useState<MusicTrack[]>([]);
  const [shuffled, setShuffled] = useState<MusicTrack[]>([]);
  const [shuffleIndex, setShuffleIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(null);

  useEffect(() => {
    publicRequest
      .get<MusicTrack[]>("/music-tracks")
      .then((res) => {
        setTracks(res.data);
        const shuffledList = shuffleTracks(res.data);
        setShuffled(shuffledList);
        setShuffleIndex(0);
      })
      .catch((err) => {
        console.error("음악 목록 불러오기 실패:", err);
      });
  }, []);

  const shuffleTracks = (list: MusicTrack[]) => {
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const playTrackByIndex = (index: number) => {
    const audio = audioRef.current;
    if (!audio || !shuffled.length) return;
    const track = shuffled[index];
    setCurrentTrack(track);
    setShuffleIndex(index);
    audio.src = track.src;
    audio.load();
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => {
        console.warn("재생 실패:", err.message);
      });
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      if (!currentTrack && shuffled.length > 0) {
        playTrackByIndex(0);
      } else {
        audio.play().then(() => setIsPlaying(true));
      }
    }
  };

  const handleTrackEnd = () => {
    const nextIndex = shuffleIndex + 1;
    if (nextIndex >= shuffled.length) {
      const reshuffled = shuffleTracks(tracks);
      setShuffled(reshuffled);
      setShuffleIndex(0);
      playTrackByIndex(0);
    } else {
      playTrackByIndex(nextIndex);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-100 via-purple-200 to-blue-200 flex flex-col items-center justify-center px-4 py-10 overflow-hidden">
      <ChalkboardCanvas />
      <HamburgerMenu />
      <ProfileIcon />
      <h1 className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-semibold text-center mb-8 mt-6 animate-sway relative z-10">
        {nickname} 님, <br />
        평화로운 피아노 음악과 함께 힐링을 느껴 보세요. 🎶
      </h1>
      <button onClick={togglePlay} className="text-white text-3xl mb-6 relative z-10">
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <audio ref={audioRef} onEnded={handleTrackEnd} />
      <FooterLogo />

      <style jsx>{`
        @keyframes sway {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }

        .animate-sway {
          display: inline-block;
          animation: sway 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
