import { usePodcastContext } from "../../context/PodcastContext";
import styles from "./SearchBar.module.css";

/**
 * SearchBar
 * ---------
 * Controlled input component used to filter podcasts
 * by title.
 *
 * The search value is stored in global context so that
 * it persists when navigating between pages.
 *
 * @returns {JSX.Element}
 */
export default function SearchBar() {
  const { searchQuery, setSearchQuery } = usePodcastContext();

  /**
   * Handle search input changes
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  function handleChange(event) {
    setSearchQuery(event.target.value);
  }

  return (
    <div className={styles.searchBar}>
      <label htmlFor="search">Search podcasts</label>
      <input
        id="search"
        type="text"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Search by title…"
      />
    </div>
  );
}
