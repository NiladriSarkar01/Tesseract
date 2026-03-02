import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Background from "../components/Background";

const NavLayout = () => {
  return (
    <>
      <Background />
      <Navbar />
      <Outlet />
    </>
  );
};

export default NavLayout;
