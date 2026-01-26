/**
 * Static mapping of genre IDs to display labels.
 * Defined according to the project brief.
 */
const GENRE_MAP = {
  1: "Personal Growth",
  2: "Investigative Journalism",
  3: "History",
  4: "Comedy",
  5: "Entertainment",
  6: "Business",
  7: "Fiction",
  8: "News",
  9: "Kids and Family",
};

/**
 * GenreTags component.
 *
 * Supports all genre shapes returned by the API:
 * - number IDs: [1, 3, 6]
 * - string titles: ["Business", "History"]
 * - objects: [{ id, title }]
 *
 * @param {Object} props
 * @param {Array} props.genreIds
 * @returns {JSX.Element|null}
 */
export default function GenreTags({ genreIds }) {
  if (!Array.isArray(genreIds) || genreIds.length === 0) {
    return null;
  }

  return (
    <div>
      {genreIds.map((genre, index) => {
        let label = "Unknown";

        // Case 1: already a readable string
        if (typeof genre === "string") {
          label = genre;
        }

        // Case 2: object with title
        else if (typeof genre === "object" && genre?.title) {
          label = genre.title;
        }

        // Case 3: numeric ID
        else if (typeof genre === "number") {
          label = GENRE_MAP[genre] ?? "Unknown";
        }

        return (
          <span
            key={`${label}-${index}`}
            style={{
              display: "inline-block",
              padding: "0.25rem 0.5rem",
              marginRight: "0.5rem",
              marginBottom: "0.5rem",
              backgroundColor: "#333",
              borderRadius: "4px",
              fontSize: "0.85rem",
            }}
          >
            {label}
          </span>
        );
      })}
    </div>
  );
}
