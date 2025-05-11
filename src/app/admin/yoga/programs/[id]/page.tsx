// src/app/admin/yoga/programs/[id]/page.tsx
// 관리자 - 기존 요가 프로그램 수정(포즈 선택이나 순서 편집) 페이지
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authRequest } from "@/lib/axiosInstance";
import { ArrowUp, ArrowDown, Plus, Check } from "lucide-react";

// 요가 포즈 타입
type YogaPose = {
  id: string;
  name: string;
  duration: number;
  image: string;
  description: string;
};

// 프로그램에 포함된 포즈 정보 타입
type ProgramPose = {
  id: string;
  order: number;
};

// 수정 대상 요가 프로그램 상세 타입
type YogaProgramDetail = {
  id: number;
  title: string;
  summary: string;
  locked: boolean;
  poses: ProgramPose[];
};

// id 기반으로 mock detail 생성
function getMockProgram(id: string): YogaProgramDetail {
  return {
    id: Number(id),
    title: "아침 기상 요가",
    summary: "상쾌한 하루를 여는 스트레칭 루틴",
    locked: true,
    poses: [
      { id: "pose1", order: 1 },
      { id: "pose2", order: 2 },
      // ...mock order
    ],
  };
}

export default function EditYogaProgramPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const router = useRouter();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [selected, setSelected] = useState<YogaPose[]>([]);
  const locked = true; // 수정 시에도 locked 처리

  // 1) 기존 프로그램 상세 조회
  const {
    data: program,
    isPending: programLoading,
    isError: programError,
  } = useQuery<YogaProgramDetail>({
    queryKey: ["program", id],
    queryFn: async () => {
      const res = await authRequest.get<YogaProgramDetail>(
        `/admin/yoga/programs/${id}`
      );
      return res.data;
    },

    staleTime: 1000 * 60,
  });

  // 2) 전체 요가 포즈 목록 조회
  const { data: poses, isLoading: posesLoading } = useQuery<YogaPose[]>({
    queryKey: ["admin", "yoga", "poses"],
    queryFn: async () => {
      const res = await authRequest.get<YogaPose[]>("/admin/yoga/poses");
      return res.data;
    },

    staleTime: 5 * 60_000,
  });

  // 3) 프로그램 데이터 및 포즈 로딩 후 폼 초기화
  useEffect(() => {
    if (program && poses) {
      setTitle(program.title);
      setSummary(program.summary);
      const ordered = program.poses
        .sort((a, b) => a.order - b.order)
        .map((p) => poses.find((pose) => pose.id === p.id)!)
        .filter(Boolean);
      setSelected(ordered);
    }
  }, [program, poses]);

  // 포즈 추가
  const addPose = (pose: YogaPose) => {
    if (!selected.find((p) => p.id === pose.id)) {
      setSelected((prev) => [...prev, pose]);
    }
  };

  // 포즈 제거
  const removePose = (id: string) => {
    setSelected((prev) => prev.filter((p) => p.id !== id));
  };

  // 순서 위로 이동
  const moveUp = (idx: number) => {
    if (idx === 0) return;
    setSelected((prev) => {
      const arr = [...prev];
      [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
      return arr;
    });
  };

  // 순서 아래로 이동
  const moveDown = (idx: number) => {
    if (idx === selected.length - 1) return;
    setSelected((prev) => {
      const arr = [...prev];
      [arr[idx + 1], arr[idx]] = [arr[idx], arr[idx + 1]];
      return arr;
    });
  };

  // 4) 수정용 mutation
  const updateMutation = useMutation({
    mutationFn: (dto: {
      title: string;
      summary: string;
      locked: boolean;
      poses: ProgramPose[];
    }) => authRequest.put(`/admin/yoga/programs/${id}`, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["programs"] });
      router.push("/admin/yoga/programs");
    },
    onError: (err) => {
      console.error("프로그램 수정 실패", err);
      alert("프로그램 수정에 실패했습니다.");
    },
  });

  // 제출 핸들러
  const handleSubmit = () => {
    if (!title.trim() || !summary.trim() || selected.length === 0) {
      return alert("제목, 요약, 포즈를 모두 입력·선택해주세요.");
    }
    updateMutation.mutate({
      title,
      summary,
      locked,
      poses: selected.map((pose, idx) => ({ id: pose.id, order: idx + 1 })),
    });
  };

  if (programLoading || posesLoading)
    return <p className="p-6 text-center">로딩 중...</p>;
  if (programError)
    return (
      <p className="p-6 text-center text-red-500">프로그램 불러오기 실패</p>
    );

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">요가 프로그램 수정</h1>
      {/* 제목, 요약 입력 */}
      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">프로그램 제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">요약</label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={3}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* 전체 포즈 리스트 */}
        <div>
          <h2 className="font-semibold mb-2">전체 포즈 목록</h2>
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
        </div>
        {/* 선택된 포즈 및 순서 조정 */}
        <div>
          <h2 className="font-semibold mb-2">선택된 포즈 (순서 조정)</h2>
          {selected.length === 0 ? (
            <p className="text-gray-500">아직 추가된 포즈가 없습니다.</p>
          ) : (
            <ul className="space-y-2 max-h-96 overflow-auto border rounded p-2">
              {selected.map((pose, idx) => (
                <li key={pose.id} className="flex justify-between items-center">
                  <span>
                    {idx + 1}. {pose.name}
                  </span>
                  <div className="flex items-center gap-1">
                    <button onClick={() => moveUp(idx)} className="p-1">
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button onClick={() => moveDown(idx)} className="p-1">
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

      {/* 수정 완료 버튼 */}
      <div className="text-right">
        <button
          onClick={handleSubmit}
          disabled={updateMutation.isPending}
          className="inline-flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          <Check className="w-5 h-5" />
          {updateMutation.isPending ? "수정 중..." : "수정 완료"}
        </button>
      </div>
    </div>
  );
}

// mock
// queryFn: () => Promise.resolve(getMockProgram(id)),
// initialData: getMockProgram(id),

// === Mock Data ===
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
//   // ...추가 mock 포즈
// ];

//     queryFn: () => Promise.resolve(mockPoses),
//     initialData: mockPoses,
