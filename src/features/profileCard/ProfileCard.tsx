import {
  Briefcase,
  Calendar,
  Instagram,
  Laptop,
  MapPinHouse,
  MessageSquareHeart,
} from "lucide-react";
import React from "react";

const ProfileCard = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <img
          className="object-cover object-center w-full h-56"
          src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
          alt="avatar"
        />

        <div className="flex items-center px-6 py-3 bg-gray-900">
          <Calendar color="white" />
          <h1 className="mx-3 text-base font-medium text-white">2000/01/01</h1>
        </div>

        <div className="flex flex-col px-6 py-4 gap-4">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
            Patterson johnson
          </h1>

          {/* 職業・所在地 */}
          <div className="flex justify-center gap-5">
            <div className="flex items-center text-gray-700 dark:text-gray-200">
              <MapPinHouse />
              <h1 className="px-2 text-sm">東京</h1>
            </div>
            <div className="flex items-center text-gray-700 dark:text-gray-200">
              <Briefcase />
              <h1 className="px-2 text-sm">エンジニア</h1>
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-gray-700 dark:text-gray-400">
              Full Stack maker & UI / UX Designer , love hip hop music Author of
              Building UI.
            </p>
          </div>

          {/* 趣味・スキル */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center text-gray-700 dark:text-gray-200">
              <MessageSquareHeart />
              <h1 className="px-2 text-sm">プログラミング</h1>
            </div>
            <div className="flex items-center text-gray-700 dark:text-gray-200">
              <Laptop />
              <h1 className="px-2 text-sm">TypeScript</h1>
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
