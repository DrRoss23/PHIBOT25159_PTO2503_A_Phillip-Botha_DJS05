import { Link } from "react-router-dom";
import { usePodcastContext } from "../context/PodcastContext";

/**
 * Home page component.
 *
 * - Displays a list of podcast previews
 * - Uses global state from PodcastContext
 * - Navigates to the Show Detail page using dynamic UUID-based routes
 * - Preserves filter and search state when navigating back
 *
 * @returns {JSX.Element} Home page
 */
export default function Home() {
  const { filteredPodcasts, isLoading, error } = usePodcastContext();

  if (isLoading) {
    return <p>Loading podcasts…</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (filteredPodcasts.length === 0) {
    return <p>No podcasts found.</p>;
  }

  return (
    <section>
      <h1>Podcasts</h1>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredPodcasts.map((podcast) => (
          <li key={podcast.id} style={{ marginBottom: "1.5rem" }}>
            <Link to={`/show/${podcast.id}`}>
              <img
                src={podcast.image}
                alt={podcast.title}
                style={{ maxWidth: "200px", display: "block" }}
              />
              <h2>{podcast.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
