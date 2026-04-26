import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { toast } from "@/hooks/use-toast";
import { updateProfileImageAPI } from "./updateProfileAPI";

interface ProfileState {
  status: "idle" | "loading" | "success" | "failed";
  error: string | null;
}

const initialState: ProfileState = {
  status: "idle",
  error: null,
};

export const updateProfileImageThunk = createAsyncThunk(
  "profile/updateProfileImage",
  async (
    payload: { profileImg: string },
    { getState, rejectWithValue }
  ) => {
    try {
      const response = await updateProfileImageAPI(payload, { getState });
      return response;
    } catch (error: any) {
      return rejectWithValue({
        code: error?.code ?? 500,
        message: error?.message ?? "Something went wrong",
      });
    }
  }
);

const updateProfileSlice = createSlice({
  name: "profileImage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProfileImageThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProfileImageThunk.fulfilled, (state) => {
        state.status = "success";

        toast({
          title: "Profile image updated successfully",
          duration: 1000,
        });
      })
      .addCase(updateProfileImageThunk.rejected, (state, action) => {
        state.status = "failed";

        const errorPayload = action.payload as {
          code?: number;
          message?: string;
        };

        const message =
          errorPayload?.message ?? "Failed to update profile image";

        state.error = message;

        toast({
          title: message,
          variant: "destructive",
          duration: 1000,
        });
      });
  },
});

export default updateProfileSlice.reducer;