import { formatDate } from "../utils/formatDate";
import { GenreTags } from "../UI";
import styles from "./PodcastCard.module.css";

/**
 * Renders a single podcast preview card with image, title,
 * number of seasons, genre tags, and the last updated date.
 *
 * @param {Object} props
 * @param {Object} props.podcast - The podcast data object to display.
 * @param {string} props.podcast.id - Unique ID of the podcast.
 * @param {string} props.podcast.title - Title of the podcast.
 * @param {string} props.podcast.image - URL of the podcast image.
 * @param {number} props.podcast.seasons - Number of seasons available.
 * @param {string} props.podcast.updated - ISO date string for the last update.
 * @param {number[]} props.podcast.genres - Array of genre IDs.
 *
 * @returns {JSX.Element} The rendered podcast card component.
 */
export default function PodcastCard({ podcast }) {
  return (
    <div className={styles.card}>
      <img src={podcast.image} alt={podcast.title} />

      <h3>{podcast.title}</h3>

      <p className={styles.seasons}>{podcast.seasons} seasons</p>

      <GenreTags genreIds={podcast.genres} />

      <p className={styles.updatedText}>
        Updated {formatDate(podcast.updated)}
      </p>
    </div>
  );
}
