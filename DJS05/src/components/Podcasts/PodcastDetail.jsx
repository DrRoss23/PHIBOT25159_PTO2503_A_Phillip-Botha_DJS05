import styles from "./PodcastDetail.module.css";

/**
 * PodcastDetail
 * -------------
 * Displays core information about a podcast show,
 * including image, title, genres, description, and
 * last updated date.
 *
 * @param {{
 *   title: string,
 *   image: string,
 *   description: string,
 *   genres: Array<number>,
 *   updated: string
 * }} props
 * @returns {JSX.Element}
 */
export default function PodcastDetail({
  title,
  image,
  description,
  genres,
  updated,
}) {
  return (
    <div className={styles.detail}>
      <img src={image} alt={title} />

      <div>
        <h1>{title}</h1>

        <p>
          <strong>Genres:</strong> {genres.join(", ")}
        </p>

        <p>{description}</p>

        <p>
          <strong>Last updated:</strong> {updated}
        </p>
      </div>
    </div>
  );
}
