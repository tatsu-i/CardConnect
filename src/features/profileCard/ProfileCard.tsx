import useAuth from "@/hooks/useAuth";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileCard } from "./profileCardSlice";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import { QRCodeSVG } from "qrcode.react";
import { supabase } from "@/utils/supabase";
import { Link } from "react-router-dom";
import { ScannedProfileCard } from "@/utils/types";
import ProfileCardViewer from "./ProfileCardViewer";

const ProfileCard = () => {
  const profileCard = useSelector((state: RootState) => state.profileCard);
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const [flipped, setFlipped] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (user) {
      dispatch(fetchProfileCard(user.id));

      const generateToken = async () => {
        try {
          const { data: existing_token } = await supabase
            .from("qr_tokens")
            .select("token")
            .eq("user_id", user.id)
            .gt("expires_at", new Date().toISOString())
            .maybeSingle();

          if (existing_token) {
            setToken(existing_token.token);
            // console.log(`既存のトークンを使用：${existing_token.token}`);
            return;
          }

          const token = crypto.randomUUID();
          const { error } = await supabase.from("qr_tokens").insert({
            token,
            user_id: user.id,
            created_at: new Date().toISOString(),
            expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
          });

          if (error) throw error;
          setToken(token);
          // console.log(`生成されたトークン：${token}`);
        } catch (err) {
          if (err instanceof Error) window.alert(err.message);
        }
      };

      generateToken();
    }
  }, [user, dispatch]);

  if (profileCard.loading || !user) {
    return <LoadingSkeleton />;
  }

  if (profileCard.error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8">
        <p className="text-red-500">{profileCard.error}</p>
        <Link
          to="/editprofilecard"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          プロフィールカードを作成する
        </Link>
      </div>
    );
  }

  const handleProfileClick = () => {
    setFlipped(!flipped);
  };

  const profileDataForViewer: ScannedProfileCard = {
    user_id: user!.id,
    name: profileCard.name || null,
    birth_date: profileCard.birth_date || null,
    prefecture: profileCard.prefecture || null,
    job: profileCard.job || null,
    description: profileCard.description || null,
    hobby: profileCard.hobby || null,
    skill: profileCard.skill || null,
    instagram: profileCard.instagram || null,
    image_url: profileCard.image_url || null,
  };

  return (
    <div className="flex flex-col justify-center gap-4">
      <div
        className="relative flex justify-center w-full cursor-pointer"
        onClick={handleProfileClick}
      >
        {/* 表面 */}
        <div
          className={`absolute w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 transition-transform duration-700 backface-hidden ${
            flipped ? "rotate-y-180" : ""
          }`}
        >
          <ProfileCardViewer profileData={profileDataForViewer} />
        </div>

        {/* 裏面 */}
        <div
          className={`absolute w-full max-w-sm h-[400px] overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 transition-transform duration-700 backface-hidden rotate-y-180 ${
            flipped ? "rotate-y-0" : ""
          }`}
        >
          <div className="flex justify-center items-center h-full p-10">
            <QRCodeSVG value={token} size={224} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
