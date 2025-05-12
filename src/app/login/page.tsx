"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { publicRequest } from "@/lib/axiosInstance";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 로그인 핸들러
  // httpOnly Cookie 기반 로그인
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      setError("이메일과 비밀번호를 모두 입력해 주세요.");
      return;
    }

    try {
      // httpOnly Cookie 기반 로그인
      const response = await publicRequest.post("/login", {
        email,
        password,
      });
      router.push("/record");
    } catch (err) {
      console.error("로그인 실패: ", err);
      setError("로그인에 실패했습니다. 이메일과 비밀번호를 확인해 주세요.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-96">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          MaumRecord
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* 이메일 */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              이메일
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="appearance-none w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* 비밀번호 */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="appearance-none w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* 에러 메시지 */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            로그인
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          계정이 없으신가요?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
