// components/admin/AdminSidebar.tsx
// 관리자 페이지 사이드바 컴포넌트
"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleNavClick = (path: string) => {
    setIsOpen(false);
    router.push(path);
  };

  return (
    <>
      {/* 모바일용 햄버거 버튼 */}
      <button
        className="lg:hidden fixed top-4 left-4 z-30 p-2 rounded bg-white border shadow"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* 사이드바 영역 */}
      <aside
        className={`fixed top-0 left-0 w-60 bg-white h-screen min-h-screen border-r px-4 py-6 z-20 transform transition-transform duration-300
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:block`}
      >
        <div className="pl-14 lg:pl-0 text-2xl font-bold mb-10 text-center text-blue-700">
          MaumRecord
        </div>
        <nav className="flex flex-col gap-4 text-gray-700 font-semibold text-md lg:text-lg">
          <button
            onClick={() => handleNavClick("/admin")}
            className="hover:text-blue-600"
          >
            대시보드
          </button>
          <button
            onClick={() => handleNavClick("/admin/users")}
            className="hover:text-blue-600"
          >
            사용자 관리
          </button>
          <button
            onClick={() => handleNavClick("/admin/inquiries")}
            className="hover:text-blue-600"
          >
            1:1 문의 관리
          </button>
          <button
            onClick={() => handleNavClick("/admin/healing/create")}
            className="hover:text-blue-600"
          >
            힐링 콘텐츠 추가
          </button>
          <button
            onClick={() => handleNavClick("/admin/healing/meditation")}
            className="hover:text-blue-600"
          >
            명상 콘텐츠 관리
          </button>
          <button
            onClick={() => handleNavClick("/admin/healing/music")}
            className="hover:text-blue-600"
          >
            음악 감상 콘텐츠 관리
          </button>
          <button
            onClick={() => handleNavClick("/admin/healing/yoga-poses")}
            className="hover:text-blue-600"
          >
            요가 포즈 관리
          </button>
          <button
            onClick={() => handleNavClick("/admin/healing/yoga-programs")}
            className="hover:text-blue-600"
          >
            요가 프로그램 관리
          </button>
        </nav>
      </aside>
    </>
  );
}
