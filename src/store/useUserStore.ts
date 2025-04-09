import { create } from 'zustand';

type UserState = {
  isLoggedIn: boolean;
  userId: string;         // 이메일
  nickname: string;
  profileImage: string;

  setUserInfo: (data: {
    userId: string;
    nickname: string;
    profileImage: string;
  }) => void;

  logout: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  isLoggedIn: false,
  userId: '',
  nickname: '',
  profileImage: '',

  setUserInfo: ({ userId, nickname, profileImage }) =>
    set({
      isLoggedIn: true,
      userId,
      nickname,
      profileImage,
    }),

  logout: () =>
    set({
      isLoggedIn: false,
      userId: '',
      nickname: '',
      profileImage: '',
    }),
}));
