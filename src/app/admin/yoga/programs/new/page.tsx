// src/app/admin/yoga/programs/new/page.tsx
// 요가 신규 프로그램 추가
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authRequest } from "@/lib/axiosInstance";
import { ArrowUp, ArrowDown, Plus, Check } from "lucide-react";

type YogaPose = {
  id: string;
  name: string;
  duration: number;
  image: string;
  description: string;
};

type NewProgram = {
  title: string;
  summary: string;
  locked: boolean;
  poses: { id: string; order: number }[];
};

export default function NewYogaProgramPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // 1) 전체 포즈 조회
  const { data: poses, isPending: posesLoading } = useQuery<YogaPose[]>({
    queryKey: ["admin", "yoga", "poses"],
    queryFn: async () => {
      const res = await authRequest.get<YogaPose[]>("/admin/yoga/poses");
      return res.data;
    },

    staleTime: 5 * 60_000,
  });

  // 2) 새 프로그램 생성 mutation
  const createMutation = useMutation({
    mutationFn: (dto: NewProgram) =>
      authRequest.post("/admin/yoga/programs", dto),
    onSuccess: () => {
      // 생성 후 리스트 리패치
      queryClient.invalidateQueries({ queryKey: ["programs"] });
      router.push("/admin/yoga/programs");
    },
    onError: (err) => {
      console.error("프로그램 생성 실패", err);
      alert("프로그램 생성에 실패했습니다.");
    },
  });

  // 3) 폼 state
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [selected, setSelected] = useState<YogaPose[]>([]);
  const locked = true; // 신규 생성 시 항상 locked

  // 4) 포즈 추가 / 제거
  const addPose = (pose: YogaPose) => {
    if (!selected.find((p) => p.id === pose.id)) {
      setSelected((s) => [...s, pose]);
    }
  };
  const removePose = (id: string) => {
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

  // 6) 제출 핸들러
  const handleSubmit = () => {
    if (!title.trim() || !summary.trim() || selected.length === 0) {
      return alert("제목, 요약, 포즈를 모두 입력·선택해주세요.");
    }
    createMutation.mutate({
      title,
      summary,
      locked,
      poses: selected.map((pose, index) => ({
        // index === selected 배열에서 pose가 몇 번째 요소인지 (0부터 시작)을 의미
        // map 함수에서 내부적으로 index 제공
        id: pose.id,
        order: index + 1,
      })),
    });
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
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
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
            <ul className="space-y-2 max-h-96 overflow-auto border rounded p-2">
              {poses!.map((pose) => (
                <li key={pose.id} className="flex justify-between items-center">
                  <span>{pose.name}</span>
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
            <ul className="space-y-2 max-h-96 overflow-auto border rounded p-2">
              {selected.map((pose, i) => (
                <li key={pose.id} className="flex justify-between items-center">
                  <span>
                    {i + 1}. {pose.name}
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

//  Mock Data
// const mockPoses: YogaPose[] = [
//   {
//     id: "pose1",
//     name: "아기 자세",
//     duration: 40,
//     image: "/images/yoga/child.png",
//     description: "긴장을 풀고 마음을 안정시켜 줍니다.",
//   },
//   {
//     id: "pose2",
//     name: "누운 비틀기",
//     duration: 30,
//     image: "/images/yoga/twist.png",
//     description: "허리를 부드럽게 풀어주는 동작입니다.",
//   },
//   // … 추가 mock 포즈
// ];
//  mockPoses를 초기 데이터로 사용 -> 화면 바로 렌더링
// initialData: mockPoses,
