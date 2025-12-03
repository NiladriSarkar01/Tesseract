import React from "react"
import { Routes, Route } from "react-router-dom"

import LandingPage from "./pages/LandingPage.jsx"

import RegisterPage from "./pages/RegisterPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import ContactPage from "./pages/ContactPage.jsx"
import AboutPage from "./pages/AboutPage.jsx"
import EventsPage from "./pages/EventsPage.jsx"
import Footer from "./components/Footer.jsx"
import Navbar from "./components/Navbar.jsx"
import Team from "./pages/Team.jsx"
import Background from "./components/Background.jsx"
import GalleryPage from "./pages/GalleryPage.jsx"
import AdminDashboard from "./pages/DashBoardPage.jsx"
import Test from "./pages/test.jsx"
import VideoTeaser from "./components/VideoTeaser.jsx"

function App() {

  return (
    <div>
    <Background/>
      <Navbar/>
      <Routes>
        <Route path="/test" element = {<Test/>} />
        <Route path="/" element = {<LandingPage/>} />
        <Route path="/teaser" element = {<VideoTeaser/>} />
        <Route path="/events" element = {<EventsPage/>} />
        <Route path="/register" element = {<RegisterPage/>} />
        <Route path="/admin/login" element = {<LoginPage/>} />
        <Route path="/admin/dashboard" element = {<AdminDashboard/>} />
        <Route path="/contact" element = {<ContactPage/>} />
        <Route path="/about" element = {<AboutPage/>} />
        <Route path="/team" element = {<Team/>} />
        <Route path="/gallery" element = {<GalleryPage/>} />
      </Routes>
      <Footer/>

    </div>
  )
}

export default App
