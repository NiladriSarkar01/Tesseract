import React from "react";
import { createBrowserRouter } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ContactPage from "./pages/ContactPage";
import EventsPage from "./pages/EventsPage";
import GalleryPage from "./pages/GalleryPage";
import TeamPage from "./pages/TeamPage";
import VideoTeaser from "./components/VideoTeaser";
import AdminDashboard from "./pages/DashBoardPage";
import NotFoundPage from "./pages/NotFoundPage";
import PublicLayout from "./layouts/PublicLayout";
import BlankLayout from "./layouts/BlankLayout";
import { AdminGuard, GuestGuard } from "./Guards";
import NavLayout from "./layouts/NavLayout";

export const AppRouter = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      { path: "/events", element: <EventsPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/gallery", element: <GalleryPage /> },
    ],
  },

  {
    element: <NavLayout />,
    children: [{ path: "/team", element: <TeamPage /> }],
  },

  {
    element: <BlankLayout />,
    children: [
      {
        path: "/admin/login",
        element: (
          <GuestGuard>
            <LoginPage />
          </GuestGuard>
        ),
      },
      {
        path: "/admin/dashboard",
        element: (
          <AdminGuard>
            <AdminDashboard />
          </AdminGuard>
        ),
      },

      { path: "/teaser", element: <VideoTeaser /> },
      { path: "*", element: <NotFoundPage /> }, // ✅ No Navbar/Footer here
    ],
  },
]);
