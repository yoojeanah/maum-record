"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { authRequest } from "@/lib/axiosInstance";

type UserContextType = {
  nickname: string;
  setNickname: (nickname: string) => void;
  profileImage: string;
  setProfileImage: (profileImage: string) => void;
  role: string;
  setRole: (role: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
  children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const [nickname, setNickname] = useState("");
  const [profileImage, setProfileImage] = useState("/profile-default.png");
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await authRequest.get("/users/me");
        setNickname(res.data.nickname || "");
        setProfileImage(res.data.profileImage || "/profile-default.png");
        setRole(res.data.role || "");
      } catch (err) {
        console.error("❌ 사용자 정보 불러오기 실패:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        nickname,
        setNickname,
        profileImage,
        setProfileImage,
        role,
        setRole,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
