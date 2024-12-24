import { ProfileCard } from "@/utils/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState: ProfileCard = {
  name: "",
  birth_date: "",
  prefecture: "",
  job: "",
  description: "",
  hobby: "",
  skill: "",
  image_url: undefined,
  loading: false,
};

export const fetchProfileCard = createAsyncThunk(
  "profileCard/fetchProfileCard",
  async (userId: string) => {}
);
