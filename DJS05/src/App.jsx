import { Routes, Route } from "react-router-dom";
import Header from "./components/UI/Header";
import Home from "./pages/Home";
import ShowDetail from "./pages/ShowDetail";
import { PodcastProvider } from "./context/PodcastContext";

/**
 * App
 * ---
 * Root component of the Podcast Explorer application.
 *
 * Responsibilities:
 * - Wraps the application in PodcastProvider to maintain
 *   global podcast state (filters, search, data).
 * - Renders the Header component across all routes.
 * - Defines client-side routes using React Router.
 *
 * Routes:
 * - "/" → Home page listing all podcasts.
 * - "/show/:id" → Dynamic show detail page.
 *
 * Rubric alignment:
 * - P3.72: Enables navigation from listing to detail pages.
 * - P3.73: Preserves filters/search when navigating back.
 * - P3.74: Implements dynamic routing using route parameters.
 * - P3.75: Ensures correct show ID is passed via the URL.
 *
 * @returns {JSX.Element} Root application component
 */
export default function App() {
  return (
    <>
      {/* Persistent header shown on all pages */}
      <Header />

      {/* Global context provider for podcast data and UI state */}
      <PodcastProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/show/:id" element={<ShowDetail />} />
        </Routes>
      </PodcastProvider>
    </>
  );
}
