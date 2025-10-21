import type { TypedLocale } from 'payload'

/**
 * Helper function to get localized field value
 * If the field is an object with locale keys, return the value for the current locale
 * Otherwise, return the field as-is (for non-localized fields)
 */
export function getLocalizedField<T = string>(
  field: T | Record<string, T> | undefined | null,
  locale: TypedLocale,
): T | undefined {
  if (!field) return undefined

  // If field is an object and has the locale key, return that value
  if (typeof field === 'object' && field !== null && !Array.isArray(field)) {
    const localizedValue = (field as Record<string, T>)[locale]
    if (localizedValue !== undefined) {
      return localizedValue
    }
    // Fallback to 'en' if current locale not found
    return (field as Record<string, T>)['en']
  }

  // Return field as-is if it's not an object (already a string/number/etc)
  return field as T
}
