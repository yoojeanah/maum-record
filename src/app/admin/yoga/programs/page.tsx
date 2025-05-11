"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Edit2, Trash2, Lock, Unlock } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authRequest } from "@/lib/axiosInstance";

type YogaProgram = {
  id: number;
  title: string;
  summary: string;
  locked: boolean;
};

// 1) GET /admin/yoga/programs - 서버에서 전체 요가 프로그램 목록 가져오는 함수
async function fetchYogaPrograms(): Promise<YogaProgram[]> {
  const res = await authRequest.get<YogaProgram[]>("/admin/yoga/programs");
  return res.data;
}

export default function YogaProgramsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // 2) useQuery: 프로그램 목록을 불러오고 로딩/에러 상태를 관리
  const {
    data: programs, // fetchYogaPrograms의 리턴값을 넣음
    isPending,
    isError,
  } = useQuery({
    queryKey: ["programs"],
    queryFn: fetchYogaPrograms,
    staleTime: 1000 * 60,
  });

  // 3) DELETE /admin/yoga/programs/${id} - useMutation: 삭제 요청 후, 캐시 무효화
  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      authRequest.delete(`/admin/yoga/programs/${id}`),
    onSuccess: () => {
      // 삭제 요청 성공하면, 프로그램 목록을 재요청
      // programs에 저장된 데이터를 무효화 -> 다음 렌더링에서 다시 fetchYogaPrograms 실행하여 최신 정보 업데이트
      queryClient.invalidateQueries({ queryKey: ["programs"] });
    },
    onError: (err) => {
      console.error("요가 프로그램 삭제 실패", err);
      alert("삭제에 실패했습니다.");
    },
  });

  // 4) PUT /admin/yoga/programs/${id} - useMutation: 잠금 토글 요청 후, 캐시 무효화
  const toggleLockMutation = useMutation({
    mutationFn: ({ id, current }: { id: number; current: boolean }) =>
      authRequest.put(`/admin/yoga/programs/${id}`, { locked: !current }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["programs"] });
    },
    onError: (err) => {
      console.error("잠금 상태 변경 실패", err);
      alert("잠금 상태 변경에 실패했습니다.");
    },
  });

  if (isPending) {
    return <p className="p-6 text-center">로딩 중...</p>;
  }
  if (isError) {
    return <p className="p-6 text-center text-red-500">불러오기 실패</p>;
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">요가 프로그램 관리</h2>
        <Link
          href="/admin/yoga/programs/new"
          className="inline-flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + 새 프로그램
        </Link>
      </div>

      {programs!.length === 0 ? (
        <p className="text-gray-500">등록된 프로그램이 없습니다.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">제목</th>
                <th className="px-4 py-2">요약</th>
                <th className="px-4 py-2">잠금</th>
                <th className="px-4 py-2">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {programs!.map((p) => (
                <tr key={p.id}>
                  <td className="px-4 py-2">{p.id}</td>
                  <td className="px-4 py-2">{p.title}</td>
                  <td className="px-4 py-2 line-clamp-2">{p.summary}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() =>
                        toggleLockMutation.mutate({
                          id: p.id,
                          current: p.locked,
                        })
                      }
                      className="inline-flex items-center gap-1"
                      title={p.locked ? "잠금 해제" : "잠금 설정"}
                    >
                      {p.locked ? (
                        <Unlock className="w-5 h-5 text-green-600" />
                      ) : (
                        <Lock className="w-5 h-5 text-red-600" />
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <Link
                      href={`/admin/yoga/programs/${p.id}`}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                    >
                      <Edit2 className="w-4 h-4" /> 수정
                    </Link>
                    <button
                      onClick={() => deleteMutation.mutate(p.id)}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      <Trash2 className="w-4 h-4" /> 삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// mock 모드
// queryFn: () => Promise.resolve(mockPrograms),

// mock 데이터
// const mockPrograms: YogaProgram[] = [
//   {
//     id: 1,
//     title: "아침 기상 요가",
//     summary: "상쾌한 하루를 여는 스트레칭 루틴",
//     locked: true,
//   },
//   {
//     id: 2,
//     title: "오후 집중 요가",
//     summary: "집중력을 높여주는 간단한 동작 모음",
//     locked: false,
//   },
//   {
//     id: 3,
//     title: "저녁 릴렉스 요가",
//     summary: "편안한 숙면을 위한 요가 루틴",
//     locked: true,
//   },
// ];
