// src/app/signup/page.js
// 회원가입 페이지

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { publicRequest } from "@/lib/axiosInstance";

// 이메일 정규식: 이메일 형식에 맞는지 검사
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 비밀번호 정규식: 소문자 최소 1개, 대문자 최소 1개, 숫자 최소 1개, 특수문자 중 최소 1개 포함, 전체 길이는 8~24자
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function SignupPage() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [confirmPwd, setConfirmPwd] = useState("");
  const [match, setMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [error, setError] = useState("");

  // 이메일 유효성 검사 함수 (실시간)
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  // 비밀번호 유효성 검사 함수 (실시간)
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setMatch(password === confirmPwd);
  }, [password, confirmPwd]);

  // 회원가입 요청 핸들러
  // 서버에 POST 요청을 보내고 응답 처리
  // 응답이 성공적이면 로그인 페이지로 이동
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validEmail || !validPwd || !match) {
      setError("입력한 정보를 확인해 주세요.");
      return;
    }

    try {
      const response = await publicRequest.post("/signup", {
        nickname,
        email,
        password,
      });

      alert("회원가입이 완료되었습니다.");
      router.push("/login");
    } catch (err) {
      console.error("회원가입 실패: ", err);
      setError("회원가입에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          회원가입
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 닉네임 */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              닉네임
            </label>
            <input
              type="text"
              required
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="마음이"
              className="appearance-none w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* 이메일 */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              이메일
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              placeholder="example@email.com"
              className="appearance-none w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {emailFocus && !validEmail && (
              <p className="text-red-500 text-sm mt-1">
                이메일 형식이 올바르지 않습니다.
              </p>
            )}
          </div>

          {/* 비밀번호 */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              비밀번호
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              placeholder="••••••••"
              className="appearance-none w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {pwdFocus && !validPwd && (
              <p className="text-red-500 text-sm mt-1">
                비밀번호는 8~24자, 소문자, 대문자, 숫자, 특수문자를 포함해야
                합니다.
              </p>
            )}
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              비밀번호 확인
            </label>
            <input
              type="password"
              required
              value={confirmPwd}
              onChange={(e) => setConfirmPwd(e.target.value)}
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              placeholder="••••••••"
              className="appearance-none w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {matchFocus && !match && (
              <p className="text-red-500 text-sm mt-1">
                비밀번호가 일치하지 않습니다.
              </p>
            )}
          </div>

          {/* 에러 메시지 */}
          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            회원가입
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
