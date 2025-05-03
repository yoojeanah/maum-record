"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { publicRequest } from "@/lib/axiosInstance";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

// 이메일 정규식
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 비밀번호 정규식
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function SignupPage() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  const [validEmail, setValidEmail] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [match, setMatch] = useState(false);

  const [nicknameError, setNicknameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPwdError, setConfirmPwdError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setMatch(password === confirmPwd);
  }, [password, confirmPwd]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = true;

    // 닉네임 검증
    if (nickname.trim() === "") {
      setNicknameError("닉네임을 입력해 주세요.");
      isValid = false;
    } else if (nickname.trim().length > 5) {
      setNicknameError("닉네임은 5자 이하로 입력해 주세요.");
      isValid = false;
    } else {
      setNicknameError("");
    }

    // 이메일 검증
    if (!validEmail) {
      setEmailError("이메일 형식이 올바르지 않습니다.");
      isValid = false;
    } else {
      setEmailError("");
    }

    // 비밀번호 검증
    if (!validPwd) {
      setPasswordError("비밀번호는 대/소문자, 숫자, 특수문자를 포함한 8~24자여야 합니다.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    // 비밀번호 확인 검증
    if (!match) {
      setConfirmPwdError("비밀번호가 일치하지 않습니다.");
      isValid = false;
    } else {
      setConfirmPwdError("");
    }

    if (!isValid) return;

    try {
      await publicRequest.post("/signup", {
        nickname,
        email,
        password,
      });

      alert("회원가입이 완료되었습니다.");
      router.push("/login");
    } catch (err) {
      console.error("회원가입 실패: ", err);
      alert("회원가입에 실패했습니다. 다시 시도해 주세요.");
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
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="마음이"
              className="appearance-none w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {nicknameError && (
              <p className="text-red-500 text-sm mt-1">{nicknameError}</p>
            )}
          </div>

          {/* 이메일 */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              이메일
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="appearance-none w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>

          {/* 비밀번호 */}
          <div className="relative">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              비밀번호
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="appearance-none w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 pr-10"
            />
            <div
              className="absolute top-9 right-3 cursor-pointer text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          {/* 비밀번호 확인 */}
          <div className="relative">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              비밀번호 확인
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPwd}
              onChange={(e) => setConfirmPwd(e.target.value)}
              placeholder="••••••••"
              className="appearance-none w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 pr-10"
            />
            <div
              className="absolute top-9 right-3 cursor-pointer text-gray-500"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
            </div>
            {confirmPwdError && (
              <p className="text-red-500 text-sm mt-1">{confirmPwdError}</p>
            )}
          </div>

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
