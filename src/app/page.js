"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 4000); // 4초 후 로그인 페이지로 이동

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <h1 className="text-4xl font-bold text-blue-500 animate-pulse">
        MaumRecord
      </h1>
    </div>
  );
}
