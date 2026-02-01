import { createContext, useContext, useEffect, useState } from "react";

/**
 * PodcastContext
 * --------------
 * Provides global podcast data and UI state such as:
 * - Podcast list
 * - Search query
 * - Genre filter
 * - Loading and error states
 *
 * This context ensures that filters and search state
 * persist when navigating between routes.
 */
const PodcastContext = createContext();

/**
 * PodcastProvider
 * ----------------
 * Wraps the application and provides podcast-related state
 * to all child components.
 *
 * @param {{ children: React.ReactNode }} props
 * @returns {JSX.Element}
 */
export function PodcastProvider({ children }) {
  const [podcasts, setPodcasts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch all podcasts from the API
   */
  useEffect(() => {
    async function fetchPodcasts() {
      try {
        const response = await fetch("https://podcast-api.netlify.app/shows");

        if (!response.ok) {
          throw new Error("Failed to fetch podcasts");
        }

        const data = await response.json();
        setPodcasts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPodcasts();
  }, []);

  /**
   * Filter podcasts based on search query and genre
   *
   * @returns {Array} Filtered podcast list
   */
  const filteredPodcasts = podcasts.filter((podcast) => {
    const matchesSearch = podcast.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesGenre =
      selectedGenre === "all" || podcast.genres.includes(Number(selectedGenre));

    return matchesSearch && matchesGenre;
  });

  return (
    <PodcastContext.Provider
      value={{
        podcasts,
        filteredPodcasts,
        searchQuery,
        setSearchQuery,
        selectedGenre,
        setSelectedGenre,
        isLoading,
        error,
      }}
    >
      {children}
    </PodcastContext.Provider>
  );
}

/**
 * usePodcastContext
 * -----------------
 * Custom hook to access the PodcastContext safely.
 *
 * @returns {Object} Podcast context values
 */
export function usePodcastContext() {
  const context = useContext(PodcastContext);

  if (!context) {
    throw new Error("usePodcastContext must be used within a PodcastProvider");
  }

  return context;
}
