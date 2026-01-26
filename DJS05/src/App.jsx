import { Routes, Route } from "react-router-dom";
import Header from "./components/UI/Header";
import Home from "./pages/Home";
import ShowDetail from "./pages/ShowDetail";
import { PodcastProvider } from "./context/PodcastContext";

/**
 * Root component of the Podcast Explorer app.
 *
 * - Wraps the application in the `PodcastProvider` for global state management
 * - Renders the `Header` component on all pages
 * - Defines client-side routes using React Router:
 *   - "/" renders the `Home` page
 *   - "/show/:id" renders the `ShowDetail` page for a specific podcast
 *
 * @returns {JSX.Element} The root application component
 */
export default function App() {
  return (
    <PodcastProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/show/:id" element={<ShowDetail />} />
      </Routes>
    </PodcastProvider>
  );
}
