"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HamburgerMenu() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <button
        className="absolute top-4 left-4 p-2 z-30"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="메뉴 열기"
      >
        <div className="space-y-1">
          <div className="w-6 h-0.5 bg-gray-700" />
          <div className="w-6 h-0.5 bg-gray-700" />
          <div className="w-6 h-0.5 bg-gray-700" />
        </div>
      </button>

      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute top-16 left-4 bg-white border rounded-md shadow-lg w-48 p-4 z-50 space-y-2"
        >
          <button
            onClick={() => router.push("/calendar")}
            className="w-full text-left text-gray-800 font-semibold"
          >
            내 캘린더
          </button>
          <button
            onClick={() => router.push("/profile")}
            className="w-full text-left text-gray-800 font-semibold"
          >
            회원정보 수정
          </button>
          <button
            onClick={() => router.push("/login")}
            className="w-full text-left text-gray-800 font-semibold"
          >
            로그아웃
          </button>
        </div>
      )}
    </>
  );
}
