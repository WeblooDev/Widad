/**
 * Safely render a potentially localized field
 * If the value is an object with locale keys, extract the appropriate value
 * Otherwise return the value as-is
 */
export function safeRenderLocalized(value: any, locale: string = 'en'): string | undefined {
  if (!value) return undefined
  
  if (typeof value === 'string') return value
  
  // Check if it's a localized object (has locale keys like 'en', 'fr', 'ar')
  if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
    // Try to get the requested locale, fallback to 'en', or get first available value
    return value[locale] || value.en || Object.values(value)[0] as string
  }
  
  return String(value)
}
