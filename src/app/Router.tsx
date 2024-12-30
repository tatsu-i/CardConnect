import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../features/auth/Login";
import Signup from "../features/auth/Signup";
import ProfileCard from "../features/profileCard/ProfileCard";
import EditAccount from "@/features/userAccount/EditAccount";
import useAuth from "@/hooks/useAuth";
import DashBoard from "./DashBoard";
import EditProfileCard from "@/features/profileCard/EditProfileCard";
import QRReader from "@/features/profileCard/QRReader";

const Router = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {user ? (
          <Route element={<DashBoard />}>
            <Route path="/profilecard" element={<ProfileCard />} />
            <Route path="/editprofilecard" element={<EditProfileCard />} />
            <Route path="/editaccount" element={<EditAccount />} />
            <Route path="/qrreader" element={<QRReader />} />
            <Route path="/" element={<Navigate to="/profilecard" replace />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate replace to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
