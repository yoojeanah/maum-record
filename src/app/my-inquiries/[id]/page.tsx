"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { publicRequest } from "@/lib/axiosInstance";

interface InquiryDetail {
  inquiry: {
    id: number;
    email: string;
    title: string;
    message: string;
    file?: string | null;
    date: string;
    status: "PENDING" | "ANSWERED";
  };
  answer?: {
    id: number;
    title: string;
    content: string;
    answeredAt: string;
  } | null;
}

export default function InquiryDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState<InquiryDetail | null>(null);

  useEffect(() => {
    const fetchInquiry = async () => {
      try {
        const res = await publicRequest.get(`/user/my-inquiries/${id}`);
        setData(res.data);
      } catch (error) {
        console.error("문의 상세 조회 실패:", error);
        router.push("/404");
      }
    };
    fetchInquiry();
  }, [id]);

  if (!data) {
    return <p className="p-4">로딩 중...</p>;
  }

  const { inquiry, answer } = data;

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
      <div className="w-full max-w-2xl bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-800">문의 상세</h2>
        <h3 className="font-semibold text-gray-800">{inquiry.title}</h3>
        <p className="text-sm text-gray-500 mb-1">
          작성일: {formatDate(inquiry.date)}
        </p>
        <p className="text-sm text-gray-700 whitespace-pre-wrap">{inquiry.message}</p>

        {inquiry.file && (
          <div className="text-sm text-blue-500 mt-2">
            📎 첨부파일: <a href={inquiry.file} download className="underline">다운로드</a>
          </div>
        )}

        {answer ? (
          <div className="bg-gray-100 p-4 rounded text-sm mt-4">
            <p className="text-gray-600 font-semibold">📩 관리자 답변</p>
            <p className="text-gray-800 mt-1 whitespace-pre-wrap">{answer.content}</p>
            {answer.answeredAt && (
              <p className="text-gray-400 text-xs mt-2">
                답변일시: {formatDate(answer.answeredAt)}
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-400 mt-4">아직 답변이 등록되지 않았습니다.</p>
        )}

        <button
          onClick={() => router.back()}
          className="text-sm text-blue-600 underline mt-4"
        >
          ← 목록으로 돌아가기
        </button>
      </div>
    </div>
  );
}
