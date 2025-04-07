import { notFound } from "next/navigation";
import { MailOpen } from 'lucide-react';
import Image from "next/image";

type Params = Promise<{ id: string }>

export default async function InquiryDetailPage({ params }: { params: Params }) {
	const { id } = await params

	// mock data
	const mockInquiry = {
		id,
		title: "앱 오류 문의합니다.",
		email: "yoojin@example.com",
		createdAt: "2025-04-01T10:12:00Z",
		content: "명상 프로그램으로 들어가려고 하는데, 이 페이지에서 계속 클릭이 안 돼요.",
		imageUrl: "/mock-images/inquiry-example.png",
		status: "pending",
	}

	if (!mockInquiry) return notFound();

	return (
		<div className="p-6">
			<h2 className="inline-flex items-center gap-2 text-2xl font-bold mb-4"><MailOpen className="w-8 h-8" />1:1 문의 상세</h2>
			<div className="bg-white shadow p-4 rounded space-y-3">
				<div><strong>제목:</strong> {mockInquiry.title}</div>
				<div><strong>이메일:</strong> {mockInquiry.email}</div>
				<div><strong>등록일:</strong> {new Date(mockInquiry.createdAt).toLocaleString()}</div>
				<div><strong>문의 내용:</strong>
					<p className="text-gray-800 whitespace-pre-line">{mockInquiry.content}</p>
				
				{mockInquiry.imageUrl && (
					<div className="mt-4">
						<strong>첨부 이미지:</strong>
						<Image src={mockInquiry.imageUrl} alt="첨부 이미지" width={400} height={300} className="max-w-sm mt-2 rounded border" />
					</div>
					)}
				</div>
			</div>
		</div>
	)
}
