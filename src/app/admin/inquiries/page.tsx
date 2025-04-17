"use client";

// src/app/admin/inquiries/page.tsx
// 관리자 페이지 - 1:1 문의 목록 보여주는 페이지
// '미답변만 보기' 버튼 클릭 시, 미답변 문의 사항 목록만 필터링해서 보여줌
// '전체 보기' 버튼 클릭 시, 전체 문의 목록 보여줌
// '상세 보기' 버튼 클릭 시, 각 문의 사항 상세 페이지로 이동

import { Suspense } from "react";
import InquiriesPageContent from "./InquiriesPageContent";

function AdminInquiryPage() {
  return (
    <div className="p-6">
      <Suspense>
        <InquiriesPageContent />
      </Suspense>
    </div>
  );
}
// TODO: 관리자 페이지 구현 완료 시, 관리자 인증 HOC 적용
// export default withAdminAuth(AdminInquiryPage);
export default AdminInquiryPage;
