import styles from "./Loading.module.css";

/**
 * Loading
 * -------
 * Displays a loading indicator while data
 * is being fetched.
 *
 * @returns {JSX.Element}
 */
export default function Loading() {
  return <p className={styles.loading}>Loading…</p>;
}
