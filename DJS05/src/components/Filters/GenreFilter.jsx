import { usePodcastContext } from "../../context/PodcastContext";
import styles from "./GenreFilter.module.css";

/**
 * GenreFilter
 * -----------
 * Dropdown component that allows users to filter
 * podcasts by genre.
 *
 * Selected genre is stored in global context to
 * ensure filter persistence across routes.
 *
 * @returns {JSX.Element}
 */
export default function GenreFilter() {
  const { selectedGenre, setSelectedGenre } = usePodcastContext();

  /**
   * Handle genre selection change
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} event
   */
  function handleChange(event) {
    setSelectedGenre(event.target.value);
  }

  return (
    <div className={styles.genreFilter}>
      <label htmlFor="genre">Filter by genre</label>
      <select id="genre" value={selectedGenre} onChange={handleChange}>
        <option value="all">All genres</option>
        <option value="1">Personal Growth</option>
        <option value="2">True Crime</option>
        <option value="3">History</option>
        <option value="4">Comedy</option>
        <option value="5">Entertainment</option>
        <option value="6">Business</option>
        <option value="7">Fiction</option>
        <option value="8">News</option>
        <option value="9">Kids & Family</option>
      </select>
    </div>
  );
}
