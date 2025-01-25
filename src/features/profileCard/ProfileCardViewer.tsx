import { ScannedProfileCard } from "@/utils/types";
import {
  Briefcase,
  Calendar,
  Instagram,
  Laptop,
  MapPinHouse,
  MessageSquareHeart,
} from "lucide-react";

interface ProfileCardViewerProps {
  profileData: ScannedProfileCard;
}

const ProfileCardViewer = ({ profileData }: ProfileCardViewerProps) => {
  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 transition-transform duration-700 backface-hidden">
        <img
          className="object-cover object-center w-full h-56"
          src={profileData.image_url || undefined}
          alt="avatar"
        />

        <div className="flex items-center px-6 py-3 bg-gray-900">
          <Calendar color="white" />
          <h1 className="mx-3 text-base font-medium text-white">
            {profileData.birth_date}
          </h1>
        </div>

        <div className="flex flex-col px-6 py-4 gap-4">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
            {profileData.name}
          </h1>

          {/* 職業・所在地 */}
          <div className="flex justify-center gap-5">
            <div className="flex items-center text-gray-700 dark:text-gray-200">
              <MapPinHouse />
              <h1 className="px-2 text-sm">{profileData.prefecture}</h1>
            </div>
            <div className="flex items-center text-gray-700 dark:text-gray-200">
              <Briefcase />
              <h1 className="px-2 text-sm">{profileData.job}</h1>
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-gray-700 dark:text-gray-400">
              {profileData.description}
            </p>
          </div>

          {/* 趣味・スキル */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center text-gray-700 dark:text-gray-200">
              <MessageSquareHeart />
              <h1 className="px-2 text-sm">{profileData.hobby}</h1>
            </div>
            <div className="flex items-center text-gray-700 dark:text-gray-200">
              <Laptop />
              <h1 className="px-2 text-sm">{profileData.skill}</h1>
            </div>
          </div>

          <div className="flex items-center text-gray-700 dark:text-gray-200">
            <Instagram />
            <h1 className="px-2 text-sm">{profileData.instagram}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCardViewer;
