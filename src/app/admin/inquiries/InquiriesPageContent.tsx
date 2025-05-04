// src/app/admin/inquiries/InquiriesPageContent.tsx

import { authRequest } from "@/lib/axiosInstance";
import { Eye, MailQuestion } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Inquiry = {
  id: number;
  email: string;
  title: string;
  createdAt: string;
  status: "pending" | "answered";
};

export default function InquiriesPageContent() {
  const searchParams = useSearchParams();
  const [allInquiries, setAllInquiries] = useState<Inquiry[]>([]);
  const [filteredInquiries, setFilteredInquiries] = useState<Inquiry[]>([]);

  const router = useRouter();
  const filter = searchParams.get("filter"); // null 혹은 pending

  useEffect(() => {
    // 백엔드 연동
    const fetchInquiries = async () => {
      try {
        const res = await authRequest.get("/admin/inquiries");
        setAllInquiries(res.data);
      } catch (err) {
        console.error("문의사항 데이터 불러오기 실패: ", err);
        alert("문의사항 데이터 불러오기 실패");
      }
    };
    fetchInquiries();
  }, []);

  // 필터 적용: 미답변(pending) 건만 필터링해서 state 변수 filteredInquiries에 저장
  useEffect(() => {
    if (filter === "pending") {
      setFilteredInquiries(
        allInquiries.filter((inq) => inq.status === "pending")
      );
    } else {
      setFilteredInquiries(allInquiries);
    }
  }, [searchParams, allInquiries, filter]);

  // 쿼리 업데이트 함수: '미답변만 보기' 버튼 클릭 시 URL 쿼리 갱신
  const handleFilterClick = (filter: string | null) => {
    const url = filter
      ? `/admin/inquiries?filter=${filter}`
      : "/admin/inquiries";
    router.push(url);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="inline-flex items-center gap-2 text-2xl font-bold mb-4">
          <MailQuestion className="w-8 h-8" />
          1:1 문의 목록
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => handleFilterClick(null)}
            className={`px-3 py-1 rounded-lg border hover:bg-blue-500 hover:text-white transition ${
              !filter ? "bg-blue-600 text-white" : "bg-white text-gray-700"
            }`}
          >
            전체 보기
          </button>
          <button
            onClick={() => handleFilterClick("pending")}
            className={`px-3 py-1 rounded-lg border hover:bg-red-400 hover:text-white transition ${
              filter === "pending"
                ? "bg-red-500 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            미답변만 보기
          </button>
        </div>
      </div>
      <div className="overflow-x-auto border rounded-lg bg-white shadow">
        <table className="min-w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-gray-300 text-gray-700 font-semibold">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">제목</th>
              <th className="px-4 py-3">등록일</th>
              <th className="px-4 py-3">상태</th>
              <th className="px-4 py-3">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y text-gray-800">
            {filteredInquiries.map((inq) => (
              <tr key={inq.id}>
                <td className="px-4 py-2">{inq.id}</td>
                <td className="px-4 py-2">{inq.email}</td>
                <td className="px-4 py-2">{inq.title}</td>
                <td className="px-4 py-2">
                  {new Date(inq.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${
                      inq.status === "pending"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {inq.status === "pending" ? "답변 대기" : "답변 완료"}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <Link
                    href={`/admin/inquiries/${inq.id}`}
                    className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-700 text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    <span>상세 보기</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 백엔드 연동 전에 임시로 화면 보고 싶을 때, 위 백연동 코드 주석처리하고, 이 코드를 실행시키세요
//   const mockData: Inquiry[] = [
//     {
//       id: 1,
//       email: "mock1@example.com",
//       title: "캘린더가 안 보여요",
//       createdAt: "2025-04-07T10:12:00Z",
//       status: "pending",
//     },
//     {
//       id: 2,
//       email: "mock2@example.com",
//       title: "명상 프로그램이 멈춰요",
//       createdAt: "2025-04-10T10:12:00Z",
//       status: "answered",
//     },
//     {
//       id: 3,
//       email: "mock2@example.com",
//       title: "요가 프로그램 추가해 주세요",
//       createdAt: "2025-04-10T10:12:00Z",
//       status: "pending",
//     },
//   ];
//   setAllInquiries(mockData);
