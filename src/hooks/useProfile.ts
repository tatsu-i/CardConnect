import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { supabase } from "@/utils/supabase";

const useProfile = () => {
  const [username, setUsername] = useState("");
  const [avatar_url, setAvatar_url] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useAuth();

  const downloadImage = async (path: string) => {
    try {
      const { data, error } = await supabase.storage
        .from("icons")
        .download(`private/${path}`);
      if (error) {
        setErrorMessage(error.message);
      } else {
        const url = URL.createObjectURL(data);
        setIconUrl(url);
        console.log(url);
      }
    } catch (error) {
      if (error instanceof Error) setErrorMessage(error.message);
    }
  };

  const getProfile = async () => {
    if (!user) return;
    setLoading(true);

    const { data, error } = await supabase
      .from("profiles")
      .select(`username, avatar_url`)
      .eq("id", user!.id)
      .single();
    if (error) {
      setErrorMessage(error.message);
    } else if (data) {
      setUsername(data.username || "UserName");
      setAvatar_url(data.avatar_url || "");
      if (data.avatar_url) {
        await downloadImage(data.avatar_url);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    getProfile();
  }, [user]);

  return { username, avatar_url, iconUrl, loading, errorMessage, getProfile };
};

export default useProfile;
