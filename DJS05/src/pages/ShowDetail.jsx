import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GenreTags from "../components/UI/GenreTags";

/**
 * ShowDetail page component.
 *
 * - Fetches detailed data for a single podcast show using a UUID
 * - Displays show metadata (title, image, description, genres, last updated)
 * - Provides season navigation
 * - Renders episode lists for the selected season
 *
 * @returns {JSX.Element} Show detail page
 */
export default function ShowDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [show, setShow] = useState(null);
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
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
        setSelectedSeasonIndex(0);
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

  /**
   * Shorten long episode descriptions for preview display.
   *
   * @param {string} text
   * @param {number} maxLength
   * @returns {string}
   */
  function shortenText(text, maxLength = 160) {
    if (!text) return "";
    return text.length > maxLength ? `${text.slice(0, maxLength)}…` : text;
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

      {/* ✅ Genre tags – single source of truth */}
      <GenreTags genreIds={show.genres} />

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
              <option key={`${show.id}-season-${index}`} value={index}>
                {season.title} ({season.episodes.length} episodes)
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Episode List */}
      {selectedSeason && (
        <div>
          <h3>{selectedSeason.title}</h3>

          <ul style={{ listStyle: "none", padding: 0 }}>
            {selectedSeason.episodes.map((episode, index) => (
              <li
                key={`${show.id}-episode-${selectedSeasonIndex}-${index}`}
                style={{
                  marginBottom: "1.5rem",
                  borderBottom: "1px solid #444",
                  paddingBottom: "1rem",
                }}
              >
                <h4>
                  Episode {index + 1}: {episode.title}
                </h4>

                {episode.image && (
                  <img
                    src={episode.image}
                    alt={episode.title}
                    style={{ maxWidth: "200px" }}
                  />
                )}

                <p>{shortenText(episode.description)}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
