// src/app/admin/healing/yoga-programs/new/page.tsx
// 요가 신규 프로그램 추가
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authRequest } from "@/lib/axiosInstance";
import { ArrowUp, ArrowDown, Plus, Check } from "lucide-react";

type YogaPose = {
  id: number;
  title: string;
};

type NewProgramPayload = {
  title: string;
  description: string;
  poses: {
    poseId: number;
    time: number;
  }[];
};

export default function NewYogaProgramPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // 1) 전체 포즈 조회
  const { data: poses, isPending: posesLoading } = useQuery<YogaPose[]>({
    queryKey: ["admin", "yoga", "poses"],
    queryFn: async () => {
      const res = await authRequest.get<YogaPose[]>("/admin/healing/yogaPose");
      return res.data;
    },
    staleTime: 5 * 60_000,
  });

  // 2) 새 프로그램 생성 mutation
  const createMutation = useMutation({
    mutationFn: (dto: NewProgramPayload) =>
      authRequest.post("/admin/healing/yoga/create", dto),
    onSuccess: () => {
      // 생성 후 리스트 리패치
      queryClient.invalidateQueries({ queryKey: ["programs"] });
      router.push("/admin/healing/yoga-programs");
    },
    onError: (err) => {
      console.error("프로그램 생성 실패", err);
      alert("프로그램 생성에 실패했습니다.");
    },
  });

  // 3) 폼 state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selected, setSelected] = useState<
    {
      id: number;
      title: string;
      time: number;
    }[]
  >([]);

  // 4) 포즈 추가 / 제거
  const addPose = (pose: YogaPose) => {
    if (!selected.find((p) => p.id === pose.id)) {
      setSelected((s) => [...s, { id: pose.id, title: pose.title, time: 30 }]);
    }
  };
  const removePose = (id: number) => {
    setSelected((s) => s.filter((p) => p.id !== id));
  };

  // 5) 순서 변경
  const moveUp = (idx: number) => {
    if (idx === 0) return;
    setSelected((s) => {
      const a = [...s];
      [a[idx - 1], a[idx]] = [a[idx], a[idx - 1]];
      return a;
    });
  };
  const moveDown = (idx: number) => {
    if (idx === selected.length - 1) return;
    setSelected((s) => {
      const a = [...s];
      [a[idx + 1], a[idx]] = [a[idx], a[idx + 1]];
      return a;
    });
  };

  const updateTime = (id: number, time: number) => {
    setSelected((s) => s.map((p) => (p.id === id ? { ...p, time } : p)));
  };

  // 6) 제출 핸들러
  const handleSubmit = () => {
    if (!title.trim() || !description.trim() || selected.length === 0) {
      return alert("제목, 설명, 포즈를 모두 입력·선택해주세요.");
    }
    const payload: NewProgramPayload = {
      title,
      description,
      poses: selected.map((p) => ({ poseId: p.id, time: p.time })),
    };
    createMutation.mutate(payload);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">+ 신규 요가 프로그램 등록</h1>

      {/* 폼 입력 */}
      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">프로그램 제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="예) 아침 기상 요가"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">요약</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="예) 상쾌한 하루를 여는 스트레칭 루틴"
            rows={3}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* 좌측: 전체 포즈 목록 */}
        <div>
          <h2 className="font-semibold mb-2">전체 포즈 목록</h2>
          {posesLoading ? (
            <p>로딩 중...</p>
          ) : (
            <ul className="space-y-2 border rounded p-2">
              {poses!.map((pose) => (
                <li key={pose.id} className="flex justify-between items-center">
                  <span>{pose.title}</span>
                  <button
                    onClick={() => addPose(pose)}
                    disabled={!!selected.find((p) => p.id === pose.id)}
                    className="flex items-center gap-1 px-2 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
                  >
                    <Plus className="w-4 h-4" /> 추가
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 우측: 선택된 포즈 & 순서 조정 */}
        <div>
          <h2 className="font-semibold mb-2">선택된 포즈 (순서 조정)</h2>
          {selected.length === 0 ? (
            <p className="text-gray-500">아직 추가된 포즈가 없습니다.</p>
          ) : (
            <ul className="space-y-2 border rounded p-2">
              {selected.map((pose, i) => (
                <li key={pose.id} className="border-b pb-2">
                  <div className="flex justify-between items-center mb-1">
                    <span>
                      {i + 1}. {pose.title}
                    </span>
                    <div className="flex items-center gap-1">
                      <button onClick={() => moveUp(i)} className="p-1">
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button onClick={() => moveDown(i)} className="p-1">
                        <ArrowDown className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removePose(pose.id)}
                        className="p-1 text-red-500"
                      >
                        <Check className="w-4 h-4" /> 제거
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    시간(초):
                    <input
                      type="number"
                      value={pose.time}
                      onChange={(e) =>
                        updateTime(pose.id, Number(e.target.value))
                      }
                      className="ml-2 border rounded px-2 py-1 w-24"
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* 제출 버튼 */}
      <div className="text-right">
        <button
          onClick={handleSubmit}
          disabled={createMutation.isPending}
          className="inline-flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          <Check className="w-5 h-5" />
          {createMutation.isPending ? "등록 중..." : "프로그램 등록"}
        </button>
      </div>
    </div>
  );
}

// Mock 데이터
// const mockPoses: YogaPose[] = [
//   { id: 1, title: "다운독" },
//   { id: 2, title: "코브라 자세" },
//   { id: 3, title: "전사 자세" },
//   { id: 4, title: "아기 자세" },
//   { id: 5, title: "나무 자세" },
//   { id: 6, title: "삼각형 자세" },
//   { id: 7, title: "비둘기 자세" },
//   { id: 8, title: "다리 올리기" },
//   { id: 9, title: "고양이 소 자세" },
//   { id: 10, title: "앉은 전사 자세" },
// ];

// initialData: mockPoses, // Mock 데이터 사용
