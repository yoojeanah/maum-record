"use client";
import { useUser } from "@/context/UserContext";
import { useEffect, useRef, useState } from "react";
import { publicRequest } from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import HamburgerMenu from "@/app/components/HamburgerMenu";
import ProfileIcon from "@/app/components/ProfileIcon";
import FooterLogo from "@/app/components/FooterLogo";

interface MeditationCourseData {
  id: number;
  locked: boolean;
  background: {
    type: "video" | "image";
    src: string | string[];
  };
  preStartText: string;
  postStartText: string[];
  audios: {
    src: string;
    delay: number;
    loop?: boolean;
    interval?: number;
  }[];
  showVoliCredit: boolean;
}

export default function Course2() {
  const courseId = 1;
  const { nickname } = useUser();
  const router = useRouter();
  const [data, setData] = useState<MeditationCourseData | null>(null);
  const [started, setStarted] = useState(false);
  const [fade, setFade] = useState(true);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const audioRefs = useRef<HTMLAudioElement[]>([]);
  const audioIntervals = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    publicRequest.get(`/api/meditation-courses/${courseId}`).then((res) => {
      if (res.data.locked) {
        alert("아직 공개되지 않은 코스입니다.");
        router.push("/healing/meditation");
      } else {
        setData(res.data);
      }
    });
  }, [courseId, router]);

  useEffect(() => {
    if (!data) return;
    if (data.background.type === "video") {
      if (Array.isArray(data.background.src)) {
        const changeVideo = () => {
          const next = data.background.src[
            Math.floor(Math.random() * data.background.src.length)
          ];
          setVideoSrc(next);
        };
        changeVideo();
        const interval = setInterval(changeVideo, 120000);
        return () => clearInterval(interval);
      } else {
        setVideoSrc(data.background.src);
      }
    }
  }, [data]);

  const handleStart = () => {
    setFade(false);
    setTimeout(() => {
      setStarted(true);
      setFade(true);

      data?.audios.forEach((audio, i) => {
        setTimeout(() => {
          const ref = audioRefs.current[i];
          if (ref) {
            if (audio.loop) ref.loop = true;
            ref.play();

            if (audio.interval) {
              const intervalId = setInterval(() => {
                ref.play();
              }, audio.interval);
              audioIntervals.current.push(intervalId);
            }
          }
        }, audio.delay);
      });
    }, 300);
  };

  useEffect(() => {
    return () => {
      audioIntervals.current.forEach(clearInterval);
    };
  }, []);

  if (!data) return <div className="text-white text-center mt-20">로딩 중...</div>;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-10 overflow-hidden bg-black">
      {data.background.type === "video" && videoSrc && (
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />
      )}
      {data.background.type === "image" && typeof data.background.src === "string" && (
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${data.background.src})` }}
        />
      )}

      <HamburgerMenu />
      <ProfileIcon />

      <div
        className={`absolute top-1/3 text-center z-20 h-[90px] flex flex-col items-center justify-center transition-opacity duration-500 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        {!started ? (
          <h1
            className="text-xl sm:text-2xl md:text-3xl text-white font-semibold leading-relaxed cursor-pointer"
            onClick={handleStart}
          >
            {data.preStartText}
          </h1>
        ) : (
          <div className="text-xl sm:text-2xl md:text-3xl text-white font-semibold leading-relaxed">
            {data.postStartText.map((line, i) => (
              <div key={i} className={i > 0 ? "pl-4" : ""}>
                {line.replace("{{nickname}}", nickname)}
              </div>
            ))}
          </div>
        )}
      </div>

      {data.showVoliCredit && (
        <div className="absolute top-2/3 text-xs text-center text-gray-500 z-20">
          이 콘텐츠는 VOLI의 AI보이스를 활용하여 제작되었습니다. <br />
          https://voli.ai
        </div>
      )}

      <FooterLogo />

      {data.audios.map((audio, i) => (
        <audio
          key={i}
          ref={(el) => {
            if (el) audioRefs.current[i] = el;
          }}
          src={audio.src}
          preload="auto"
        />
      ))}
    </div>
  );
}
