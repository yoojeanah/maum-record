import axios from "axios";

/**
 * 로그아웃을 처리하는 함수
 * 백엔드에 로그아웃 요청
 * 쿠키를 포함하여 요청
 * 서비스 페이지 & 관리자 페이지에서 사용
 */
export const logoutUser = async () => {
	try {
		await axios.post("http://localhost:8080/auth/logout", {}, {
			withCredentials: true, // 쿠키를 포함하여 요청
		});
	} catch (err) {
		console.error("로그아웃 중 오류 발생:", err);
	}
};
