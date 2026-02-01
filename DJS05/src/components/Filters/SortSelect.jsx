import { usePodcastContext } from "../../context/PodcastContext";
import styles from "./SortSelect.module.css";

/**
 * SortSelect
 * ----------
 * Dropdown component used to control the sorting
 * order of podcasts displayed on the Home page.
 *
 * The selected sort option is stored in global
 * context to ensure it persists when navigating
 * between pages.
 *
 * @returns {JSX.Element}
 */
export default function SortSelect() {
  const { sortOption, setSortOption } = usePodcastContext();

  /**
   * Handle sort option changes
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} event
   */
  function handleChange(event) {
    setSortOption(event.target.value);
  }

  return (
    <div className={styles.sortSelect}>
      <label htmlFor="sort">Sort by</label>
      <select id="sort" value={sortOption} onChange={handleChange}>
        <option value="title-asc">Title (A–Z)</option>
        <option value="title-desc">Title (Z–A)</option>
        <option value="updated-desc">Last updated (newest)</option>
        <option value="updated-asc">Last updated (oldest)</option>
      </select>
    </div>
  );
}
