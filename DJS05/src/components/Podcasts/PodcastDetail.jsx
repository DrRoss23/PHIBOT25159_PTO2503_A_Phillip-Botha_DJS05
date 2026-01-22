import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ← add this
import styles from "./PodcastDetail.module.css";
import { formatDate } from "../../utils/formatDate";
import GenreTags from "../UI/GenreTags";

export default function PodcastDetail({ podcast, genres }) {
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);
  const season = podcast.seasons[selectedSeasonIndex];
  const navigate = useNavigate(); // ← hook for navigation
}

// /  return (
//     <div className={styles.container}>
//       {/* Back Button */}
//       <button className={styles.backButton} onClick={() => navigate(-1)}>
//         ← Back
//       </button>
//     </div>
//     <div className={styles.header}>
//         <img src={podcast.image} alt="Podcast Cover" className={styles.cover} />
//         <div>
//           <h1 className={styles.title}>{podcast.title}</h1>
//           <p className={styles.description}>{podcast.description}</p>
//         </div>
//     </div>
//   );
// }
