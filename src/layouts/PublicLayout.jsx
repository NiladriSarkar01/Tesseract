import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Background from "../components/Background";
import CyberLoader from "../components/Loader";

const PublicLayout = () => {
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";
  return (
    <>
      <Background />
      <Navbar />
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <CyberLoader />
        </div>
      ) : (
        <Outlet />
      )}
      <Footer />
    </>
  );
};

export default PublicLayout;
