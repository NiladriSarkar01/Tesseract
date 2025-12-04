import React, { useEffect } from "react";
import { Routes, Route, useLocation, Router } from "react-router-dom";

import LandingPage from "./pages/LandingPage.jsx";

import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import EventsPage from "./pages/EventsPage.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import Background from "./components/Background.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";
import AdminDashboard from "./pages/DashBoardPage.jsx";
import VideoTeaser from "./components/VideoTeaser.jsx";
import TeamPage from "./pages/TeamPage.jsx";

function App() {
  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      // Force browser to scroll AFTER page render
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }, 0);
    }, [pathname]);

    return null;
  }

  return (
    <div>
      <ScrollToTop />
      <Background />
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/teaser" element={<VideoTeaser />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
