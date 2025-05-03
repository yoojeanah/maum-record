// src/context/ToastContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import AnalysisToast from "@/app/components/AnalysisToast";
import FeedbackModal from "@/app/components/FeedbackModal";
import { authRequest } from "@/lib/axiosInstance";
import { useUser } from "@/context/UserContext";

interface ToastContextType {
  // 일기 분석을 요청하고 받은 jobId를 세팅하면 내부에서 SSE 구독을 시작함
  setJobId: (jobId: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  // 유저 정보에서 nickname 꺼내오기
  const { user } = useUser();
  const nickname = user?.nickname ?? "마음이";

  const [jobId, _setJobId] = useState<string | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  // 외부에서 호출하는 함수: jobId가 바뀌면 SSE를 구독
  const setJobId = (id: string) => {
    _setJobId(id);
    // 초기화: 혹시 이전에 켜져 있던 토스트가 남아 있다면 닫기
    setShowAnalysis(false);
    setShowFeedback(false);
  };

  // SSE(Server-Sent Events) 구독: jobId가 세팅되면 서버에서 analysisCompleted 이벤트를 기다림
  useEffect(() => {
    if (!jobId) return;

    // TODO: Mock 지우기
    // MOCK 으로 띄워볼 때 사용
    // if (jobId === "MOCK_JOB_ID") {
    //   // 1초 뒤에 바로 분석 완료 띄우기
    //   setTimeout(() => setShowAnalysis(true), 500);
    //   return;
    // }

    const es = new EventSource(`/api/analysis/stream?jobId=${jobId}`);

    es.addEventListener("analysisCompleted", () => {
      // 분석이 완료되었다는 신호가 오면 토스트를 띄우고 SSE 연결은 닫음
      setShowAnalysis(true);
      es.close();
    });
    es.onerror = () => {
      console.error("SSE 연결 오류");
      es.close();
    };
    return () => {
      es.close();
    };
  }, [jobId]);

  // AnalysisToast에서 “결과 보러 가기” 클릭 시 불러질 핸들러
  const handleAnalysisConfirm = () => {
    setShowAnalysis(false);
    setShowFeedback(true);
  };

  // FeedbackModal에서 feedback & categories 선택 후 “👍/👎” 클릭 시
  // 백엔드에 전송하고, 완료되면 /result 페이지로 이동
  const handleFeedbackSubmit = async (
    feedback: string,
    categories: string[]
  ) => {
    try {
      await authRequest.post("/api/analysis/feedback", {
        jobId,
        feedback,
        categories,
      });
      setShowFeedback(false);
      router.push("/result");
    } catch (err) {
      console.error("피드백 전송 실패", err);
      alert("피드백 전송에 실패했습니다.");
    }
  };

  return (
    <ToastContext.Provider value={{ setJobId }}>
      {children}

      {/* 분석 완료 토스트 */}
      {showAnalysis && <AnalysisToast onConfirm={handleAnalysisConfirm} />}

      {/* 피드백 모달 */}
      {showFeedback && (
        <FeedbackModal
          show={true}
          nickname={nickname}
          onSelect={handleFeedbackSubmit}
        />
      )}
    </ToastContext.Provider>
  );
}

// 훅 형태로 만들기
export function useToast(): ToastContextType {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
