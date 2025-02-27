export interface SignupLoginFormInput {
  email: string;
  password: string;
}

export interface UserAccount {
  username?: string;
  icon?: FileList;
}

export interface UserInfo {
  user_id: string;
  username?: string;
  avatar_url?: string;
  updated_at: string;
}

export interface UserAccountState {
  username: string;
  avatar_url: string;
  iconUrl: string;
  loading: boolean;
  error: string | null;
}

export interface ProfileCardTable {
  user_id: string;
  name: string | null;
  birth_date: string | null;
  prefecture: string | null;
  job: string | null;
  description: string | null;
  hobby: string | null;
  skill: string | null;
  instagram: string | null;
  image_url: string | null;
  updated_at: string;
}

export interface ProfileCardState {
  name: string;
  birth_date: string;
  prefecture: string;
  job: string;
  description: string;
  hobby: string;
  skill: string;
  instagram: string;
  image_url?: string;
  loading: boolean;
  error: string | null;
}

export type ScannedProfileCard = Omit<ProfileCardTable, "updated_at">;

export type ProfileCardUpdate = Partial<Omit<ProfileCardTable, "user_id">> & {
  user_id: string;
};
