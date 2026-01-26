import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

/**
 * ShowDetail page component.
 *
 * - Fetches and displays detailed information for a single podcast show
 * - Uses the dynamic route parameter `id` to retrieve the correct show
 * - Handles loading, error, and empty states gracefully
 * - Serves as the foundation for season and episode navigation (DJS05)
 *
 * @returns {JSX.Element} Show detail page
 */
export default function ShowDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  /** Detailed show data returned from the API */
  const [show, setShow] = useState(null);

  /** Loading state while fetching show data */
  const [isLoading, setIsLoading] = useState(true);

  /** Error message if fetching fails */
  const [error, setError] = useState(null);

  /**
   * Fetch show details when the page loads
   * or when the route ID changes.
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

  return (
    <section>
      <button onClick={() => navigate(-1)}>← Back</button>

      <h1>{show.title}</h1>

      <img src={show.image} alt={show.title} style={{ maxWidth: "300px" }} />

      <p>{show.description}</p>

      <p>
        <strong>Last updated:</strong> {formatDate(show.updated)}
      </p>
    </section>
  );
}
