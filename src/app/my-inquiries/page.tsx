"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { publicRequest } from "@/lib/axiosInstance";
import HamburgerMenu from "@/app/components/HamburgerMenu";

interface Inquiry {
  id: number;
  title: string;
  content: string;
  status: string;
  date: string;
  reply: string | null;
  answeredAt?: string;
}

export default function MyInquiriesPage() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const res = await publicRequest.get("/inquiries");
        setInquiries(res.data);
      } catch (error) {
        console.error("문의 내역 조회 실패:", error);
      }
    };

    fetchInquiries();
  }, []);

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
                  <td className="py-2">{q.date}</td>
                  <td className="py-2">
                    {q.status === "답변 완료" ? (
                      <span className="text-green-600">{q.status}</span>
                    ) : (
                      <span className="text-gray-400">{q.status}</span>
                    )}
                  </td>
                  <td className="py-2 text-right">
                    <button
                      onClick={() => router.push(`/inquiry/${q.id}`)}
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
