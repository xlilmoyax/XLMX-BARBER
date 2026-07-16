/**
 * Security helper functions for input sanitization and validation.
 */

/**
 * Sanitizes input string to prevent Basic Cross-Site Scripting (XSS).
 * Removes HTML tags and encodes special characters.
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/<[^>]*>?/gm, '') // Remove HTML tags
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Validates if an email is in a secure and standard format.
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

/**
 * Validates if a phone number format contains only allowed characters.
 */
export function validatePhone(phone: string): boolean {
  // Allows numbers, spaces, plus sign, dashes, and parentheses
  const phoneRegex = /^[+0-9\s\-()]+$/;
  return phoneRegex.test(phone) && phone.trim().length >= 6;
}
