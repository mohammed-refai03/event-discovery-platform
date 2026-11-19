/**
 * Asset Path Helper for STACKLY
 * Resolves static asset paths taking into account Vite BASE_URL (e.g. GitHub Pages subpath)
 *
 * @param {string} path - Relative or absolute asset path (e.g. "images/events/ev-1.webp" or "/images/events/ev-1.webp")
 * @returns {string} - Fully qualified base-aware path (e.g. "/event-discovery-platform/images/events/ev-1.webp")
 */
export function getAssetUrl(path) {
  if (!path) return '';

  // Return external links, data URLs, or blobs as-is
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  // Strip leading slash or dot-slash
  const cleanPath = path.replace(/^\.?\//, '');
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;

  return `${cleanBase}${cleanPath}`;
}

export default getAssetUrl;
