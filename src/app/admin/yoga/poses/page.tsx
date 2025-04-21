"use client";

// src/app/admin/yoga/poses/page.tsx
// 관리자 페이지 - 요가 포즈 개별 등록, 수정, 삭제 페이지입니다.

import { Check, Images, Pencil, Plus, Timer, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

// yoga 사진 type 정의
export type YogaPose = {
  id: string;
  name: string;
  duration: number;
  image: string;
  description: string;
};

export default function YogaPoseListPage() {
  const [poses, setPoses] = useState<YogaPose[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", description: "", duration: 30 });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // TODO: 백엔드 연동

    const mockData: YogaPose[] = [
      {
        id: "pose1",
        name: "아기 자세",
        duration: 40,
        image: "/public/mock-images/suryanamaskara-A-2.png",
        description: "긴장을 풀고 마음을 안정시켜 줍니다.",
      },
      {
        id: "pose2",
        name: "누운 비틀기",
        duration: 30,
        image: "/public/mock-images/suryanamaskara-A-1.png",
        description: "허리를 부드럽게 풀어주는 동작입니다.",
      },
    ];
    setPoses(mockData);
  }, []);

  const handleEditClick = (pose: any) => {
    setEditingId(pose.id);
    setForm({
      name: pose.name,
      description: pose.description,
      duration: pose.duration,
    });
  };

  const handleSave = (id: string) => {
    setPoses((prev) => prev.map((p) => (p.id === id ? { ...p, ...form } : p)));
    setEditingId(null);
  };

  const handleAddPose = () => {
    const newPose = {
      id: Date.now().toString(),
      name: form.name,
      description: form.description,
      duration: form.duration,
      image: "/image/yoga/placeholder.png",
    };
    setPoses([...poses, newPose]);
    setShowModal(false);
    setForm({ name: "", description: "", duration: 30 });
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
            className="bg-white p-4 rounded shadow flex flex-col gap-2"
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
                  className="w-full border rounded p-1 mb-2"
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
                <div className="flex gap-2">
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
                  <button className="flex-1 inline-flex items-center justify-center px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">
                    <Trash2 className="w-4 h-4 mr-1" /> 삭제
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-start pt-20 z-50">
          <div className="bg-white w-full max-w-md p-6 rounded shadow-lg relative">
            <h2 className="text-xl font-bold mb-4">새 포즈 추가</h2>
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
              placeholder="지속 시간 (초)"
              className="w-full border rounded p-2 mb-4"
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: +e.target.value })}
            />
            <input type="file" className="mb-4" />
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
