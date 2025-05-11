"use client";

// @/app/admin/inquiries/[id]/page.tsx
// 관리자 페이지 1:1 문의사항 상세 페이지

import { MailOpen, Send } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { authRequest } from "@/lib/axiosInstance";
import withAdminAuth from "@/app/components/auth/withAdminAuth";
import { useParams, useRouter } from "next/navigation";

type InquiryDetail = {
  id: number;
  email: string;
  title: string;
  createdAt: string;
  content: string;
  imageUrl?: string;
  status: "pending" | "answered";
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
    // TODO: mock data (useEffect 내에 넣기)
    const mockInquiry: InquiryDetail = {
      id: Number(params.id),
      email: "yoojin@example.com",
      title: "앱 오류 문의합니다.",
      createdAt: "2025-04-01T10:12:00Z",
      content:
        "명상 프로그램으로 들어가려고 하는데, 이 페이지에서 계속 클릭이 안 돼요.",
      imageUrl: "/mock-images/inquiry-example.png",
      status: "pending",
      answer:
        "안녕하세요. 현재 앱에서 발생한 오류는 확인 중에 있으며, 곧 수정 업데이트가 진행될 예정입니다.\n불편을 드려 죄송합니다.",
      answeredAt: "2025-04-02T14:10:00Z",
    };
    setInquiryDetail(mockInquiry);

    // 백엔드 연동
    // const fetchInquiryDetail = async () => {
    //   try {
    //     const res = await authRequest.get(`/admin/inquiries/${params.id}`);
    //     setInquiryDetail(res.data);
    //   } catch (err) {
    //     console.error("문의사항 상세 데이터 불러오기 실패", err);
    //     alert("문의사항 상세 데이터 불러오기 실패");
    //     router.replace("/admin/inquiries");
    //   }
    // };

    // fetchInquiryDetail();
  }, [params.id, router]);

  // `답변 등록`버튼 클릭 시, 답변 내용 백엔드로 전달
  // 백엔드에서는 답변 내용 저장 + status를 answered로 전환 처리
  const handleAnswerSubmit = async () => {
    // 답변 등록 버튼 클릭 시, 빈 답변인지 확인
    if (!answer.trim()) {
      alert("답변을 입력해 주세요.");
      return;
    }

    try {
      const answeredAt = new Date().toISOString();
      const submittedAnswer = answer;

      const res = await authRequest.post(
        `/admin/inquiries/${params.id}/answer`,
        {
          submittedAnswer,
          answeredAt, // 관리자 답변 시간
        }
      );
      alert("답변이 등록되었습니다.");
      setAnswer("");
      setInquiryDetail(
        (prev) =>
          prev && {
            ...prev,
            status: "answered",
            answer: submittedAnswer,
            answeredAt: answeredAt,
          }
      );
      router.refresh(); // 답변 등록 후 새로고침
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
              <strong>첨부 이미지:</strong>
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
      {inquiryDetail.status === "answered" &&
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
        {inquiryDetail.status === "pending" && (
          <label
            htmlFor="answer"
            className="block ml-1 text-md font-bold text-gray-700"
          >
            답변 작성
          </label>
        )}
        {inquiryDetail.status === "answered" && (
          <label
            htmlFor="answer"
            className="block ml-1 text-md font-bold text-red-500"
          >
            이미 답변이 등록된 문의입니다. 다시 수정하려면 내용을 입력 후
            재등록하세요.
          </label>
        )}
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
          {inquiryDetail.status === "pending" ? "답변 등록" : "답변 재등록"}
        </button>
      </div>
    </div>
  );
}

// TODO: 관리자 페이지 구현 완료시, 관리자 인증 HOC를 추가
// export default withAdminAuth(InquiryDetailPage);
export default InquiryDetailPage;

// mock data (useEffect 내에 넣기)
// const mockInquiry: InquiryDetail = {
//   id: Number(params.id),
//   email: "yoojin@example.com",
//   title: "앱 오류 문의합니다.",
//   createdAt: "2025-04-01T10:12:00Z",
//   content:
//     "명상 프로그램으로 들어가려고 하는데, 이 페이지에서 계속 클릭이 안 돼요.",
//   imageUrl: "/mock-images/inquiry-example.png",
//   status: "pending",
//   answer:
//     "안녕하세요. 현재 앱에서 발생한 오류는 확인 중에 있으며, 곧 수정 업데이트가 진행될 예정입니다.\n불편을 드려 죄송합니다.",
//   answeredAt: "2025-04-02T14:10:00Z",
// };
// setInquiryDetail(mockInquiry);
