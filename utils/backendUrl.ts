/**
 * Backend base URL - switches between local dev and production
 */
export const BACKEND_BASE_URL = import.meta.env.DEV
  ? 'http://localhost:8080'
  : 'https://modus-admin.sdrvl.ch'

/**
 * Builds the PDF download URL for a report
 */
export function buildPdfUrl(slug: string): string {
  return `${BACKEND_BASE_URL}/rapport/${slug}/pdf`
}
