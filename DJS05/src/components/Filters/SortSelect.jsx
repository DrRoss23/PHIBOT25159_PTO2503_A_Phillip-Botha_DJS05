import { usePodcastContext } from "../../context/PodcastContext";

/**
 * SortSelect component.
 *
 * Provides a dropdown menu for selecting the podcast sort order.
 * Updates the global sort option stored in PodcastContext.
 *
 * @returns {JSX.Element} Sort selection dropdown
 */
export default function SortSelect() {
  const { sortOption, setSortOption } = usePodcastContext();

  /**
   * Handle changes to the sort selection.
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} event
   */
  function handleChange(event) {
    setSortOption(event.target.value);
  }

  return (
    <div>
      <label htmlFor="sort-select">Sort by</label>

      <select id="sort-select" value={sortOption} onChange={handleChange}>
        <option value="">Default</option>
        <option value="title">Title (A–Z)</option>
        <option value="updated">Last Updated</option>
      </select>
    </div>
  );
}
