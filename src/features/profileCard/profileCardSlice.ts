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
        `user_id, name, birth_date, prefecture, job, description, hobby, skill, image_url`
      )
      .eq("user_id", userId)
      .single();

    if (error) throw error;

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
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProfileCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileCard.fulfilled, (state, action) => {
        state.loading = false;
        state.name = action.payload.name || "Your Name";
        state.birth_date = action.payload.birth_date || "Your Birth Date";
        state.prefecture = action.payload.prefecture || "Your Living";
        state.job = action.payload.job || "Your Job";
        state.description = action.payload.description || "Your Description";
        state.hobby = action.payload.hobby || "Your hobby";
        state.skill = action.payload.skill || "Your Skill";
        state.image_url = action.payload.image_url;
      })
      .addCase(fetchProfileCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "エラーが発生しました";
      });
  },
});

export default profileCardSlice.reducer;
