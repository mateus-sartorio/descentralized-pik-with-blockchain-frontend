import './index.scss';

import {
  Navigate,
  RouterProvider,
  createBrowserRouter
} from "react-router-dom";

import AboutPage from "./pages/AboutPage/AboutPage";
import CertificatePage from "./pages/CertificatePage/CertificatePage";
import CreateCertificatePage from "./pages/CreateCertificatePage/CreateCertificatePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import HomePage from "./pages/HomePage/HomePage";
import Layout from "./pages/Layout/Layout";
import LoginPage from "./pages/LoginPage/LoginPage";
import React from "react";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import { createRoot } from 'react-dom/client';

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
      {
        path: "/certificate/:id",
        element: <CertificatePage/>
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