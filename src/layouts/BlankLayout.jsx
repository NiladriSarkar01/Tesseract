import React from "react";
import { Outlet } from "react-router-dom";
import Background from "../components/Background";

const BlankLayout = () => {
  return (
    <>
      <Background />
      <Outlet />
    </>
  );
};

export default BlankLayout;
