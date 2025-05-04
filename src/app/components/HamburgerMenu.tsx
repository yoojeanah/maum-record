"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/logout";
import { useUser } from "@/context/UserContext";
import { motion, AnimatePresence } from "framer-motion";

export default function HamburgerMenu() {
  const router = useRouter();
  const { setNickname, setProfileImage } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setNickname("");
    setProfileImage("/profile-default.png");
    router.push("/login");
  };

  const toggleMenu = () => {
    if (menuOpen) {
      setShowMenu(false);
    } else {
      setMenuOpen(true);
      setShowMenu(true);
    }
  };

  return (
    <>
      <button
        className="absolute top-4 left-4 p-2 z-30"
        onClick={toggleMenu}
        aria-label="메뉴 열기"
      >
        <div className="space-y-1">
          <div className="w-6 h-0.5 bg-gray-700" />
          <div className="w-6 h-0.5 bg-gray-700" />
          <div className="w-6 h-0.5 bg-gray-700" />
        </div>
      </button>

      <AnimatePresence onExitComplete={() => setMenuOpen(false)}>
        {showMenu && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-4 bg-white border rounded-md shadow-lg w-48 p-4 z-50 space-y-2"
          >
            <button
              onClick={() => router.push("/record")}
              className="w-full text-left text-gray-800 font-semibold"
            >
              일기 녹음하기
            </button>
            <button
              onClick={() => router.push("/calendar")}
              className="w-full text-left text-gray-800 font-semibold"
            >
              내 캘린더
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full text-left text-gray-800 font-semibold"
            >
              내 대시보드
            </button>
            <button
              onClick={() => router.push("/profile")}
              className="w-full text-left text-gray-800 font-semibold"
            >
              회원정보 수정
            </button>
            <button
              onClick={() => router.push("/my-inquiries")}
              className="w-full text-left text-gray-800 font-semibold"
            >
              1:1 문의
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left text-gray-800 font-semibold"
            >
              로그아웃
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
