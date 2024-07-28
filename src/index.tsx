import React from "react";

import './index.scss';

import { createRoot } from 'react-dom/client';

import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";

import Layout from "./pages/Layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import CreateCertificatePage from "./pages/CreateCertificatePage/CreateCertificatePage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import LoginPage from "./pages/LoginPage/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <Navigate to="/login" />
      },
      {
        path: "home",
        element: <HomePage/>
      },
      {
        path: "/create",
        element: <CreateCertificatePage/>
      },
      {
        path: "/settings",
        element: <SettingsPage/>
      },
      {
        path: "/about",
        element: <AboutPage/>
      },
    ]
  },
  {
    path: "/login",
    element: <LoginPage/>
  },
  {
    path: "*",
    element: <ErrorPage/>
  },
]);

const container = document.getElementById('root');

const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);