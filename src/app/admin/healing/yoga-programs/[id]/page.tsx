// src/app/admin/healing/yoga-programs/[id]/page.tsx
// 요가 프로그램 수정 페이지
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authRequest } from "@/lib/axiosInstance";
import { ArrowUp, ArrowDown, Check, Plus } from "lucide-react";

// 타입 정의
interface YogaPose {
  id: number;
  title: string;
}

interface ProgramPose {
  elementId: number;
  poseId: number;
  time: number;
}

interface YogaProgramDetail {
  title: string;
  description: string;
  poses: ProgramPose[];
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
  const [description, setDescription] = useState("");
  const [selected, setSelected] = useState<ProgramPoseWithTitle[]>([]);

  interface ProgramPoseWithTitle extends ProgramPose {
    title: string;
  }

  // 전체 포즈 조회
  const { data: poses = [] } = useQuery<YogaPose[]>({
    queryKey: ["admin", "yoga", "poses"],
    queryFn: async () => {
      const res = await authRequest.get("/admin/healing/yogaPose");
      return res.data;
    },
    staleTime: 5 * 60_000,
  });

  // 기존 프로그램 조회
  const { data: programData } = useQuery<YogaProgramDetail>({
    queryKey: ["admin", "yoga", "program", id],
    queryFn: async () => {
      const res = await authRequest.get(
        `/admin/healing/yoga/courses/${decodeURIComponent(id)}`
      );
      return res.data;
    },
    staleTime: 60_000,
  });

  // 데이터 초기화
  useEffect(() => {
    if (programData && poses.length > 0) {
      setTitle(programData.title);
      setDescription(programData.description);

      const withTitles = programData.poses.map((p) => {
        const matched = poses.find((pose) => pose.id === p.poseId);
        return { ...p, title: matched?.title || "제목 없음" };
      });
      setSelected(withTitles);
    }
  }, [programData, poses]);

  const addPose = (pose: YogaPose) => {
    if (!selected.find((p) => p.poseId === pose.id)) {
      setSelected((s) => [
        ...s,
        {
          elementId: Date.now(),
          poseId: pose.id,
          time: 30,
          title: pose.title,
        },
      ]);
    }
  };

  const removePose = (elementId: number) => {
    setSelected((s) => s.filter((p) => p.elementId !== elementId));
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newList = [...selected];
    [newList[index - 1], newList[index]] = [newList[index], newList[index - 1]];
    setSelected(newList);
  };

  const moveDown = (index: number) => {
    if (index === selected.length - 1) return;
    const newList = [...selected];
    [newList[index + 1], newList[index]] = [newList[index], newList[index + 1]];
    setSelected(newList);
  };

  const updateTime = (elementId: number, time: number) => {
    setSelected((s) =>
      s.map((p) => (p.elementId === elementId ? { ...p, time } : p))
    );
  };

  const updateMutation = useMutation({
    mutationFn: (payload: {
      title: string;
      description: string;
      poses: { elementId: number; time: number }[];
    }) => authRequest.patch("/admin/healing/yoga/update", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "yoga", "program"] });
      router.push("/admin/healing/yoga-programs");
    },
    onError: (err) => {
      console.error("수정 실패", err);
      alert("수정에 실패했습니다.");
    },
  });

  const handleSubmit = () => {
    if (!title.trim() || !description.trim() || selected.length === 0) {
      return alert("제목, 설명, 포즈를 모두 입력해주세요");
    }
    updateMutation.mutate({
      title,
      description,
      poses: selected.map(({ elementId, time }) => ({ elementId, time })),
    });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">요가 프로그램 수정</h1>
      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">설명</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={3}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="font-semibold mb-2">전체 포즈</h2>
          <ul className="space-y-2 border rounded p-2">
            {poses.map((pose) => (
              <li key={pose.id} className="flex justify-between items-center">
                <span>{pose.title}</span>
                <button
                  onClick={() => addPose(pose)}
                  disabled={!!selected.find((p) => p.poseId === pose.id)}
                  className="px-2 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" /> 추가
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-2">선택된 포즈</h2>
          {selected.length === 0 ? (
            <p className="text-gray-500">추가된 포즈 없음</p>
          ) : (
            <ul className="space-y-2 border rounded p-2">
              {selected.map((pose, index) => (
                <li key={pose.elementId} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span>
                      {index + 1}. {pose.title}
                    </span>
                    <div className="flex gap-1">
                      <button onClick={() => moveUp(index)}>
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button onClick={() => moveDown(index)}>
                        <ArrowDown className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removePose(pose.elementId)}
                        className="text-red-500"
                      >
                        <Check className="w-4 h-4" /> 제거
                      </button>
                    </div>
                  </div>
                  <div className="text-sm">
                    시간(초):
                    <input
                      type="number"
                      value={pose.time}
                      onChange={(e) =>
                        updateTime(pose.elementId, Number(e.target.value))
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

      <div className="text-right">
        <button
          onClick={handleSubmit}
          disabled={updateMutation.isPending}
          className="inline-flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          <Check className="w-5 h-5" /> 수정 완료
        </button>
      </div>
    </div>
  );
}

// MOCK 데이터로 대체
// const poses: YogaPose[] = [
//   { id: 1, title: "다운독" },
//   { id: 2, title: "코브라 자세" },
//   { id: 3, title: "전사 자세" },
//   { id: 4, title: "삼각형 자세" },
//   { id: 5, title: "나무 자세" },
//   { id: 6, title: "어깨 서기 자세" },
//   { id: 7, title: "다리 찢기 자세" },
//   { id: 8, title: "고양이 자세" },
//   { id: 9, title: "아이언맨 자세" },
//   { id: 10, title: "비둘기 자세" },
//   { id: 11, title: "앉은 자세" },
//   { id: 12, title: "앉은 비둘기 자세" },
//   { id: 13, title: "앉은 고양이 자세" },
//   { id: 14, title: "앉은 나무 자세" },
//   { id: 15, title: "앉은 전사 자세" },
// ];

// // MOCK 데이터: 기존 프로그램
// const programData: YogaProgramDetail = {
//   title: "아침 기상 요가",
//   description: "상쾌한 하루를 여는 스트레칭 루틴",
//   poses: [
//     { elementId: 1001, poseId: 1, time: 30 },
//     { elementId: 1002, poseId: 2, time: 40 },
//     { elementId: 1003, poseId: 3, time: 50 },
//     { elementId: 1004, poseId: 4, time: 60 },
//     { elementId: 1005, poseId: 5, time: 70 },
//     { elementId: 1006, poseId: 6, time: 80 },
//     { elementId: 1007, poseId: 7, time: 90 },
//     { elementId: 1008, poseId: 8, time: 100 },
//     { elementId: 1009, poseId: 9, time: 110 },
//     { elementId: 1010, poseId: 10, time: 120 },
//   ],
// };
