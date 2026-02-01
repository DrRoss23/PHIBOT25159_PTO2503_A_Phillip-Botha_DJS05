import styles from "./Error.module.css";

/**
 * Error
 * -----
 * Displays a user-friendly error message when
 * something goes wrong during data fetching
 * or rendering.
 *
 * @param {{ message: string }} props
 * @returns {JSX.Element}
 */
export default function Error({ message }) {
  return <p className={styles.error}>Error: {message}</p>;
}
