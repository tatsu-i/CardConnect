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
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileCard } from "./profileCardSlice";

const ProfileCard = () => {
  const profileCard = useSelector((state: RootState) => state.profileCard);
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      dispatch(fetchProfileCard(user.id));
    }
  }, [user, dispatch]);

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
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
            <h1 className="px-2 text-sm">patterson@example.com</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
