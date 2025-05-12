// src/lib/axiosInstance.ts
// 백엔드 API와 통신 시, 중복 코드 줄이고+쉬운 유지보수를 위해서 axios 인스턴스를 생성하는 코드
// 기본 백엔드 URL과 헤더를 설정하는 코드

import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

// 비인증 요청용 axios 인스턴스 (ex. 로그인, 회원가입, 토큰 갱신 등)
export const publicRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // 쿠키를 서버에 자동 포함시키기 위해 true로 설정
});

// 보호된 API instance (로그인 후 접근 시)
export const authRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// 인터셉터 추가 (자동 토큰 재발급)
authRequest.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // 401: 토큰 재발급 시도
    if (
      error.response?.status === 401 &&
      !originalRequest._retry // 같은 요청 중복 재시도 방지
    ) {
      originalRequest._retry = true;
      try {
        const res = await publicRequest.post("/newToken");
        return authRequest(originalRequest); //새 토큰이 발급되었으니, 실패했던 원래 요청을 다시 보냄
      } catch (refreshError) {
        console.error("재로그인 필요: ", refreshError); // refresh token까지 만료되었거나 오류 발생 시 에러 처리

        // 페이지 이동 (router hook 대신 location 사용함)
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    // 403: 권한 없음 → 바로 로그인 페이지로 이동
    if (error.response?.status === 403) {
      console.warn("접근 권한 없음: 로그인 페이지로 이동합니다.");
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
