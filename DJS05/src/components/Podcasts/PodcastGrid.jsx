import PodcastCard from "./PodcastCard";
import { usePodcastContext } from "../../context/PodcastContext";
import styles from "./PodcastGrid.module.css";

/**
 * PodcastGrid component.
 *
 * Renders a responsive grid of podcast preview cards using
 * filtered podcast data from PodcastContext.
 *
 * Displays a user-friendly message when no results are available.
 *
 * @returns {JSX.Element} Grid of PodcastCard components
 */
export default function PodcastGrid() {
  const { filteredPodcasts } = usePodcastContext();

  if (!filteredPodcasts.length) {
    return (
      <p className={styles.noResults}>
        No podcasts match your search or filters.
      </p>
    );
  }

  return (
    <div className={styles.grid}>
      {filteredPodcasts.map((podcast) => (
        <PodcastCard key={podcast.id} podcast={podcast} />
      ))}
    </div>
  );
}
