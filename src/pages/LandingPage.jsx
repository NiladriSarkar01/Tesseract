import React from "react";

import EventsSection from "../components/EventsSection.jsx";
import HeroSection from "../components/HeroSection.jsx";
import CountdownTimer from "../components/CountdownTimer.jsx";
import Map from "../components/Map.jsx";
import Merch from "../components/Merch.jsx";
import About from "../components/About.jsx";
import Ribbon from "../components/Ribbon.jsx";
import VibeCheck from "../components/VibeCheck.jsx";

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <CountdownTimer />
      <EventsSection />
      <About />
      <Ribbon />
      <Merch />
      <Map />
      <Ribbon />
      <VibeCheck />
    </>
  );
};

export default LandingPage;
