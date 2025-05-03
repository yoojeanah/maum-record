"use client";

// src/app/admin/yoga/poses/page.tsx
// 관리자 페이지 - 전체 요가 포즈 목록 조회 + 신규 포즈 등록, 수정, 삭제 페이지입니다.

import { Check, Images, Pencil, Plus, Timer, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { authRequest } from "@/lib/axiosInstance";

// yoga 사진 type 정의
export type YogaPose = {
  id: string;
  name: string;
  duration: number;
  image: string;
  description: string;
};

export default function YogaPoseManagementPage() {
  const [poses, setPoses] = useState<YogaPose[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", description: "", duration: 30 });
  const [showModal, setShowModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // 1) 초기 목록 조회 (GET /admin/yoga/poses)
  useEffect(() => {
    const fetchPosesList = async () => {
      try {
        const res = await authRequest.get<YogaPose[]>("/admin/yoga/poses");
        setPoses(res.data);
      } catch (err) {
        alert("요가 포즈 목록 데이터 불러오기에 실패");
        console.error("요가 포즈 목록 불러오기 실패", err);
      }
    };
    fetchPosesList();
  }, []);

  // 기존에 있는 YogaPose 를 수정하는 버튼 클릭 시
  const handleEditClick = (pose: any) => {
    setEditingId(pose.id);
    setForm({
      name: pose.name,
      description: pose.description,
      duration: pose.duration,
    });
  };

  // 2) 수정 저장 (PUT /admin/yoga/poses/:id) : 기존에 있는 YogaPose 를 수정 후 저장 버튼 클릭 시
  const handleSave = async (id: string) => {
    try {
      const payload = {
        name: form.name,
        description: form.description,
        duration: form.duration,
      };
      // 백엔드에 업데이트 요청
      await authRequest.put(`admin/yoga/poses/${id}`, payload);
      // 로컬 상태에도 반영
      setPoses((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...payload } : p))
      );
      setEditingId(null);
    } catch (err) {
      alert("포즈 데이터 수정에 실패했습니다.");
      console.error("포즈 데이터 수정 실패", err);
    }
  };

  // 3) 삭제 (DELETE /admin/yoga/poses/:id): 기존에 있는 YogaPose 삭제 버튼 클릭 시
  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      await authRequest.delete(`admin/yoga/poses/${id}`);
      setPoses((prev) => prev.filter((pose) => pose.id !== id));
    } catch (err) {
      alert("포즈 삭제에 실패했습니다.");
      console.error("포즈 삭제 실패", err);
    }
  };

  // 파일 선택 이벤트
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadedFile(e.target.files?.[0] ?? null);
  };

  // 4) 새로운 pose 추가 시 (POST /admin/yoga/poses + 파일 업로드)
  const handleAddPose = async () => {
    if (!uploadedFile) {
      alert("이미지를 업로드 해주세요.");
      return;
    }
    try {
      // multipart/form-data 로 요청 생성
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("duration", String(form.duration));
      formData.append("image", uploadedFile);

      const res = await authRequest.post<YogaPose>(
        "/admin/yoga/poses",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setPoses((prev) => [...prev, res.data]);
      setShowModal(false);
      setForm({ name: "", description: "", duration: 30 });
      setUploadedFile(null);
    } catch (err) {
      console.error("포즈 추가 실패", err);
      alert("새 포즈 등록에 실패했습니다.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="inline-flex gap-2 items-center text-2xl font-bold mb-4">
          <Images className="w-8 h-8" />
          요가 포즈 관리
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          포즈 추가
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {poses.map((pose) => (
          <div
            key={pose.id}
            className="bg-white p-4 rounded shadow flex flex-col gap-2 h-full"
          >
            <Image
              src={pose.image}
              alt={pose.name}
              width={300}
              height={200}
              className="w-full h-48 object-cover rounded mb-4"
            />

            {editingId === pose.id ? (
              <>
                <input
                  className="w-full border rounded p-1 mb-2"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <textarea
                  className="w-full border rounded p-1 mb-2 flex-grow"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
                <input
                  type="number"
                  className="w-full border rounded p-1 mb-2"
                  value={form.duration}
                  onChange={(e) =>
                    setForm({ ...form, duration: +e.target.value })
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
                <h3 className="font-semibold text-lg">{pose.name}</h3>
                <p className="text-sm text-gray-600">{pose.description}</p>
                <p className="text-sm text-gray-600 flex">
                  <Timer className="w-4 h-4 mr-1" /> {pose.duration}초
                </p>
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

      {/* 모달: 포즈 추가 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-start pt-20 z-50">
          <div className="bg-white w-full max-w-md p-6 rounded shadow-lg relative">
            <h2 className="text-xl font-bold mb-4">새로운 포즈 추가</h2>
            <input
              placeholder="포즈 이름"
              className="w-full border rounded p-2 mb-2"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <textarea
              placeholder="설명"
              className="w-full border rounded p-2 mb-2"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="기본 duration (초)"
              className="w-full border rounded p-2 mb-4"
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: +e.target.value })}
            />
            <div className="border border-dashed rounded-lg p-4 text-sm text-gray-500">
              이미지 드래그 또는 클릭하여 업로드
              <input type="file" className="mt-1" onChange={handleFileChange} />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                취소
              </button>
              <button
                onClick={handleAddPose}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                추가하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Mock Data로 실행해보려면 아래 주석을 해제하시오.
// const mockData: YogaPose[] = [
//   {
//     id: "pose1",
//     name: "아기 자세",
//     duration: 40,
//     image: "/public/mock-images/suryanamaskara-A-2.png",
//     description: "긴장을 풀고 마음을 안정시켜 줍니다.",
//   },
//   {
//     id: "pose2",
//     name: "누운 비틀기",
//     duration: 30,
//     image: "/public/mock-images/suryanamaskara-A-1.png",
//     description: "허리를 부드럽게 풀어주는 동작입니다.",
//   },
// ];
// setPoses(mockData);
