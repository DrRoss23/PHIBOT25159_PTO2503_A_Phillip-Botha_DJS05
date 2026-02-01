import { Link } from "react-router-dom";
import styles from "./PodcastCard.module.css";

/**
 * PodcastCard
 * -----------
 * Presentational component that displays a summary
 * of a podcast show.
 *
 * Used within PodcastGrid to render each show.
 *
 * @param {{
 *   id: string,
 *   title: string,
 *   image: string
 * }} props
 * @returns {JSX.Element}
 */
export default function PodcastCard({ id, title, image }) {
  return (
    <li className={styles.card}>
      <Link to={`/show/${id}`}>
        <img src={image} alt={title} />
        <h2>{title}</h2>
      </Link>
    </li>
  );
}
