import { supabase } from "@/utils/supabase";
import { UserAccountState } from "@/utils/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: UserAccountState = {
  username: "",
  avatar_url: "",
  iconUrl: "",
  loading: false,
  error: null,
};

export const fetchUserAccount = createAsyncThunk(
  "userAccount/fetchUserAccount",
  async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select(`username, avatar_url`)
      .eq("id", userId)
      .single();

    if (error) throw error;

    if (data.avatar_url) {
      const { data: imageData, error: imageError } = await supabase.storage
        .from("icons")
        .download(`private/${data.avatar_url}`);

      if (imageError) throw imageError;

      const url = URL.createObjectURL(imageData);
      return {
        ...data,
        iconUrl: url,
      };
    }

    return {
      ...data,
      iconUrl: "",
    };
  }
);

const userAccountSlice = createSlice({
  name: "userAccount",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.username = action.payload.username || "UserName";
        state.avatar_url = action.payload.avatar_url || "";
        state.iconUrl = action.payload.iconUrl;
      })
      .addCase(fetchUserAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "エラーが発生しました";
      });
  },
});

export default userAccountSlice.reducer;
