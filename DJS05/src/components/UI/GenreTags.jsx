import styles from "./GenreTags.module.css";

/**
 * GenreTags
 * ---------
 * Displays a list of genre labels associated
 * with a podcast show.
 *
 * @param {{ genreIds: number[] }} props
 * @returns {JSX.Element}
 */
export default function GenreTags({ genreIds }) {
  if (!genreIds || genreIds.length === 0) {
    return null;
  }

  return (
    <ul className={styles.tags}>
      {genreIds.map((id) => (
        <li key={id} className={styles.tag}>
          Genre {id}
        </li>
      ))}
    </ul>
  );
}
