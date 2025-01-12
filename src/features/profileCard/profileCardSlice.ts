import { supabase } from "@/utils/supabase";
import { ProfileCardState } from "@/utils/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: ProfileCardState = {
  name: "",
  birth_date: "",
  prefecture: "",
  job: "",
  description: "",
  hobby: "",
  skill: "",
  instagram: "",
  image_url: undefined,
  loading: false,
  error: null,
};

export const fetchProfileCard = createAsyncThunk(
  "profileCard/fetchProfileCard",
  async (userId: string) => {
    const { data, error } = await supabase
      .from("ProfileCard")
      .select(
        `user_id, name, birth_date, prefecture, job, description, hobby, skill, instagram, image_url`
      )
      .eq("user_id", userId)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // データが見つからない場合のエラー
        throw new Error("プロフィールカードが作成されていません。");
      }
      throw error;
    }

    if (!data) {
      throw new Error("プロフィールカードが見つかりません。");
    }

    if (data.image_url) {
      const { data: imageData, error: imageError } = await supabase.storage
        .from("profilecard_imgs")
        .download(`private/${data.image_url}`);

      if (imageError) throw imageError;

      const url = URL.createObjectURL(imageData);
      return {
        ...data,
        image_url: url,
      };
    }

    return {
      ...data,
      image_url: "",
    };
  }
);

const profileCardSlice = createSlice({
  name: "profileCard",
  initialState,
  reducers: {
    clearProfileCard: (state) => {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProfileCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileCard.fulfilled, (state, action) => {
        state.loading = false;
        state.name = action.payload.name || "";
        state.birth_date = action.payload.birth_date || "";
        state.prefecture = action.payload.prefecture || "";
        state.job = action.payload.job || "";
        state.description = action.payload.description || "";
        state.hobby = action.payload.hobby || "";
        state.skill = action.payload.skill || "";
        state.instagram = action.payload.instagram || "";
        state.image_url = action.payload.image_url;
        state.error = null;
      })
      .addCase(fetchProfileCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "エラーが発生しました";
      });
  },
});

export const { clearProfileCard } = profileCardSlice.actions;
export default profileCardSlice.reducer;
