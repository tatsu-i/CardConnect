import React, { type ReactNode } from "react";
import useAuth from "../../hooks/useAuth";
import { User } from "@supabase/supabase-js";

type AuthWrapperProps = {
  children: (user: User | null) => ReactNode;
};

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>読み込み中...</div>;
  }

  return <>{children(user)}</>;
};

export default AuthWrapper;
