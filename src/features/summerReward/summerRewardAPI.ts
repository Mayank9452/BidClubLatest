import { RootState } from "@/app/store";
import { frontendAPI } from "@/config/config";

export const claimSummerRewardAPI = async (
  participantId: number,
  { getState }
) => {
  const state = getState() as RootState;
  const phone = state.auth.data?.phone || sessionStorage.getItem("user_phone") || "";

  const res = await fetch(frontendAPI.claimSummerReward(phone), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cookie": "bb_session=dqhr7eaat5s24fd5l6akaoljif9efm1a"
    },
    body: "",
  });

  const data = await res.json();

  // Handle Unauthorized
  if (res.status === 401) {
    throw { code: 401, message: data?.message ?? "Unauthorized" };
  }

  // Handle API-level error (status === "error")
  if (data.status === "error") {
    throw { code: 400, message: data?.message ?? "Something went wrong" };
  }

  return data; // success response
};
