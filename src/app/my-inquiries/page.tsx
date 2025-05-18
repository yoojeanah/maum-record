"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { publicRequest } from "@/lib/axiosInstance";
import HamburgerMenu from "@/app/components/HamburgerMenu";

interface Inquiry {
  id: number;
  email: string; // 화면에 표시하지 않음
  title: string;
  message: string;
  file?: string | null;
  date: string;
  status: "PENDING" | "ANSWERED";
}

export default function MyInquiriesPage() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const res = await publicRequest.get("/user/my-inquiries");
        setInquiries(res.data);
      } catch (error) {
        console.error("문의 내역 조회 실패:", error);
      }
    };

    fetchInquiries();
  }, []);

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const datePart = date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const timePart = date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return `${datePart} ${timePart}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex justify-center">
      <HamburgerMenu />
      <div className="w-full max-w-2xl bg-white rounded-xl shadow p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">내 문의 내역</h2>
          <button
            onClick={() => router.push("/inquiry")}
            className="text-sm text-gray-800"
          >
            ✏️ 새 문의 남기기
          </button>
        </div>

        <table className="w-full text-sm border-t">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-2">제목</th>
              <th className="py-2">날짜</th>
              <th className="py-2">상태</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody>
            {inquiries.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-400">
                  문의 내역이 없습니다.
                </td>
              </tr>
            ) : (
              inquiries.map((q) => (
                <tr key={q.id} className="border-b">
                  <td className="py-2">{q.title}</td>
                  <td className="py-2">{formatDate(q.date)}</td>
                  <td className="py-2">
                    {q.status === "ANSWERED" ? (
                      <span className="text-green-600">답변 완료</span>
                    ) : (
                      <span className="text-gray-400">답변 대기</span>
                    )}
                  </td>
                  <td className="py-2 text-right">
                    <button
                      onClick={() => router.push(`/my-inquiries/${q.id}`)}
                      className="text-blue-500 hover:underline"
                    >
                      상세 보기
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
