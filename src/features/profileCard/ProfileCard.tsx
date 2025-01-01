import useAuth from "@/hooks/useAuth";
import { AppDispatch, RootState } from "@/store/store";
import {
  Briefcase,
  Calendar,
  Instagram,
  Laptop,
  MapPinHouse,
  MessageSquareHeart,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileCard } from "./profileCardSlice";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import { QRCodeSVG } from "qrcode.react";
import { supabase } from "@/utils/supabase";

const ProfileCard = () => {
  const profileCard = useSelector((state: RootState) => state.profileCard);
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const [flipped, setFlipped] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    let isMounted = true;

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

          if (!isMounted) return;

          if (existing_token) {
            setToken(existing_token.token);
            console.log(`既存のトークンを使用：${existing_token.token}`);
            return;
          }

          const token = crypto.randomUUID();
          const { error } = await supabase.from("qr_tokens").insert({
            token,
            user_id: user.id,
            created_at: new Date().toISOString(),
            expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
          });

          if (!isMounted) return;

          if (error) throw error;
          setToken(token);
          console.log(`生成されたトークン：${token}`);
        } catch (err) {
          if (!isMounted) return;
          console.error("トークン生成エラー:", err);
        }
      };

      generateToken();

      return () => {
        isMounted = false;
      };
    }
  }, [user, dispatch]);

  if (profileCard.loading || !user) {
    return <LoadingSkeleton />;
  }

  const handleProfileClick = () => {
    setFlipped(!flipped);
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
          <img
            className="object-cover object-center w-full h-56"
            src={profileCard.image_url}
            alt="avatar"
          />

          <div className="flex items-center px-6 py-3 bg-gray-900">
            <Calendar color="white" />
            <h1 className="mx-3 text-base font-medium text-white">
              {profileCard.birth_date}
            </h1>
          </div>

          <div className="flex flex-col px-6 py-4 gap-4">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
              {profileCard.name}
            </h1>

            {/* 職業・所在地 */}
            <div className="flex justify-center gap-5">
              <div className="flex items-center text-gray-700 dark:text-gray-200">
                <MapPinHouse />
                <h1 className="px-2 text-sm">{profileCard.prefecture}</h1>
              </div>
              <div className="flex items-center text-gray-700 dark:text-gray-200">
                <Briefcase />
                <h1 className="px-2 text-sm">{profileCard.job}</h1>
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-gray-700 dark:text-gray-400">
                {profileCard.description}
              </p>
            </div>

            {/* 趣味・スキル */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center text-gray-700 dark:text-gray-200">
                <MessageSquareHeart />
                <h1 className="px-2 text-sm">{profileCard.hobby}</h1>
              </div>
              <div className="flex items-center text-gray-700 dark:text-gray-200">
                <Laptop />
                <h1 className="px-2 text-sm">{profileCard.skill}</h1>
              </div>
            </div>

            <div className="flex items-center text-gray-700 dark:text-gray-200">
              <Instagram />
              <h1 className="px-2 text-sm">{profileCard.instagram}</h1>
            </div>
          </div>
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
