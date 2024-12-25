export interface SignupLoginFormInput {
  email: string;
  password: string;
}

export interface UserAccount {
  username?: string;
  icon?: FileList;
}

export interface UserInfo {
  id: string;
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

export interface ProfileCard {
  user_id: string;
  name?: string;
  birth_date?: string;
  prefecture?: string;
  job?: string;
  description?: string;
  hobby?: string;
  skill?: string;
  instagram?: string;
  image_url?: string;
  updated_at: string;
}

export interface ProfileCardState {
  name?: string;
  birth_date?: string;
  prefecture?: string;
  job?: string;
  description?: string;
  hobby?: string;
  skill?: string;
  instagram?: string;
  image_url?: string;
  loading: boolean;
  error: string | null;
}
