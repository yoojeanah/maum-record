"use client";
import { useEffect, useRef, useState } from "react";
import HamburgerMenu from "@/app/components/HamburgerMenu";
import ProfileIcon from "@/app/components/ProfileIcon";
import FooterLogo from "@/app/components/FooterLogo";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [emotionMap, setEmotionMap] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [customColor, setCustomColor] = useState("#ffeb3b");
  const [alpha, setAlpha] = useState(80);
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });

  const [monthlyFlowerData, setMonthlyFlowerData] = useState({});

  const cellRefs = useRef({});
  const popupRef = useRef(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const todayKey = new Date().toISOString().split("T")[0];

  const monthKey = `${year}-${String(month + 1).padStart(2, "0")}`;

  const allFlowerNames = [
    "Cosmo", "Daffodil", "Daisy", "Lavender", "Lily",
    "LilyOfTheValley", "Orchid", "Pansy", "Poppy", "Rose",
    "Sunflower", "Tulip"
  ];

  const changeMonth = (offset) => {
    const newDate = new Date(year, month + offset);
    setCurrentDate(newDate);
    setSelectedDate(null);
  };

  const applyEmotionColor = (dateKey) => {
    const rgba =
      customColor + Math.round(((100 - alpha) / 100) * 255).toString(16).padStart(2, "0");
    setEmotionMap((prev) => ({ ...prev, [dateKey]: rgba }));
    setSelectedDate(null);
  };

  const emotionDatesThisMonth = Object.keys(emotionMap).filter((dateStr) => {
    const date = new Date(dateStr);
    return date.getFullYear() === year && date.getMonth() === month;
  });

  const flowerGrid = monthlyFlowerData[monthKey]?.flowerGrid || Array(64).fill(null);
  const plantedDays = monthlyFlowerData[monthKey]?.plantedDays || [];

  useEffect(() => {
    const newDatesToPlant = emotionDatesThisMonth.filter(
      (date) => !plantedDays.includes(date)
    );

    if (newDatesToPlant.length === 0) return;

    const newGrid = [...flowerGrid];
    let availableIndexes = newGrid
      .map((val, idx) => (val === null ? idx : null))
      .filter((val) => val !== null);

    let updated = false;

    newDatesToPlant.forEach((date) => {
      if (availableIndexes.length < 2) return;

      const [f1, f2] = [...allFlowerNames].sort(() => 0.5 - Math.random()).slice(0, 2);
      const [i1, i2] = [...availableIndexes].sort(() => 0.5 - Math.random()).slice(0, 2);

      newGrid[i1] = f1;
      newGrid[i2] = f2;

      availableIndexes = availableIndexes.filter((idx) => idx !== i1 && idx !== i2);

      updated = true;
    });

    if (updated) {
      setMonthlyFlowerData((prev) => ({
        ...prev,
        [monthKey]: {
          flowerGrid: newGrid,
          plantedDays: [...plantedDays, ...newDatesToPlant],
        },
      }));
    }
  }, [emotionDatesThisMonth.join(","), monthKey]);

  useEffect(() => {
    if (selectedDate && cellRefs.current[selectedDate]) {
      const rect = cellRefs.current[selectedDate].getBoundingClientRect();
      setPopupPos({
        x: rect.left + rect.width / 2,
        y: rect.bottom + window.scrollY + 8,
      });
    }
  }, [selectedDate]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setSelectedDate(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 px-4 py-10">
      <HamburgerMenu />
      <ProfileIcon />

      <div className="flex flex-col md:flex-row gap-4 mt-20 w-full max-w-4xl justify-between items-center mx-auto">
        <div className="relative z-10 w-[350px]">
          <div className="flex items-center justify-center gap-4 mb-4">
            <button
              onClick={() => changeMonth(-1)}
              className="text-2xl text-gray-600 hover:text-blue-500"
            >
              &lt;
            </button>
            <h2 className="text-xl font-semibold text-gray-700">
              {year}년 {month + 1}월
            </h2>
            <button
              onClick={() => changeMonth(1)}
              className="text-2xl text-gray-600 hover:text-blue-500"
            >
              &gt;
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 text-sm text-center relative">
            {weekdays.map((day) => (
              <div key={day} className="font-bold text-gray-600">
                {day}
              </div>
            ))}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(
                day
              ).padStart(2, "0")}`;
              const bgColor = emotionMap[key] || "#fff";
              const isToday = key === todayKey;

              return (
                <div
                  key={key}
                  ref={(el) => (cellRefs.current[key] = el)}
                  onClick={() => setSelectedDate(key)}
                  className={`relative w-10 h-10 rounded-md border flex items-center justify-center text-gray-800 transition
                    ${isToday ? "ring-2 ring-blue-400 font-bold" : "border-gray-300"}
                    hover:scale-105 cursor-pointer`}
                  style={{ backgroundColor: bgColor }}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-[350px] h-[350px] border border-dashed border-gray-400 rounded-xl grid grid-cols-8 grid-rows-8 overflow-hidden">
          {flowerGrid.map((flower, i) => (
            <div
              key={i}
              className="w-[43.75px] h-[43.75px] flex items-center justify-center"
            >
              {flower && (
                <img
                  src={`/flowers/${flower}.png`}
                  alt={flower}
                  className="w-6 h-6 object-contain"
                  style={{ imageRendering: "pixelated" }}
                  draggable={false}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-xl font-bold text-gray-800">
          이달에 감정을 {emotionDatesThisMonth.length}일 기록하셨어요.
        </p>
      </div>

      <footer className="mt-20 flex justify-center">
        <FooterLogo />
      </footer>

      {selectedDate && (
        <div
          ref={popupRef}
          className="absolute bg-white shadow-xl rounded-xl p-5 w-80 z-50"
          style={{ top: popupPos.y, left: popupPos.x - 160 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <p className="font-bold text-gray-600">🧠 AI 추천 색상</p>
            <div className="w-5 h-5 rounded-full bg-yellow-300 border border-gray-300" />
          </div>

          <label className="block text-sm font-bold text-gray-600 mb-1">색상 선택</label>
          <input
            type="color"
            value={customColor}
            onChange={(e) => setCustomColor(e.target.value)}
            className="w-full h-10 rounded-md border p-0 mb-3 cursor-pointer"
          />

          <label className="block text-sm font-bold text-gray-600 mb-1">
            투명도: {alpha}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={alpha}
            onChange={(e) => setAlpha(Number(e.target.value))}
            className="w-full mb-3"
          />

          <div
            className="text-center text-gray-600 font-bold text-base cursor-pointer"
            onClick={() => applyEmotionColor(selectedDate)}
          >
            저장
          </div>
        </div>
      )}
    </div>
  );
}
