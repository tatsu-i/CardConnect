import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";

const Layout = () => {
  return (
    <>
      <div className="flex">
        <div className="basis-1/4">
          <Sidebar />
        </div>
        <div className="basis-3/4">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
