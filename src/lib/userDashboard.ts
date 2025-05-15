import { authRequest } from "./axiosInstance";

export const getHealingFeedback = async () => {
  const res = await authRequest.get("/dashboard/healing-feedback");
  return res.data;
};

export const getMonthlyEmotion = async () => {
  const res = await authRequest.get("/dashboard/emotion/monthly");
  return res.data;
};

export const getDailyEmotion = async () => {
  const res = await authRequest.get("/dashboard/emotion/daily");
  return res.data;
};

export const getHealingProgramStats = async () => {
  const res = await authRequest.get("/dashboard/healing-programs");
  return res.data;
};
