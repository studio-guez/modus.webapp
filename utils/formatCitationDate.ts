type CitationStyle = 'apa' | 'mla' | 'mhra' | 'chicago' | 'cbe' | 'bluebook' | 'bibtex';

const MONTHS_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const MONTHS_EN_ABBR = [
  'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June',
  'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'
];

const MONTHS_EN_CBE = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

/**
 * Format a date according to different academic citation styles
 * 
 * @param dateString - ISO 8601 date string or any parseable date
 * @param style - Citation style: 'apa', 'mla', 'mhra', 'chicago', 'cbe', 'bluebook', 'bibtex'
 * @returns Formatted date string
 * 
 * @example
 * formatCitationDate('2026-01-30T14:30:00+01:00', 'apa')    // "2026, January 30"
 * formatCitationDate('2026-01-30T14:30:00+01:00', 'mla')    // "30 Jan. 2026"
 * formatCitationDate('2026-01-30T14:30:00+01:00', 'mhra')   // "30 January 2026"
 * formatCitationDate('2026-01-30T14:30:00+01:00', 'chicago') // "January 30, 2026"
 * formatCitationDate('2026-01-30T14:30:00+01:00', 'cbe')    // "2026 Jan 30"
 * formatCitationDate('2026-01-30T14:30:00+01:00', 'bluebook') // "Jan. 30, 2026"
 * formatCitationDate('2026-01-30T14:30:00+01:00', 'bibtex') // "2026"
 */
export function formatCitationDate(dateString: string, style: CitationStyle): string {
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    return dateString; // Return original if invalid
  }

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  switch (style) {
    case 'apa':
      // APA: Year, Month Day (e.g., "2026, January 30")
      return `${year}, ${MONTHS_EN[month]} ${day}`;

    case 'mla':
      // MLA: Day Month. Year (e.g., "30 Jan. 2026")
      return `${day} ${MONTHS_EN_ABBR[month]} ${year}`;

    case 'mhra':
      // MHRA: Day Month Year (e.g., "30 January 2026")
      return `${day} ${MONTHS_EN[month]} ${year}`;

    case 'chicago':
      // Chicago: Month Day, Year (e.g., "January 30, 2026")
      return `${MONTHS_EN[month]} ${day}, ${year}`;

    case 'cbe':
      // CBE/CSE: Year Mon Day (e.g., "2026 Jan 30")
      return `${year} ${MONTHS_EN_CBE[month]} ${day}`;

    case 'bluebook':
      // Bluebook: Mon. Day, Year (e.g., "Jan. 30, 2026")
      return `${MONTHS_EN_ABBR[month]} ${day}, ${year}`;

    case 'bibtex':
      // BibTeX: Year only (e.g., "2026")
      return `${year}`;

    default:
      return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }
}

/**
 * Get all citation formats for a given date
 * Useful for displaying multiple options or copy buttons
 */
export function getAllCitationFormats(dateString: string): Record<CitationStyle, string> {
  return {
    apa: formatCitationDate(dateString, 'apa'),
    mla: formatCitationDate(dateString, 'mla'),
    mhra: formatCitationDate(dateString, 'mhra'),
    chicago: formatCitationDate(dateString, 'chicago'),
    cbe: formatCitationDate(dateString, 'cbe'),
    bluebook: formatCitationDate(dateString, 'bluebook'),
    bibtex: formatCitationDate(dateString, 'bibtex'),
  };
}

export type { CitationStyle };
