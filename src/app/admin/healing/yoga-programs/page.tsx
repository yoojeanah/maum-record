"use client";

import Link from "next/link";
import { Trash2, Pencil } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authRequest } from "@/lib/axiosInstance";

type YogaProgram = {
  id: number;
  title: string;
};

// 1) GET /admin/yoga/programs - 서버에서 전체 요가 프로그램 목록 가져오는 함수
async function fetchYogaPrograms(): Promise<YogaProgram[]> {
  const res = await authRequest.get<YogaProgram[]>(
    "/admin/healing/yoga/courses"
  );
  return res.data;
}

export default function YogaProgramsPage() {
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
    mutationFn: (title: string) =>
      authRequest.delete(
        `/admin/healing/yoga/delete/${encodeURIComponent(title)}`
      ),
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
          href="/admin/healing/yoga-programs/new"
          className="inline-flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + 새 프로그램
        </Link>
      </div>

      {programs!.length === 0 ? (
        <p className="text-gray-500">등록된 프로그램이 없습니다.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {programs.map((program) => (
            <div
              key={program.id}
              className="bg-white p-4 rounded shadow flex flex-col gap-2 h-full"
            >
              {/* 상단 이미지 미리보기 영역 */}
              <div className="w-full h-48 bg-gray-100 rounded mb-4 flex items-center justify-center text-gray-500 text-sm">
                <img
                  src="/logo.png"
                  alt="로고"
                  className="w-16 h-16 opacity-20"
                />
              </div>

              {/* 제목 + 라벨 */}
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">{program.title}</h3>
                <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full">
                  요가 코스
                </span>
              </div>

              {/* 버튼 영역 */}
              <div className="flex gap-2 mt-2">
                <Link
                  href={`/admin/healing/yoga-programs/${program.id}`}
                  className="flex-1 inline-flex items-center justify-center px-2 py-1 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500"
                >
                  <Pencil className="w-4 h-5 mr-1" /> 수정
                </Link>
                <button
                  onClick={() => deleteMutation.mutate(program.title)}
                  className="flex-1 inline-flex items-center justify-center px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  <Trash2 className="w-4 h-4 mr-1" /> 삭제
                </button>
              </div>
            </div>
          ))}
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
//   },
//   {
//     id: 2,
//     title: "오후 집중 요가",
//   },
//   {
//     id: 3,
//     title: "저녁 릴렉스 요가",
//   },
// ];
