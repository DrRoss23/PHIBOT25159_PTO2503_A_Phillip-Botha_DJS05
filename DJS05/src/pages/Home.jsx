import { usePodcastContext } from "../context/PodcastContext";
import PodcastGrid from "../components/Podcasts/PodcastGrid";

/**
 * Home
 * ----
 * Displays the main podcast listing page.
 *
 * Responsibilities:
 * - Reads filtered podcast data from global context
 * - Handles loading, error, and empty states
 * - Delegates podcast rendering to PodcastGrid
 *
 * Filter and search state persists via PodcastContext
 * when navigating away and back to this page.
 *
 * @returns {JSX.Element}
 */
export default function Home() {
  const { filteredPodcasts, isLoading, error } = usePodcastContext();

  if (isLoading) {
    return <p>Loading podcasts…</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (filteredPodcasts.length === 0) {
    return <p>No podcasts match your current filters.</p>;
  }

  return (
    <section>
      <h1>Podcasts</h1>
      <PodcastGrid podcasts={filteredPodcasts} />
    </section>
  );
}
