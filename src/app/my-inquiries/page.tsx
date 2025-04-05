"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MyInquiriesPage() {
  const router = useRouter();
  const [inquiries] = useState([
    {
      id: 1,
      title: "감정 분석 결과가 이상해요",
      content:
        "녹음한 일기에서 분명 행복한 내용을 말했는데, 분석 결과가 우울로 나왔어요.",
      status: "답변 완료",
      date: "2024. 03. 12.",
      reply:
        "분석 알고리즘이 감정 단어 외에도 말투와 맥락을 함께 고려하기 때문에 오차가 발생할 수 있어요. 개선에 참고하겠습니다!",
    },
    {
      id: 2,
      title: "일기 녹음 업로드가 안 돼요",
      content: "오늘 아침에 일기 녹음을 시도했는데, 업로드 중 멈추는 현상이 발생했어요.",
      status: "답변 대기",
      date: "2024. 03. 10.",
      reply: "",
    },
  ]);

  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex justify-center">
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
            {inquiries.map((q) => (
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
                    onClick={() => setSelected(q.id)}
                    className="text-blue-500 hover:underline"
                  >
                    보기
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selected && (
          <div className="mt-6 border-t pt-4">
            {(() => {
              const inquiry = inquiries.find((i) => i.id === selected);
              return (
                inquiry && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-800">{inquiry.title}</h3>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{inquiry.content}</p>
                    {inquiry.reply ? (
                      <div className="bg-gray-100 p-3 rounded text-sm">
                        <p className="text-gray-600">📩 관리자 답변</p>
                        <p className="mt-1 text-gray-800">{inquiry.reply}</p>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400">아직 답변이 등록되지 않았습니다.</p>
                    )}
                  </div>
                )
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}
