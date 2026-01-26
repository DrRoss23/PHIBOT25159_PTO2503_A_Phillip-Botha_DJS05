import { createContext, useContext, useEffect, useState } from "react";

/**
 * PodcastContext
 *
 * Provides global state for podcast data, filters, search, sorting,
 * and pagination. This context is used across the app to ensure that
 * state is preserved when navigating between pages (e.g. Home → Show Detail → Home).
 */
const PodcastContext = createContext(null);

/**
 * PodcastProvider component.
 *
 * - Fetches the list of podcast previews from the API
 * - Stores the original dataset separately from filtered results
 * - Applies search, filter, and sort logic safely
 * - Exposes state and setters to the rest of the app
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} Context provider wrapper
 */
export function PodcastProvider({ children }) {
  /** Original unmodified podcast list from the API */
  const [initialPodcasts, setInitialPodcasts] = useState([]);

  /** Podcasts after filters, search, and sorting */
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);

  /** Search query string */
  const [searchTerm, setSearchTerm] = useState("");

  /** Selected genre ID (null = all genres) */
  const [selectedGenre, setSelectedGenre] = useState(null);

  /** Sort option (e.g. "title", "updated") */
  const [sortOption, setSortOption] = useState("");

  /** Loading state for data fetch */
  const [isLoading, setIsLoading] = useState(false);

  /** Error message if fetch fails */
  const [error, setError] = useState(null);

  /**
   * Fetch podcast preview data on initial app load.
   */
  useEffect(() => {
    async function fetchPodcasts() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("https://podcast-api.netlify.app");

        if (!response.ok) {
          throw new Error("Failed to fetch podcasts");
        }

        const data = await response.json();

        // Ensure data is always an array
        const safeData = Array.isArray(data) ? data : [];

        setInitialPodcasts(safeData);
        setFilteredPodcasts(safeData);
      } catch (err) {
        setError(err.message);
        setInitialPodcasts([]);
        setFilteredPodcasts([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPodcasts();
  }, []);

  /**
   * Apply search, filter, and sort logic whenever
   * relevant state changes.
   */
  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, selectedGenre, sortOption, initialPodcasts]);

  /**
   * Applies search, genre filtering, and sorting to the podcast list.
   * This function is fully defensive and will never crash the app.
   */
  function applyFilters() {
    // Guard: if data is not ready yet, exit safely
    if (!Array.isArray(initialPodcasts) || initialPodcasts.length === 0) {
      setFilteredPodcasts([]);
      return;
    }

    let results = [...initialPodcasts];

    // Search filter (title match)
    if (searchTerm.trim() !== "") {
      const lowerSearch = searchTerm.toLowerCase();
      results = results.filter((podcast) =>
        podcast.title.toLowerCase().includes(lowerSearch),
      );
    }

    // Genre filter
    if (selectedGenre !== null) {
      results = results.filter((podcast) =>
        podcast.genres?.includes(selectedGenre),
      );
    }

    // Sorting
    if (sortOption === "title") {
      results.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortOption === "updated") {
      results.sort((a, b) => new Date(b.updated) - new Date(a.updated));
    }

    setFilteredPodcasts(results);
  }

  /**
   * Values exposed to consumers of the PodcastContext.
   */
  const value = {
    initialPodcasts,
    filteredPodcasts,
    searchTerm,
    setSearchTerm,
    selectedGenre,
    setSelectedGenre,
    sortOption,
    setSortOption,
    isLoading,
    error,
  };

  return (
    <PodcastContext.Provider value={value}>{children}</PodcastContext.Provider>
  );
}

/**
 * Custom hook for accessing PodcastContext.
 *
 * @returns {Object} Podcast context value
 */
export function usePodcastContext() {
  const context = useContext(PodcastContext);

  if (!context) {
    throw new Error("usePodcastContext must be used within a PodcastProvider");
  }

  return context;
}
