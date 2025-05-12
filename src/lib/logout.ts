import { authRequest } from "./axiosInstance";

/**
 * 로그아웃을 처리하는 함수
 * - 백엔드에 로그아웃 요청 (refreshToken 쿠키 삭제)
 * 서비스 페이지 & 관리자 페이지에서 사용
 */
export const logoutUser = async () => {
  try {
    await authRequest.post("/logout");
  } catch (err) {
    console.error("로그아웃 중 오류 발생:", err);
  }
};
