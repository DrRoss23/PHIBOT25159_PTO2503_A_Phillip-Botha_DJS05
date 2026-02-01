import PodcastCard from "./PodcastCard";
import styles from "./PodcastGrid.module.css";

/**
 * PodcastGrid
 * -----------
 * Layout component that renders a responsive
 * grid of PodcastCard components.
 *
 * @param {{ podcasts: Array }} props
 * @returns {JSX.Element}
 */
export default function PodcastGrid({ podcasts }) {
  return (
    <ul className={styles.grid}>
      {podcasts.map((podcast) => (
        <PodcastCard
          key={podcast.id}
          id={podcast.id}
          title={podcast.title}
          image={podcast.image}
        />
      ))}
    </ul>
  );
}
