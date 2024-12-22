import React from "react";
import { Outlet } from "react-router-dom";

const MainContent = () => {
  return (
    <div className="p-4">
      <Outlet />
    </div>
  );
};

export default MainContent;
