import { usePodcastContext } from "../../context/PodcastContext";

/**
 * GenreFilter component.
 *
 * Provides a dropdown menu for filtering podcasts by genre.
 * Uses the static genre ID mapping defined by the project brief.
 *
 * @returns {JSX.Element} Genre filter dropdown
 */
export default function GenreFilter() {
  const { selectedGenre, setSelectedGenre } = usePodcastContext();

  /**
   * Handle changes to the selected genre.
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} event
   */
  function handleChange(event) {
    const value = event.target.value === "" ? null : Number(event.target.value);

    setSelectedGenre(value);
  }

  return (
    <div>
      <label htmlFor="genre-filter">Filter by genre</label>

      <select
        id="genre-filter"
        value={selectedGenre ?? ""}
        onChange={handleChange}
      >
        <option value="">All genres</option>
        <option value="1">Personal Growth</option>
        <option value="2">Investigative Journalism</option>
        <option value="3">History</option>
        <option value="4">Comedy</option>
        <option value="5">Entertainment</option>
        <option value="6">Business</option>
        <option value="7">Fiction</option>
        <option value="8">News</option>
        <option value="9">Kids and Family</option>
      </select>
    </div>
  );
}
