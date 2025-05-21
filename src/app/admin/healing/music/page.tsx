"use client";

// src/app/admin/healing/music/page.tsx
// 음악 감상 콘텐츠 조회 + 수정 + 삭제

import { Check, Music2, Pencil, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { authRequest } from "@/lib/axiosInstance";

export type HealingContent = {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  category: "yogaPose" | "music" | "meditation";
};

export default function MusicContentManagementPage() {
  const [musicItems, setMusicItems] = useState<HealingContent[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "music" as const,
  });

  useEffect(() => {
    const fetchMusicList = async () => {
      try {
        const res = await authRequest.get<HealingContent[]>(
          "/admin/healing/music"
        );
        setMusicItems(res.data);
      } catch (err) {
        alert("음악 목록 조회 실패");
        console.error(err);
      }
    };
    fetchMusicList();
  }, []);

  const handleEditClick = (item: HealingContent) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      description: item.description,
      category: "music",
    });
  };

  const handleSave = async (id: string) => {
    try {
      const payload = {
        title: form.title,
        description: form.description,
        fileUrl: musicItems.find((m) => m.id === id)?.fileUrl || "",
      };
      await authRequest.patch(`/admin/healing/update/${id}`, payload);
      setMusicItems((prev) =>
        prev.map((m) => (m.id === id ? { ...m, ...payload } : m))
      );
      setEditingId(null);
    } catch (err) {
      alert("수정에 실패하였습니다.");
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    try {
      await authRequest.delete(`/admin/healing/delete/${id}`);
      setMusicItems((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      alert("삭제에 실패하였습니다.");
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="inline-flex gap-2 items-center text-2xl font-bold mb-4">
          <Music2 className="w-8 h-8" />
          음악 감상 콘텐츠 관리
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {musicItems.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded shadow flex flex-col gap-2 h-full"
          >
            <div className="w-full h-48 bg-gray-100 rounded relative text-gray-600 text-sm">
              {/* 중앙 로고 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="로고"
                  className="w-16 h-16 opacity-20"
                />
              </div>

              {/* 하단 텍스트 박스 */}
              <div className="absolute bottom-0 left-0 w-full text-center bg-white/70 py-1 rounded-b text-xs text-gray-700">
                🎵 업로드 된 파일:{" "}
                {item.fileUrl.split("/").pop() || "파일 없음"}
              </div>
            </div>

            {editingId === item.id ? (
              <>
                <input
                  className="w-full border rounded p-1 mb-2"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
                <textarea
                  className="w-full border rounded p-1 mb-2 flex-grow"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => handleSave(item.id)}
                    className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded"
                  >
                    <Check className="w-4 h-4" /> 저장
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-300 text-gray-700 rounded"
                  >
                    <X className="w-4 h-4" /> 취소
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEditClick(item)}
                    className="flex-1 inline-flex items-center justify-center px-2 py-1 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500"
                  >
                    <Pencil className="w-4 h-5 mr-1" /> 수정
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex-1 inline-flex items-center justify-center px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> 삭제
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// MOCK DATA 적용
// useEffect(() => {
//   const mockData: HealingContent[] = [
//     {
//       id: "music1",
//       title: "평화의 소리",
//       description: "마음을 안정시켜주는 차분한 음악입니다.",
//       fileUrl: "https://example.com/music/peaceful.mp3",
//       category: "music",
//     },
//     {
//       id: "music2",
//       title: "심호흡 명상",
//       description: "호흡에 집중하도록 도와주는 배경 음악입니다.",
//       fileUrl: "https://example.com/music/breathing.mp3",
//       category: "music",
//     },
//     {
//       id: "music3",
//       title: "아침 햇살",
//       description: "활력을 주는 상쾌한 아침 음악입니다.",
//       fileUrl: "https://example.com/music/morning.mp3",
//       category: "music",
//     },
//   ];

//   setMusicItems(mockData);
// }, []);
