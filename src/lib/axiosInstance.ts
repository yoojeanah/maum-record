// src/lib/axiosInstance.ts
// 백엔드 API와 통신 시, 중복 코드 줄이고+쉬운 유지보수를 위해서 axios 인스턴스를 생성하는 코드
// 기본 백엔드 URL과 헤더를 설정하는 코드

import axios from "axios";

const BASE_URL = "http://localhost:8080";

// 기본 instance (로그인/회원가입용 - 토큰 필요 없음)
// 로그인 전
export const publicRequest = axios.create({
	baseURL: BASE_URL,
	withCredentials: true, // 쿠키를 서버에 자동 포함시키기 위해 true로 설정
});

// 보호된 API instance (Authorization 헤더 자동 포함)
export const authRequest = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
});