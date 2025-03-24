"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

export default function ProfilePage() {
  const router = useRouter();
  const [nickname, setNickname] = useState("마음이");
  const [email, setEmail] = useState("user@maumrecord.com");
  const [preview, setPreview] = useState("/profile-default.png");

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
    console.log("저장된 정보:", { nickname, email });
    alert("회원정보가 저장되었습니다!");
    router.push("/record");
  };

  const handleDelete = () => {
    const confirmDelete = confirm("정말로 계정을 삭제하시겠습니까?");
    if (confirmDelete) {
      // TODO: 백엔드로 삭제 요청 보내기
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

        {/* 프로필 이미지 */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={preview}
            alt="프로필 사진"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/profile-default.png";
            }}
            className="w-24 h-24 rounded-full object-cover border border-gray-300 mb-2 bg-white"
          />
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

        {/* 입력 폼 */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">닉네임</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
          >
            저장하기
          </button>
        </form>
      </div>

      {/* 계정 삭제 버튼 */}
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
