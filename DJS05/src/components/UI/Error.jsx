/**
 * Error component.
 *
 * Displays a user-friendly error message when something
 * goes wrong during data fetching or rendering.
 *
 * @param {Object} props
 * @param {string} [props.message] - Optional error message
 * @returns {JSX.Element} Error message display
 */
export default function Error({ message }) {
  return <p>{message || "Something went wrong. Please try again."}</p>;
}
