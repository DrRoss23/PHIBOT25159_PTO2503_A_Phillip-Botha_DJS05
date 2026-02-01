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
 * - Provides global podcast state via PodcastProvider
 * - Renders the persistent Header across all pages
 * - Defines client-side routing using React Router
 *
 * @returns {JSX.Element}
 */
export default function App() {
  return (
    <PodcastProvider>
      {/* Persistent header needs access to context */}
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/show/:id" element={<ShowDetail />} />
      </Routes>
    </PodcastProvider>
  );
}
