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
