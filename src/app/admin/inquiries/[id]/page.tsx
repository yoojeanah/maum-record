"use client";

// @/app/admin/inquiries/[id]/page.tsx
// 관리자 페이지 1:1 문의사항 상세 페이지

import { MailOpen, Send } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { authRequest } from "@/lib/axiosInstance";
import { useParams, useRouter } from "next/navigation";

// 백엔드 응답 구조
type InquiryDetailResponse = {
  inquiry: {
    id: number;
    email: string;
    title: string;
    message: string;
    file?: string;
    date: string;
    status: "PENDING" | "ANSWERED";
  };
  answer?: {
    id: number;
    title: string;
    content: string;
    answeredAt: string;
  };
};

// 프론트에서 렌더링에 사용하는 구조
type InquiryDetail = {
  id: number;
  email: string;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
  status: "PENDING" | "ANSWERED";
  answer?: string;
  answeredAt?: string;
};

function InquiryDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [inquiryDetail, setInquiryDetail] = useState<InquiryDetail | null>(
    null
  );
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    const fetchInquiryDetail = async () => {
      try {
        const res = await authRequest.get<InquiryDetailResponse>(
          `/admin/inquiries/${params.id}`
        );
        const data = res.data;

        // 백엔드 응답을 프론트용 타입으로 가공
        const transformed: InquiryDetail = {
          id: data.inquiry.id,
          email: data.inquiry.email,
          title: data.inquiry.title,
          content: data.inquiry.message,
          imageUrl: data.inquiry.file,
          createdAt: data.inquiry.date,
          status: data.inquiry.status,
          answer: data.answer?.content,
          answeredAt: data.answer?.answeredAt,
        };

        setInquiryDetail(transformed);
      } catch (err) {
        console.error("문의사항 상세 데이터 불러오기 실패", err);
        alert("문의사항 상세 데이터 불러오기 실패");
        router.replace("/admin/inquiries");
      }
    };

    fetchInquiryDetail();
  }, [params.id, router]);

  const handleAnswerSubmit = async () => {
    if (!answer.trim()) {
      alert("답변을 입력해 주세요.");
      return;
    }

    try {
      const answeredAt = new Date().toISOString();
      const submittedAnswer = answer;

      await authRequest.post(`/admin/replyAnswer/${params.id}`, {
        message: submittedAnswer,
        answeredAt,
      });

      alert("답변이 등록되었습니다.");
      setAnswer("");
      setInquiryDetail((prev) =>
        prev
          ? {
              ...prev,
              status: "ANSWERED",
              answer: submittedAnswer,
              answeredAt,
            }
          : null
      );
      router.refresh();
    } catch (err) {
      alert("답변 등록에 실패했습니다.");
      console.error(err);
    }
  };

  if (!inquiryDetail) return <p className="p-4">로딩 중...</p>;

  return (
    <div className="p-6">
      <h2 className="inline-flex items-center gap-2 text-2xl font-bold mb-4">
        <MailOpen className="w-8 h-8" />
        1:1 문의 상세
      </h2>
      <div className="bg-white shadow p-4 rounded space-y-3">
        <div>
          <strong>제목:</strong> {inquiryDetail.title}
        </div>
        <div>
          <strong>이메일:</strong> {inquiryDetail.email}
        </div>
        <div>
          <strong>등록일:</strong>{" "}
          {new Date(inquiryDetail.createdAt).toLocaleString()}
        </div>
        <div>
          <strong>문의 내용:</strong>
          <p className="text-gray-800 whitespace-pre-line">
            {inquiryDetail.content}
          </p>

          {inquiryDetail.imageUrl && (
            <div className="mt-4">
              <strong>첨부 파일:</strong>
              <Image
                src={inquiryDetail.imageUrl}
                alt="첨부 이미지"
                width={400}
                height={300}
                className="max-w-sm mt-2 rounded border"
              />
            </div>
          )}
        </div>
      </div>

      {inquiryDetail.status === "ANSWERED" &&
        inquiryDetail.answer &&
        inquiryDetail.answeredAt && (
          <div className="mt-6 bg-gray-50 p-4 rounded shadow space-y-3 border">
            <h4 className="block ml-1 text-md font-bold text-gray-700">
              작성된 답변
            </h4>
            <p className="ml-1 text-gray-800 whitespace-pre-line text-sm">
              {inquiryDetail.answer}
            </p>
            <p className="text-xs text-gray-500 text-right">
              답변일: {new Date(inquiryDetail.answeredAt).toLocaleString()}
            </p>
          </div>
        )}

      <div className="mt-6 bg-white p-4 rounded shadow space-y-3">
        <label
          htmlFor="answer"
          className={`block ml-1 text-md font-bold ${
            inquiryDetail.status === "ANSWERED"
              ? "text-red-500"
              : "text-gray-700"
          }`}
        >
          {inquiryDetail.status === "ANSWERED"
            ? "이미 답변이 등록된 문의입니다. 다시 수정하려면 내용을 입력 후 재등록하세요."
            : "답변 작성"}
        </label>
        <textarea
          id="answer"
          rows={5}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm text-gray-800"
          placeholder="문의하신 내용에 대한 답변을 입력해 주세요."
        />
        <button
          onClick={handleAnswerSubmit}
          disabled={!answer.trim()}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition
          ${
            !answer.trim()
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          <Send className="w-4 h-4" />
          {inquiryDetail.status === "PENDING" ? "답변 등록" : "답변 재등록"}
        </button>
      </div>
    </div>
  );
}

export default InquiryDetailPage;

// mock 데이터로 테스트하려면 아래 주석 해제
// useEffect(() => {
//   // 백엔드 연동 대신 목데이터로 테스트하려면 아래 주석 해제
//   // 실제 API 연동은 위의 fetchInquiryDetail 함수 유지

//   const mock: InquiryDetail = {
//     id: Number(params.id),
//     email: "user1@example.com",
//     title: "앱 실행 시 멈춰요",
//     content: "앱을 켜면 홈 화면에서 멈추는 현상이 발생합니다.",
//     imageUrl: "/mock-images/inquiry-screenshot.png", // or undefined
//     createdAt: "2025-05-16T09:00:00Z",
//     status: "ANSWERED",
//     answer: "앱을 재설치해보시고, 여전히 문제가 발생하면 다시 문의해주세요.",
//     answeredAt: "2025-05-17T13:45:00Z",
//   };

//   setInquiryDetail(mock);
// }, []);
