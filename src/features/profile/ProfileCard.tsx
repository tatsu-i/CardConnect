import {
  Briefcase,
  Calendar,
  Instagram,
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
              <svg
                aria-label="location pin icon"
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.063 10.063 6.27214 12.2721 6.27214C14.4813 6.27214 16.2721 8.063 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16757 11.1676 8.27214 12.2721 8.27214C13.3767 8.27214 14.2721 9.16757 14.2721 10.2721Z"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.3941 5.48178 3.79418C8.90918 0.194258 14.6059 0.0543983 18.2059 3.48179C21.8058 6.90919 21.9457 12.606 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.9732 6.93028 5.17326C9.59603 2.37332 14.0268 2.26454 16.8268 4.93029C19.6267 7.59604 19.7355 12.0269 17.0698 14.8268Z"
                />
              </svg>
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
