import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

/**
 * Application entry point.
 *
 * - Initializes the React application using `createRoot`
 * - Wraps the app in `React.StrictMode` for development checks
 * - Wraps the app in `BrowserRouter` to enable client-side routing
 * - Renders the root `App` component
 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
