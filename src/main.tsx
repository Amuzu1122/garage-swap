import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import HowItWorks from "./pages/Howitworkspage.tsx";
import SignIn from "./pages/SignIn.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Layout
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/how-it-works",
        element: <HowItWorks/>,
      }
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
