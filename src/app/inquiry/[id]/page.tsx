"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { publicRequest } from "@/lib/axiosInstance";

interface Inquiry {
  id: number;
  title: string;
  content: string;
  status: string;
  date: string;
  reply: string | null;
  answeredAt?: string;
}

export default function InquiryDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [inquiry, setInquiry] = useState<Inquiry | null>(null);

  useEffect(() => {
    const fetchInquiry = async () => {
      try {
        const res = await publicRequest.get(`/inquiries/${id}`);
        setInquiry(res.data);
      } catch (error) {
        console.error("문의 상세 조회 실패:", error);
        router.push("/404");
      }
    };
    fetchInquiry();
  }, [id]);

  if (!inquiry) {
    return <p className="p-4">로딩 중...</p>;
  }

  const showReply = inquiry.reply !== null;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex justify-center">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-800">문의 상세</h2>
        <h3 className="font-semibold text-gray-800">{inquiry.title}</h3>
        <p className="text-sm text-gray-700 whitespace-pre-wrap">{inquiry.content}</p>

        {showReply ? (
          <div className="bg-gray-100 p-3 rounded text-sm">
            <p className="text-gray-600">📩 관리자 답변</p>
            <p className="mt-1 text-gray-800">{inquiry.reply}</p>
            {inquiry.answeredAt && (
              <p className="text-gray-400 text-xs mt-2">
                답변일시: {inquiry.answeredAt}
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-400">아직 답변이 등록되지 않았습니다.</p>
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
