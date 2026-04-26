import { RootState } from "@/app/store";
import { frontendAPI } from "@/config/config";

export const updateProfileImageAPI = async (
  payload: { profileImg: string },
  { getState }: any
) => {
  const state = getState() as RootState;
  const token = state.auth.data?.token || null;

  const res = await fetch(frontendAPI.updateImage, {
    method: "POST", // change to PUT if backend requires
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(payload),
  });

  if (res.status === 401) {
    const error = await res.json();
    throw { code: 401, message: error?.message ?? "Unauthorized" };
  }

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.message ?? "Failed to update profile image");
  }

  return await res.json();
};