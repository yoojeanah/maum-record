// export default function EmotionColorPalette() {
//     const lightPalette = [
//       { emotion: "공포", color: "#A0C4FF" },
//       { emotion: "놀람", color: "#FFD6A5" },
//       { emotion: "분노", color: "#FF6B6B" },
//       { emotion: "슬픔", color: "#BBD0FF" },
//       { emotion: "중립", color: "#EAEAEA" },
//       { emotion: "행복", color: "#FDFFB6" },
//       { emotion: "혐오", color: "#C5DCA0" },
//     ];
  
//     const darkPalette = [
//       { emotion: "공포", color: "#264653" },
//       { emotion: "놀람", color: "#A68A64" },
//       { emotion: "분노", color: "#9B1D20" },
//       { emotion: "슬픔", color: "#3A506B" },
//       { emotion: "중립", color: "#6C757D" },
//       { emotion: "행복", color: "#D4A373" },
//       { emotion: "혐오", color: "#556B2F" },
//     ];
  
//     return (
//       <div className="space-y-6">
//         <div>
//           <h2 className="text-sm font-semibold text-gray-600 mb-2">밝은 감정 팔레트</h2>
//           <div className="flex gap-2">
//             {lightPalette.map((item) => (
//               <div
//                 key={item.emotion}
//                 title={item.emotion}
//                 className="w-8 h-8 rounded-md border"
//                 style={{ backgroundColor: item.color }}
//               />
//             ))}
//           </div>
//         </div>
  
//         <div>
//           <h2 className="text-sm font-semibold text-gray-600 mb-2">어두운 감정 팔레트</h2>
//           <div className="flex gap-2">
//             {darkPalette.map((item) => (
//               <div
//                 key={item.emotion}
//                 title={item.emotion}
//                 className="w-8 h-8 rounded-md border"
//                 style={{ backgroundColor: item.color }}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

"use client";
import { useRef, useState } from "react";

export default function VideoBackgroundTest() {
  const [started, setStarted] = useState(false);
  const [fade, setFade] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const nickname = "마음이";

  const handleStart = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 1;
      videoRef.current.play();
    }

    setFade(false);
    setTimeout(() => {
      setStarted(true);
      setFade(true);
    }, 300);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-500 ${
          started ? "opacity-100" : "opacity-0"
        }`}
        src="video/course1.mp4"
        loop
        playsInline
      />

      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          started ? "opacity-0" : "opacity-100"
        } bg-gradient-to-br from-pink-100 via-purple-200 to-blue-200 z-0`}
      />

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
            명상을 시작하시려면 이곳을 클릭하세요.
          </h1>
        ) : (
          <h1 className="text-xl sm:text-2xl md:text-3xl text-white font-semibold leading-relaxed">
            {nickname} 님, <br />
            마음을 편안하게 가라앉히세요. 🧘‍♀
          </h1>
        )}
      </div>
    </div>
  );
}
