import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ShowDetail.module.css";

/**
 * ShowDetail
 * ----------
 * Displays detailed information about a single podcast show,
 * including seasons and episodes.
 *
 * Data is fetched dynamically using the route parameter `id`.
 *
 * @returns {JSX.Element}
 */
export default function ShowDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [show, setShow] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch a single podcast show by ID
   */
  useEffect(() => {
    async function fetchShow() {
      try {
        const response = await fetch(
          `https://podcast-api.netlify.app/id/${id}`,
        );

        if (!response.ok) {
          throw new Error("Failed to load show details");
        }

        const data = await response.json();
        setShow(data);
        setSelectedSeason(data.seasons[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchShow();
  }, [id]);

  /**
   * Convert a timestamp into a readable date
   *
   * @param {number} timestamp
   * @returns {string}
   */
  function formatDate(timestamp) {
    return new Date(timestamp).toLocaleDateString();
  }

  /**
   * Shorten long episode descriptions for easier scanning
   *
   * @param {string} text
   * @param {number} maxLength
   * @returns {string}
   */
  function truncateText(text, maxLength = 120) {
    if (!text) return "";
    return text.length > maxLength ? `${text.slice(0, maxLength)}…` : text;
  }

  if (isLoading) {
    return <p>Loading show details…</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!show) {
    return <p>No show found.</p>;
  }

  return (
    <section>
      <button onClick={() => navigate(-1)}>← Back</button>

      {/* Show header */}
      <div className={styles.showHeader}>
        <img src={show.image} alt={show.title} />

        <div className={styles.showInfo}>
          <h1>{show.title}</h1>

          <p>
            <strong>Genres:</strong> {show.genres.join(", ")}
          </p>

          <p>{show.description}</p>

          <p>
            <strong>Last updated:</strong> {formatDate(show.updated)}
          </p>
        </div>
      </div>

      {/* Season selector */}
      <label htmlFor="season-select">Select season:</label>
      <select
        id="season-select"
        value={selectedSeason?.season}
        onChange={(e) => {
          const seasonNumber = Number(e.target.value);
          const season = show.seasons.find((s) => s.season === seasonNumber);
          setSelectedSeason(season);
        }}
      >
        {show.seasons.map((season) => (
          <option key={season.season} value={season.season}>
            Season {season.season} ({season.episodes.length} episodes)
          </option>
        ))}
      </select>

      {/* Episode list */}
      <ul className={styles.episodeList}>
        {selectedSeason.episodes.map((episode) => (
          <li key={episode.episode} className={styles.episodeCard}>
            {selectedSeason.image && (
              <img
                src={selectedSeason.image}
                alt={`Season ${selectedSeason.season}`}
                className={styles.seasonImage}
              />
            )}

            <div>
              <h3>
                Episode {episode.episode}: {episode.title}
              </h3>
              <p>{truncateText(episode.description)}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
