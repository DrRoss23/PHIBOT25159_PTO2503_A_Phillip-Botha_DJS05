import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

/**
 * Application entry point
 * -----------------------
 * Bootstraps the React application and renders
 * the root App component into the DOM.
 *
 * BrowserRouter enables client-side routing
 * throughout the application.
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
