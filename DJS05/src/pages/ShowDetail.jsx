import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

/**
 * ShowDetail page component.
 *
 * - Fetches detailed data for a single podcast show using a UUID
 * - Displays show metadata (title, image, description, last updated)
 * - Provides season navigation via a dropdown selector
 * - Prepares the structure for episode rendering (DJS05)
 *
 * @returns {JSX.Element} Show detail page
 */
export default function ShowDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  /** Full show object returned by the API */
  const [show, setShow] = useState(null);

  /** Currently selected season index */
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);

  /** Loading state while fetching show data */
  const [isLoading, setIsLoading] = useState(true);

  /** Error message if fetching fails */
  const [error, setError] = useState(null);

  /**
   * Fetch show details when the route ID changes.
   */
  useEffect(() => {
    async function fetchShow() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://podcast-api.netlify.app/id/${id}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch show details");
        }

        const data = await response.json();
        setShow(data);
        setSelectedSeasonIndex(0); // Reset season on new show
      } catch (err) {
        setError(err.message);
        setShow(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchShow();
  }, [id]);

  /**
   * Format date string into a readable format.
   *
   * @param {string} dateString
   * @returns {string}
   */
  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-ZA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  // --------------------
  // Render states
  // --------------------

  if (isLoading) {
    return <p>Loading show details…</p>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    );
  }

  if (!show) {
    return <p>Show not found.</p>;
  }

  const seasons = Array.isArray(show.seasons) ? show.seasons : [];
  const selectedSeason = seasons[selectedSeasonIndex];

  return (
    <section>
      <button onClick={() => navigate(-1)}>← Back</button>

      <h1>{show.title}</h1>

      <img src={show.image} alt={show.title} style={{ maxWidth: "300px" }} />

      <p>{show.description}</p>

      <p>
        <strong>Last updated:</strong> {formatDate(show.updated)}
      </p>

      {/* Season Navigation */}
      {seasons.length > 0 && (
        <div>
          <h2>Seasons</h2>

          <label htmlFor="season-select">Select season:</label>

          <select
            id="season-select"
            value={selectedSeasonIndex}
            onChange={(event) =>
              setSelectedSeasonIndex(Number(event.target.value))
            }
          >
            {seasons.map((season, index) => (
              <option key={season.id} value={index}>
                {season.title} ({season.episodes.length} episodes)
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Placeholder for episode list (next step) */}
      {selectedSeason && (
        <p>
          <strong>
            {selectedSeason.title} contains {selectedSeason.episodes.length}{" "}
            episodes.
          </strong>
        </p>
      )}
    </section>
  );
}
