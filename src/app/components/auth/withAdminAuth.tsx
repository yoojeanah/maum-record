// src/app/components/auth/withAdminAuth.tsx
// 관리자 페이지에 누군가가 임의로 접근하지 못하도록 하는 HOC
// 매 페이지 들어갈 때마다, 백엔드에 인증 요청을 보낸다.
// 만약 인증이 실패하면, 로그인 페이지로 리다이렉트한다.

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authRequest } from "@/lib/axiosInstance";

export default function withAdminAuth<T extends {}>(
  Component: React.ComponentType<T>
) {
  return function ProtectedRoute(props: T) {
    const router = useRouter();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
      const verifyAdmin = async () => {
        try {
          await authRequest.get("/admin/auth/check"); // 관리자 인증 API 호출 (백에서 쿠키 확인)
          setChecked(true); // 인증 성공 시 렌더링 허용
        } catch (err) {
          console.error("관리자 인증 실패:", err);
          router.replace("/login"); // 인증 실패 시 로그인 페이지로 이동
        }
      };

      verifyAdmin();
    }, [router]);

    if (!checked) return null; // 인증 확인 전엔 아무것도 렌더링하지 않음

    return <Component {...(props as T)} />;
  };
}
