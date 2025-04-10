"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Eye, MailQuestion } from "lucide-react";
import withAdminAuth from "@/app/components/auth/withAdminAuth";

type Inquiry = {
  id: number;
  email: string;
  title: string;
  createdAt: string;
  status: "pending" | "answered";
};

function AdminInquiryPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  // 임시 mock 데이터
  useEffect(() => {
    const mockData: Inquiry[] = [
      {
        id: 1,
        email: "mock1@example.com",
        title: "캘린더가 안보여요",
        createdAt: "2025-04-07T10:12:00Z",
        status: "answered",
      },
      {
        id: 2,
        email: "mock2@example.com",
        title: "명상 프로그램이 멈춰요",
        createdAt: "2025-04-10T10:12:00Z",
        status: "pending",
      },
    ];
    setInquiries(mockData);
  }, []);

  {
    /*	
	실제 백엔드 연동 시 사용할 fetch

	const fetchInquiries = async () => {
		try {
			const adminToken = localStorage.getItem('accessToken');
			const res = await fetch("http://localhost:8080/admin/inquiries", {
				headers: {
					Authorization: `Bearer ${adminToken}`,
				},
			});
			if (!res.ok) throw new Error("서버 응답 오류");
			const data = await res.json();
			setInquiries(data);
		} catch (err) {
			console.error("1:1 문의 목록을 불러오는 중 오류 발생:", err);
		}
	}
*/
  }

  return (
    <div className="p-6">
      <h2 className="inline-flex items-center gap-2 text-2xl font-bold mb-4">
        <MailQuestion className="w-8 h-8" />
        1:1 문의 목록
      </h2>
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
            {inquiries.map((inq) => (
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
                    <span>상세보기</span>
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
// TODO: 관리자 페이지 구현 완료 시, 관리자 인증 HOC 적용
// export default withAdminAuth(AdminInquiryPage);
export default AdminInquiryPage;
