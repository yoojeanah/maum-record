"use client";
import { useEffect, useState } from "react";
import HamburgerMenu from "@/app/components/HamburgerMenu";
import { Sun, Moon } from "lucide-react";
import Image from "next/image";
import { publicRequest } from "@/lib/axiosInstance";

interface EmotionRecord {
  emotion: string;
  longSummary: string;
  memo?: string;
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [emotionData, setEmotionData] = useState<{ [dateKey: string]: EmotionRecord }>({});

  useEffect(() => {
    const fetchEmotionData = async () => {
      try {
        const res = await publicRequest.get("/api/emotions");
        setEmotionData(res.data);
      } catch (error) {
        console.error("감정 기록 조회 실패:", error);
      }
    };

    fetchEmotionData();
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const todayKey = new Date().toISOString().split("T")[0];

  const lightPalette = [
    { emotion: "공포", color: "#A0C4FF" },
    { emotion: "놀람", color: "#FFD6A5" },
    { emotion: "분노", color: "#FF6B6B" },
    { emotion: "슬픔", color: "#BBD0FF" },
    { emotion: "중립", color: "#EAEAEA" },
    { emotion: "행복", color: "#FDFFB6" },
    { emotion: "혐오", color: "#C5DCA0" },
  ];

  const darkPalette = [
    { emotion: "공포", color: "#264653" },
    { emotion: "놀람", color: "#A68A64" },
    { emotion: "분노", color: "#9B1D20" },
    { emotion: "슬픔", color: "#3A506B" },
    { emotion: "중립", color: "#6C757D" },
    { emotion: "행복", color: "#D4A373" },
    { emotion: "혐오", color: "#556B2F" },
  ];

  const palette = theme === "light" ? lightPalette : darkPalette;

  const getColorByEmotion = (emotion: string | undefined) => {
    if (!emotion) return theme === "light" ? "#fff" : "#1f2937";
    return palette.find((e) => emotion.includes(e.emotion))?.color || "#fff";
  };

  const changeMonth = (offset: number) => {
    const newDate = new Date(year, month + offset);
    setCurrentDate(newDate);
    setSelectedDate(null);
  };

  const emotionDatesThisMonth = Object.keys(emotionData).filter((dateStr) => {
    const [y, m] = dateStr.split("-").map(Number);
    return y === year && m === month + 1;
  });

  const getTreeImage = (): string => {
    const count = emotionDatesThisMonth.length;
    if (count >= 24) return "/images/tree-fruit.png";
    if (count >= 18) return "/images/tree-full.png";
    if (count >= 12) return "/images/tree-taller.png";
    if (count >= 6) return "/images/tree-growing.png";
    return "/images/tree-sprout.png";
  };

  return (
    <div
      className={`relative min-h-screen px-4 py-10 transition-colors duration-300
        ${theme === "light"
          ? "bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 text-gray-800"
          : "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100"
        }`}
    >
      <HamburgerMenu />

      <div className="flex flex-col md:flex-row gap-4 mt-20 w-full max-w-4xl justify-between items-start mx-auto">
        <div className="relative z-10 w-[350px]">
          <div className="flex items-center justify-center gap-4 mb-4">
            <button onClick={() => changeMonth(-1)} className="text-2xl hover:text-blue-400">
              &lt;
            </button>
            <h2 className="text-xl font-semibold">{year}년 {month + 1}월</h2>
            <button onClick={() => changeMonth(1)} className="text-2xl hover:text-blue-400">
              &gt;
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 text-sm text-center">
            {weekdays.map((day) => (
              <div key={day} className="font-bold">{day}</div>
            ))}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const bgColor = getColorByEmotion(emotionData[key]?.emotion);
              const isToday = key === todayKey;
              return (
                <div
                  key={key}
                  onClick={() => emotionData[key]?.longSummary && setSelectedDate(key)}
                  className={`relative w-10 h-10 rounded-md border flex items-center justify-center transition cursor-pointer
                    ${isToday ? "ring-2 ring-blue-400 font-bold border-0" : ""}`}
                  style={{ backgroundColor: bgColor }}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative w-[350px] py-6">
          {selectedDate && emotionData[selectedDate] ? (
            <div
              className={`rounded-xl shadow-2xl p-5 text-sm z-40 max-h-[350px] overflow-y-auto
                ${theme === "light" ? "bg-white text-gray-800" : "bg-gray-800 text-gray-100"}`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-xs text-gray-500">{selectedDate}</p>
                  <p className="text-lg font-semibold mt-1">{emotionData[selectedDate].emotion}</p>
                </div>
                <button
                  onClick={() => setSelectedDate(null)}
                  className="text-gray-400 hover:text-gray-600 text-lg"
                >
                  ×
                </button>
              </div>
              <div className="whitespace-pre-wrap break-words leading-relaxed text-sm mb-4">
                {emotionData[selectedDate].longSummary}
              </div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">내 메모</label>
              <textarea
                className="w-full h-20 border border-gray-300 rounded-md p-2 text-sm mb-3 resize-none 
                  text-black dark:text-black bg-white dark:bg-white"
                placeholder="이날에 느낀 나만의 생각을 적어 보세요."
                value={emotionData[selectedDate].memo || ""}
                onChange={(e) => {
                  const newMemo = e.target.value;
                  setEmotionData((prev) => ({
                    ...prev,
                    [selectedDate]: {
                      ...prev[selectedDate],
                      memo: newMemo,
                    },
                  }));
                }}
              />
              <button
                onClick={async () => {
                  try {
                    await publicRequest.patch(`/api/emotions/${selectedDate}/memo`, {
                      memo: emotionData[selectedDate].memo || "",
                    });
                    setSelectedDate(null);
                  } catch (err) {
                    alert("메모 저장에 실패했습니다.");
                    console.error("메모 저장 실패:", err);
                  }
                }}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded"
              >
                저장하고 닫기
              </button>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <Image
                src={getTreeImage()}
                alt="Tree Growth Stage"
                width={300}
                height={300}
                className="transition-all"
              />
              {emotionDatesThisMonth.length > 0 && (
                <p className="mt-3 text-sm text-gray-500">
                  나무가 {emotionDatesThisMonth.length}일째 자라고 있어요.
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="relative h-28 mt-12 mb-4">
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-30 text-center">
          <button
            onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
            className={`inline-flex items-center justify-center w-10 h-10 rounded-full 
              transition hover:scale-105 mb-2 
              ${theme === "light" ? "bg-white/80 text-gray-700" : "bg-gray-600 text-gray-200"}`}
          >
            {theme === "light" ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-300" />
            )}
          </button>
          <p className="text-xl font-bold">
            이달에 감정을 {emotionDatesThisMonth.length}일 기록하셨어요.
          </p>
        </div>
      </div>
    </div>
  );
}
