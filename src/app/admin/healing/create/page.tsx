// src/app/admin/healing-programs/add/page.tsx
"use client";

import { useState } from "react";
import { authRequest } from "@/lib/axiosInstance";

export default function HealingContentCreatePage() {
  const [category, setCategory] = useState<"yogaPose" | "music" | "meditation">(
    "yogaPose"
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !description || !file) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("file", file);

      await authRequest.post("/admin/healing/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("등록이 완료되었습니다.");
    } catch (err) {
      console.error(err);
      alert("오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] bg-gray-50 flex justify-center items-start pt-16 px-4">
      <div className="w-full max-w-xl bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          힐링 콘텐츠 등록
        </h1>

        <div className="flex justify-center gap-2 mb-6">
          <button
            onClick={() => setCategory("yogaPose")}
            className={`px-4 py-2 rounded-md border ${
              category === "yogaPose"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            요가 포즈
          </button>
          <button
            onClick={() => setCategory("music")}
            className={`px-4 py-2 rounded-md border ${
              category === "music"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            음악 감상
          </button>
          <button
            onClick={() => setCategory("meditation")}
            className={`px-4 py-2 rounded-md border ${
              category === "meditation"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            명상
          </button>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            placeholder="설명"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-4 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="file"
            accept={category === "yogaPose" ? "image/*" : "audio/*,video/*"}
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full"
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "등록 중..." : "등록하기"}
          </button>
        </div>
      </div>
    </div>
  );
}
