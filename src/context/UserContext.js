"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { authRequest } from "@/lib/axiosInstance"; // 토큰 포함된 axios 인스턴스 사용

const UserContext = createContext();

export function UserProvider({ children }) {
  const [nickname, setNickname] = useState("");
  const [profileImage, setProfileImage] = useState("/profile-default.png");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await authRequest.get("/api/users/me"); // 백엔드에서 유저 정보 불러오기
        setNickname(res.data.nickname || ""); // 기본값 대비 처리
        setProfileImage(res.data.profileImage || "/profile-default.png"); // 프로필 이미지 키 확인 필요
      } catch (err) {
        console.error("❌ 사용자 정보 불러오기 실패:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ nickname, setNickname, profileImage, setProfileImage }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
