import React from 'react'

import EventsSection from "../components/EventsSection.jsx"
import VideoSection from '../components/VideoSection.jsx'
// import CountdownTimer from '../DeepCyberBlue/CountdownTimer.jsx'
import CountdownTimer from '../components/CountdownTimer.jsx'
import Map from '../components/Map.jsx'
import Merch from '../components/Merch.jsx'
import About from '../components/About.jsx'
import Ribbon from '../components/Ribbon.jsx'
import VibeCheck from '../components/VibeCheck.jsx'

const LandingPage = () => {
  return (
    <>
        <VideoSection/>
        <CountdownTimer/>
        <EventsSection/>
        <About/>
        <Ribbon/>
        <Merch/>
        <Map/>
        <Ribbon/>
        <VibeCheck/>
    </>

  )
}

export default LandingPage;
