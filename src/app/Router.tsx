import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Login from "../features/auth/Login";
import Signup from "../features/auth/Signup";
import ProfileCard from "../features/profile/ProfileCard";
import Account from "@/features/userAccount/Account";
import useAuth from "@/hooks/useAuth";

const Router = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {user ? (
          <>
            <Route path="/" element={<Layout />}>
              <Route path="/profilecard" element={<ProfileCard />} />
              <Route path="/account" element={<Account />} />
            </Route>
          </>
        ) : (
          <Route path="*" element={<Navigate replace to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
