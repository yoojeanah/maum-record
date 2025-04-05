"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image";

export default function ProfilePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("마음이");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [preview, setPreview] = useState("/profile-default.png");
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setError("");
    console.log("저장된 정보:", { name, nickname, password });
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
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="홍길동"
              className="appearance-none w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div> */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">닉네임</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="마음이"
              className="appearance-none w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">새 비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="appearance-none w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호 확인</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="appearance-none w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

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
