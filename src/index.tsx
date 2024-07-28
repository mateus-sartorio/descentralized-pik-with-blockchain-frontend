import React from "react";
import App from "./App";

import './index.css';

import { createRoot } from 'react-dom/client';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Layout from "./pages/Layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import CreateCertificatePage from "./pages/CreateCertificatePage/CreateCertificatePage";
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
        element: <HomePage/>
      },
      {
        path: "/create",
        element: <CreateCertificatePage/>
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