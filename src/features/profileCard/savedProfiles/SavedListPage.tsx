import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import useAuth from "@/hooks/useAuth";
import { ScannedProfileCard } from "@/utils/types";
import ProfileCardViewer from "../ProfileCardViewer";

const SavedListPage = () => {
  const { user } = useAuth();
  const [savedProfiles, setSavedProfiles] = useState<ScannedProfileCard[]>([]);
  const [selectedProfile, setSelectedProfile] =
    useState<ScannedProfileCard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedProfiles = async () => {
      if (!user) return;

      try {
        const { data: savedList, error: listError } = await supabase
          .from("ProfileCardList")
          .select("saved_profile_id")
          .eq("user_id", user.id);

        if (listError) throw listError;

        const profilePromises = savedList.map(async ({ saved_profile_id }) => {
          const { data: profile, error: profileError } = await supabase
            .from("ProfileCard")
            .select("*")
            .eq("user_id", saved_profile_id)
            .single();

          if (profileError) throw profileError;

          if (profile.image_url) {
            const { data: imageData, error: imageError } =
              await supabase.storage
                .from("profilecard_imgs")
                .download(`private/${profile.image_url}`);

            if (imageError) throw imageError;

            const url = URL.createObjectURL(imageData);
            return { ...profile, image_url: url };
          }

          return profile;
        });

        const profiles = await Promise.all(profilePromises);
        setSavedProfiles(profiles);
      } catch (error) {
        console.error("プロフィールの取得に失敗しました:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedProfiles();
  }, [user]);

  if (loading) {
    return <div>読み込み中...</div>;
  }

  if (selectedProfile) {
    return (
      <div>
        <button
          onClick={() => setSelectedProfile(null)}
          className="mb-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          戻る
        </button>
        <ProfileCardViewer profileData={selectedProfile} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold mb-4">保存したプロフィール</h2>
      {savedProfiles.length === 0 ? (
        <p>保存されたプロフィールはありません</p>
      ) : (
        savedProfiles.map((profile) => (
          <div
            key={profile.user_id}
            className="flex items-center p-4 bg-white rounded-lg shadow cursor-pointer hover:bg-gray-50"
            onClick={() => setSelectedProfile(profile)}
          >
            <img
              src={profile.image_url || undefined}
              alt="プロフィール画像"
              className="object-cover object-center w-28 h-28 rounded-lg"
            />
            <div className="ml-7">
              <p className="text-lg font-semibold">{profile.name}</p>
              <p className="text-sm text-gray-600">{profile.job}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedListPage;
