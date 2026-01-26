import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PodcastDetail.module.css";
import { formatDate } from "../../utils/formatDate";
import GenreTags from "../UI/GenreTags";

/**
 * PodcastDetail component.
 *
 * Renders detailed information for a single podcast, including
 * title, description, genres, season selector, and episode list.
 * This component is presentational and expects podcast data
 * to be passed in from a parent (e.g. ShowDetail page).
 *
 * @param {Object} props
 * @param {Object} props.podcast - Full podcast object
 * @returns {JSX.Element} Podcast detail layout
 */
export default function PodcastDetail({ podcast }) {
  const navigate = useNavigate();
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);

  const seasons = Array.isArray(podcast.seasons) ? podcast.seasons : [];

  const selectedSeason = seasons[selectedSeasonIndex];

  return (
    <div className={styles.container}>
      {/* Back Button */}
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* Header */}
      <div className={styles.header}>
        <img src={podcast.image} alt={podcast.title} className={styles.cover} />

        <div>
          <h1 className={styles.title}>{podcast.title}</h1>

          <GenreTags genreIds={podcast.genres} />

          <p className={styles.description}>{podcast.description}</p>

          <p className={styles.updated}>
            Last updated {formatDate(podcast.updated)}
          </p>
        </div>
      </div>

      {/* Season Selector */}
      {seasons.length > 0 && (
        <div className={styles.seasonSelector}>
          <label htmlFor="season-select">Select season</label>

          <select
            id="season-select"
            value={selectedSeasonIndex}
            onChange={(e) => setSelectedSeasonIndex(Number(e.target.value))}
          >
            {seasons.map((season, index) => (
              <option key={season.id} value={index}>
                {season.title} ({season.episodes.length} episodes)
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Episodes */}
      {selectedSeason && (
        <ul className={styles.episodeList}>
          {selectedSeason.episodes.map((episode, index) => (
            <li
              key={`${podcast.id}-${selectedSeasonIndex}-${index}`}
              className={styles.episodeItem}
            >
              <h3>
                Episode {index + 1}: {episode.title}
              </h3>

              {episode.image && (
                <img
                  src={episode.image}
                  alt={episode.title}
                  className={styles.episodeImage}
                />
              )}

              <p>{episode.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
