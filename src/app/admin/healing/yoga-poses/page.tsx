"use client";

// src/app/admin/healing/yoga-poses/page.tsx
// 관리자 페이지 - 전체 요가 포즈 목록 조회 + 수정, 삭제 페이지입니다.

import { Check, Images, Pencil, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { authRequest } from "@/lib/axiosInstance";

// healing 콘텐츠 타입 정의
export type HealingContent = {
  id: string;
  title: string;
  fileUrl: string;
  description: string;
  category: "yogaPose" | "music" | "meditation";
};

export default function YogaPoseManagementPage() {
  const [poses, setPoses] = useState<HealingContent[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "yogaPose" as const,
  });

  // 요가 포즈 목록 조회
  useEffect(() => {
    const fetchYogaPoses = async () => {
      try {
        const res = await authRequest.get<HealingContent[]>(
          "/admin/healing/yogaPose"
        );
        setPoses(res.data);
      } catch (err) {
        alert("요가 포즈 목록 조회 실패");
        console.error(err);
      }
    };
    fetchYogaPoses();
  }, []);

  // 수정 클릭 시 폼 채우기
  const handleEditClick = (pose: HealingContent) => {
    setEditingId(pose.id);
    setForm({
      title: pose.title,
      description: pose.description,
      category: "yogaPose",
    });
  };

  // 수정 저장
  const handleSave = async (id: string) => {
    try {
      const payload = {
        title: form.title,
        description: form.description,
        fileUrl: poses.find((p) => p.id === id)?.fileUrl || "",
      };
      await authRequest.patch(`/admin/healing/update/${id}`, payload);
      setPoses((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...payload } : p))
      );
      setEditingId(null);
    } catch (err) {
      alert("수정에 실패하였습니다.");
      console.error(err);
    }
  };

  // 삭제
  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    try {
      await authRequest.delete(`/admin/healing/delete/${id}`);
      setPoses((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert("삭제에 실패하였습니다.");
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="inline-flex gap-2 items-center text-2xl font-bold mb-4">
          <Images className="w-8 h-8" />
          요가 포즈 관리
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {poses.map((pose) => (
          <div
            key={pose.id}
            className="bg-white p-4 rounded shadow flex flex-col gap-2 h-full"
          >
            {/* fileUrl로 이미지 보여주기 */}
            {/* <Image
              src={pose.fileUrl}
              alt={pose.title}
              width={300}
              height={200}
              className="w-full h-48 object-cover rounded mb-4"
            /> */}

            {/* 미리보기 이미지 박스 */}
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
                업로드 된 파일: {pose.fileUrl?.split("/").pop() || "파일 없음"}
              </div>
            </div>

            {editingId === pose.id ? (
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
                    onClick={() => handleSave(pose.id)}
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
                <h3 className="font-semibold text-lg">{pose.title}</h3>
                <p className="text-sm text-gray-600">{pose.description}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEditClick(pose)}
                    className="flex-1 inline-flex items-center justify-center px-2 py-1 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500"
                  >
                    <Pencil className="w-4 h-5 mr-1" /> 수정
                  </button>
                  <button
                    onClick={() => handleDelete(pose.id)}
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

// useEffect(() => {
//   const mockData: HealingContent[] = [
//     {
//       id: "pose1",
//       title: "산 자세",
//       description: "척추를 곧게 펴고 바르게 서는 기본 자세입니다.",
//       fileUrl: "https://via.placeholder.com/300x200?text=Mountain+Pose",
//       category: "yogaPose",
//     },
//     {
//       id: "pose2",
//       title: "전사 자세",
//       description: "하체 근력을 기르는 데 도움이 되는 자세입니다.",
//       fileUrl: "https://via.placeholder.com/300x200?text=Warrior+Pose",
//       category: "yogaPose",
//     },
//     {
//       id: "pose3",
//       title: "고양이 자세",
//       description: "척추를 유연하게 풀어주는 스트레칭 자세입니다.",
//       fileUrl: "https://via.placeholder.com/300x200?text=Cat+Pose",
//       category: "yogaPose",
//     },
//   ];

//   setPoses(mockData);
// }, []);
