"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { publicRequest } from "@/lib/axiosInstance";

export default function ContactAdminPage() {
  const router = useRouter();
  const [title, setTitle] = useState(""); // ✅ 제목 상태 추가
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    if (!title.trim() && !message.trim() && !file) return;

    const formData = new FormData();
    formData.append("title", title);        // ✅ 제목 추가
    formData.append("message", message);
    if (file) formData.append("file", file);

    try {
      await publicRequest.post("/api/inquiries", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSubmitted(true);
      setTitle("");    // ✅ 제목 초기화
      setMessage("");
      setFile(null);
    } catch (error) {
      alert("문의 전송에 실패했습니다.");
      console.error("문의 전송 오류:", error);
    }
  };

  return (
    <div className="h-screen w-full bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 flex flex-col justify-between space-y-6">
        {submitted ? (
          <div className="flex flex-col justify-center items-center flex-1 space-y-4">
            <h2 className="text-xl font-semibold text-blue-600">문의가 접수되었습니다.</h2>
            <p className="text-gray-600 text-sm">빠른 시일 내에 답변드릴게요.</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800">관리자에게 문의하기</h2>
                <p className="text-sm text-gray-500 mt-1">
                  궁금한 점이나 요청사항을 자유롭게 남겨 주세요.
                </p>
              </div>

              {/* ✅ 제목 입력 필드 */}
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="문의 제목을 입력하세요."
                className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
              />

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="문의 내용을 입력하세요."
                className="w-full h-60 border border-gray-300 rounded-md p-3 resize-none text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
              />

              <div
                className={`w-full h-20 flex items-center justify-center text-sm border-2 border-dashed rounded-md cursor-pointer transition ${
                  isDragging ? "border-blue-400 bg-blue-50" : "border-gray-300 bg-gray-50"
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  const dropped = e.dataTransfer.files?.[0];
                  if (dropped) setFile(dropped);
                }}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                {file ? (
                  <span className="text-blue-500 truncate">{file.name}</span>
                ) : (
                  <span className="text-gray-500">파일을 드래그하거나 클릭해 첨부</span>
                )}
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md text-sm font-medium transition"
              >
                문의 전송하기
              </button>
            </div>
          </>
        )}

        <div className="w-full flex justify-end">
          <button
            onClick={() => router.push("/my-inquiries")}
            className="text-gray-400 text-xs hover:text-gray-700 transition"
          >
            📄 내 문의 내역
          </button>
        </div>
      </div>
    </div>
  );
}
