import SearchBar from "../Filters/SearchBar";
import GenreFilter from "../Filters/GenreFilter";
import SortSelect from "../Filters/SortSelect";
import styles from "./Header.module.css";

/**
 * Header
 * ------
 * Persistent application header shown across all routes.
 *
 * Responsibilities:
 * - Displays application title
 * - Provides global search, filter, and sort controls
 *
 * @returns {JSX.Element}
 */
export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Podcast Explorer</h1>

      <div className={styles.controls}>
        <SearchBar />
        <GenreFilter />
        <SortSelect />
      </div>
    </header>
  );
}
