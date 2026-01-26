import styles from "./Pagination.module.css";

/**
 * Pagination component.
 *
 * Renders a numeric pagination control.
 * This component is presentational only and expects
 * pagination state to be passed in as props.
 *
 * Pagination logic is not yet implemented in the app,
 * so this component is currently safe and dormant.
 *
 * @param {Object} props
 * @param {number} props.page - Current active page
 * @param {number} props.totalPages - Total number of pages
 * @param {(page: number) => void} props.onPageChange - Page change handler
 * @returns {JSX.Element|null} Pagination controls or null
 */
export default function Pagination({ page, totalPages, onPageChange }) {
  if (!totalPages || totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.paginationWrapper}>
      {pages.map((p) => (
        <button
          key={p}
          className={`${styles.pageButton} ${p === page ? styles.active : ""}`}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
