import { usePodcastContext } from "../../context/PodcastContext";

/**
 * SearchBar component.
 *
 * Provides a controlled text input for searching podcast titles.
 * Updates the global search term stored in PodcastContext.
 *
 * @returns {JSX.Element} Search input field
 */
export default function SearchBar() {
  const { searchTerm, setSearchTerm } = usePodcastContext();

  /**
   * Handle changes to the search input.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  function handleChange(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <div>
      <label htmlFor="podcast-search">Search podcasts</label>

      <input
        id="podcast-search"
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
}
