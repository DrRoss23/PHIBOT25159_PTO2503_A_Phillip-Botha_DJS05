import { Link } from "react-router-dom";
import { usePodcastContext } from "../context/PodcastContext";
import styles from "./Home.module.css";

/**
 * Home
 * ----
 * Displays a list of podcasts in a responsive grid layout.
 * Allows users to browse podcasts while applying search
 * and genre filters.
 *
 * Navigation:
 * - Clicking a podcast navigates to `/show/:id`
 * - Filter and search state persists when returning
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
    return <p>No podcasts match your search.</p>;
  }

  return (
    <section>
      <h1>Podcasts</h1>

      <ul className={styles.grid}>
        {filteredPodcasts.map((podcast) => (
          <li key={podcast.id} className={styles.card}>
            <Link to={`/show/${podcast.id}`}>
              <img src={podcast.image} alt={podcast.title} />
              <h2>{podcast.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
