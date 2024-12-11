import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Login from "../features/auth/Login";
import Signup from "../features/auth/Signup";
import AuthWrapper from "../features/auth/AuthWrapper";
import ProfileCard from "../features/profile/ProfileCard";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <AuthWrapper>
              {(user) => (user ? <Layout /> : <Login />)}
            </AuthWrapper>
          }
        >
          <Route path="/profilecard" element={<ProfileCard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
