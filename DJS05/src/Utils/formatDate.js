/**
 * formatDate
 * ----------
 * Converts a numeric timestamp into a
 * human-readable date string.
 *
 * @param {number} timestamp - Unix timestamp in milliseconds
 * @returns {string} Formatted date string
 */
export function formatDate(timestamp) {
  return new Date(timestamp).toLocaleDateString();
}
