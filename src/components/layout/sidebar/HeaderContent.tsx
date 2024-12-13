import React from "react";
import { Link } from "react-router-dom";

const HeaderContent = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <Link to={"/profilecard"}>
        <h1 className="text-3xl">CardConnect</h1>
      </Link>
    </div>
  );
};

export default HeaderContent;
