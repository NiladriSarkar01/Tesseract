import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Background from "../components/Background";
import { CyberLoader, TesseractLoader } from "../components/Loader";
import ScrollToTop from "../components/ScrollToTop";

const PublicLayout = () => {
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading time (optional)
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2500); // 1.5 sec loader

    return () => clearTimeout(timer);
  }, []);

  if (initialLoading) {
    return (
      <>
        <Background />
        <div className="flex items-center justify-center min-h-screen">
          <CyberLoader />
        </div>
      </>
    );
  }

  return (
    <>
      <ScrollToTop />
      <Background />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicLayout;
