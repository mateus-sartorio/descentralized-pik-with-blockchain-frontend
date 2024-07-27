import React from "react";
import App from "./App";

import './index.css';

import { createRoot } from 'react-dom/client';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import CreateCertificatePage from "./pages/CreateCertificatePage";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
  },
  {
    path: "/create",
    element: <CreateCertificatePage/>
  },
  {
    path: "*",
    element: <ErrorPage/>
  }
]);

const container = document.getElementById('root');

const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);