"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image";
import { useUser } from "@/context/UserContext";

export default function ProfilePage() {
  const router = useRouter();
  const { nickname: globalNickname, profileImage, setNickname: setGlobalNickname, setProfileImage } = useUser();

  const [nickname, setNickname] = useState(globalNickname || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [preview, setPreview] = useState(profileImage || "/profile-default.png");
  const [file, setFile] = useState<File | null>(null);

  const [nicknameError, setNicknameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const selected = e.target.files[0];

    if (selected.size > 5 * 1024 * 1024) {
      alert("5MB 이하 파일만 업로드 가능합니다.");
      return;
    }

    if (!selected.type.startsWith("image/")) {
      alert("이미지 파일만 업로드할 수 있습니다.");
      return;
    }

    setFile(selected);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selected);
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = true;

    if (nickname.trim() === "") {
      setNicknameError("닉네임을 입력해 주세요.");
      isValid = false;
    } else if (nickname.trim().length > 5) {
      setNicknameError("닉네임은 5자 이하로 입력해 주세요.");
      isValid = false;
    } else {
      setNicknameError("");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    // 비밀번호가 입력됐는데 8자 미만이면 에러
    if (password && password.length < 8) {
      setPasswordError("비밀번호는 대/소문자, 숫자, 특수문자를 포함한 8~24자여야 합니다.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!isValid) return;

    setGlobalNickname(nickname);
    if (file) {
      const tempUrl = URL.createObjectURL(file);
      setProfileImage(tempUrl);
    }

    alert("회원정보가 저장되었습니다!");
    router.push("/record");
  };

  const handleDelete = () => {
    const confirmDelete = confirm("정말로 계정을 삭제하시겠습니까?");
    if (confirmDelete) {
      alert("계정이 삭제되었습니다. 안녕히 가세요!");
      router.push("/login");
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center justify-center px-4 py-10">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">회원정보 수정</h2>

        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 p-2 text-gray-700 hover:text-blue-500"
        >
          <IoIosArrowBack className="text-3xl text-gray-700" />
        </button>

        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 relative mb-2">
            <Image
              src={preview}
              alt="프로필 사진"
              fill
              className="rounded-full object-cover border border-gray-200 bg-white"
              onError={(e) => {
                e.currentTarget.src = "/profile-default.png";
              }}
            />
          </div>
          <label className="text-sm text-blue-500 cursor-pointer hover:underline">
            프로필 사진 변경
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          {/* 닉네임 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">닉네임</label>
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

          {/* 새 비밀번호 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">새 비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="appearance-none w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호 확인</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="appearance-none w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {confirmPasswordError && (
              <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
          >
            저장하기
          </button>
        </form>
      </div>

      <div className="w-full max-w-md flex justify-end mt-2">
        <button
          onClick={handleDelete}
          className="text-xs text-red-400 hover:text-red-600 hover:underline"
        >
          계정 삭제하기
        </button>
      </div>
    </div>
  );
}
