import styles from "./Header.module.css";

/**
 * Header component.
 *
 * Displays the application header and title.
 * Rendered globally across all pages.
 *
 * @returns {JSX.Element} Application header
 */
export default function Header() {
  return (
    <header className={styles.appHeader}>
      <h1>🎙️ Podcast App</h1>
    </header>
  );
}
