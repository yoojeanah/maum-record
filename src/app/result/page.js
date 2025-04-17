"use client";
import { useEffect, useState } from "react";
import ResultPage from "@/components/ResultPage";
import { publicRequest } from "@/lib/axiosInstance";

export default function Page() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await publicRequest.get("/api/diary/today");
        setResult(res.data);
      } catch (err) {
        console.error("결과 조회 실패:", err);
      }
    };
    fetchResult();
  }, []);

  if (!result) {
    return <div className="text-center mt-32 text-gray-400">결과를 불러오는 중입니다...</div>;
  }

  return (
    <ResultPage
      longSummary={result.longSummary}
      emotion={result.emotion}
      positive={result.positive}
      negative={result.negative}
    />
  );
}
