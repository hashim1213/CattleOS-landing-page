import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Safely formats a number to fixed decimals, avoiding scientific notation
 * For values that would be >= 1000 in any unit, cascade to next unit
 * @param value - The number to format (should be between 1-999 ideally)
 * @param decimals - Number of decimal places
 * @returns Formatted string like "123.45" without commas or scientific notation
 */
function safeToFixed(value: number, decimals: number): string {
  // For normal-sized numbers, toFixed works fine
  if (value < 1000) {
    return value.toFixed(decimals)
  }
  
  // For values >= 1000, we should have cascaded to a larger unit
  // But if we're here, just show with decimals (no commas)
  // This handles edge cases where value is slightly over 1000
  return value.toFixed(decimals)
}

/**
 * Formats a large number with appropriate abbreviations (K, M, B, T, Qa, Qi, etc.)
 * Handles extremely large numbers including scientific notation with full precision
 * Uses a scalable system that works for any number size
 * @param value - The number to format
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted string (e.g., "1.23M", "3.45K", "1.93B", "192.57T", "4.68Qa")
 */
export function formatCompactNumber(value: number, decimals: number = 2): string {
  if (value === 0) return '0'
  if (isNaN(value) || !isFinite(value)) return '0'
  
  const sign = value < 0 ? '-' : ''
  const valueStr = String(value)
  
  // Handle scientific notation by parsing the exponent directly
  if (valueStr.includes('e+') || valueStr.includes('e-') || valueStr.includes('E+') || valueStr.includes('E-')) {
    const parts = valueStr.toLowerCase().split('e')
    let base = parseFloat(parts[0])
    let absBase = Math.abs(base)
    let exp = parseInt(parts[1].replace('+', ''), 10)
    
    // Normalize: keep base between 1 and 10, adjust exponent accordingly
    while (absBase >= 10) {
      absBase /= 10
      exp += 1
    }
    while (absBase < 1 && absBase > 0) {
      absBase *= 10
      exp -= 1
    }
    
    // Determine the appropriate suffix based on the exponent
    // Use a scalable system: K(3), M(6), B(9), T(12), Qa(15), Qi(18), Sx(21), Sp(24), Oc(27), No(30)
    // We want to display values between 1.00 and 999.99 with the appropriate suffix
    
    // Define suffix map for scalable formatting
    const suffixes = [
      { exp: 30, suffix: 'No' },  // Nonillion
      { exp: 27, suffix: 'Oc' },  // Octillion
      { exp: 24, suffix: 'Sp' },  // Septillion
      { exp: 21, suffix: 'Sx' },  // Sextillion
      { exp: 18, suffix: 'Qi' },  // Quintillion
      { exp: 15, suffix: 'Qa' },  // Quadrillion
      { exp: 12, suffix: 'T' },   // Trillion
      { exp: 9, suffix: 'B' },    // Billion
      { exp: 6, suffix: 'M' },    // Million
      { exp: 3, suffix: 'K' },    // Thousand
    ]
    
    // Find the appropriate suffix
    for (const { exp: suffixExp, suffix } of suffixes) {
      if (exp >= suffixExp) {
        const digits = exp - suffixExp
        const displayValue = absBase * Math.pow(10, digits)
        
        // If value is reasonable (1-999.99), use this suffix
        if (displayValue >= 1 && displayValue < 1000) {
          return `${sign}${displayValue.toFixed(decimals)}${suffix}`
        }
        
        // If >= 1000, try next larger suffix
        if (displayValue >= 1000) {
          // Find next larger suffix
          const nextSuffixIndex = suffixes.findIndex(s => s.exp === suffixExp) - 1
          if (nextSuffixIndex >= 0) {
            const nextSuffix = suffixes[nextSuffixIndex]
            const nextDigits = exp - nextSuffix.exp
            const nextValue = absBase * Math.pow(10, nextDigits)
            if (nextValue >= 1 && nextValue < 1000) {
              return `${sign}${nextValue.toFixed(decimals)}${nextSuffix.suffix}`
            }
          }
          // If no larger suffix available, show with current suffix (very rare)
          return `${sign}${displayValue.toFixed(decimals)}${suffix}`
        }
      }
    }
    
    // For numbers < 1000, display normally
    if (exp >= 0 && exp < 3) {
      const displayValue = absBase * Math.pow(10, exp)
      return `${sign}${displayValue.toFixed(decimals)}`
    }
    
    // For very small numbers (negative exponents)
    return '0'
  }
  
  // Handle normal numbers (not in scientific notation) - use same scalable system
  const absValue = Math.abs(value)
  
  // Use the same suffix system for normal numbers
  const suffixes = [
    { threshold: 1e30, suffix: 'No' },
    { threshold: 1e27, suffix: 'Oc' },
    { threshold: 1e24, suffix: 'Sp' },
    { threshold: 1e21, suffix: 'Sx' },
    { threshold: 1e18, suffix: 'Qi' },
    { threshold: 1e15, suffix: 'Qa' },
    { threshold: 1e12, suffix: 'T' },
    { threshold: 1e9, suffix: 'B' },
    { threshold: 1e6, suffix: 'M' },
    { threshold: 1e3, suffix: 'K' },
  ]
  
  for (const { threshold, suffix } of suffixes) {
    if (absValue >= threshold) {
      const displayValue = absValue / threshold
      if (displayValue >= 1 && displayValue < 1000) {
        return `${sign}${displayValue.toFixed(decimals)}${suffix}`
      }
      // If >= 1000, try next larger suffix
      if (displayValue >= 1000) {
        const nextIndex = suffixes.findIndex(s => s.threshold === threshold) - 1
        if (nextIndex >= 0) {
          const nextSuffix = suffixes[nextIndex]
          const nextValue = absValue / nextSuffix.threshold
          if (nextValue >= 1 && nextValue < 1000) {
            return `${sign}${nextValue.toFixed(decimals)}${nextSuffix.suffix}`
          }
        }
      }
    }
  }
  
  // For numbers < 1000, display normally
  return `${sign}${absValue.toFixed(decimals)}`
}

/**
 * Formats a currency value with proper decimal places and abbreviations
 * Handles extremely large numbers and prevents scientific notation
 * @param value - The currency value to format
 * @param decimals - Number of decimal places for small values (default: 2)
 * @param compactDecimals - Number of decimal places for compact format (default: 2)
 * @returns Formatted currency string (e.g., "$1,234.56", "$1.93M", "$1.93B")
 */
export function formatCurrency(value: number, decimals: number = 2, compactDecimals: number = 2): string {
  if (value === 0) return '$0'
  if (isNaN(value) || !isFinite(value)) return '$0'
  
  let absValue: number
  let sign = value < 0 ? '-' : ''
  
  // Check if the number is extremely large (might be displayed in scientific notation)
  const valueStr = String(value)
  
  // Handle scientific notation (e.g., "1.925675870659675e+23")
  if (valueStr.includes('e+') || valueStr.includes('e-') || valueStr.includes('E+') || valueStr.includes('E-')) {
    // Parse scientific notation manually
    const parts = valueStr.toLowerCase().split('e')
    const baseNum = parseFloat(parts[0])
    const expStr = parts[1].replace('+', '')
    const expNum = parseInt(expStr, 10)
    absValue = Math.abs(baseNum * Math.pow(10, expNum))
  } else {
    absValue = Math.abs(value)
  }
  
  // Use compact format for very large numbers (>= 1 million) to avoid scientific notation
  if (absValue >= 1e6) {
    return `${sign}$${formatCompactNumber(absValue, compactDecimals)}`
  }
  
  // Use standard formatting for smaller numbers, ensuring no scientific notation
  return `${sign}$${absValue.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: true,
  })}`
}

/**
 * Formats a weight value with appropriate units and decimal places
 * Handles extremely large numbers and prevents scientific notation
 * @param value - The weight value in tons
 * @param decimals - Number of decimal places for small values (default: 1)
 * @param compactDecimals - Number of decimal places for compact format (default: 2)
 * @returns Formatted weight string (e.g., "1.2 tons", "1.93M tons", "1.93B tons")
 */
export function formatWeight(value: number, decimals: number = 1, compactDecimals: number = 2): string {
  if (value === 0) return '0 tons'
  if (isNaN(value) || !isFinite(value)) return '0 tons'
  
  let absValue: number
  
  // Check if the number is extremely large (might be displayed in scientific notation)
  const valueStr = String(value)
  
  // Handle scientific notation
  if (valueStr.includes('e+') || valueStr.includes('e-') || valueStr.includes('E+') || valueStr.includes('E-')) {
    const parts = valueStr.toLowerCase().split('e')
    const baseNum = parseFloat(parts[0])
    const expStr = parts[1].replace('+', '')
    const expNum = parseInt(expStr, 10)
    absValue = Math.abs(baseNum * Math.pow(10, expNum))
  } else {
    absValue = Math.abs(value)
  }
  
  // For very large weights, use compact format with readable decimals
  if (absValue >= 1e6) {
    return `${formatCompactNumber(absValue, compactDecimals)} tons`
  }
  
  // For smaller weights, use standard format
  return `${absValue.toFixed(decimals)} tons`
}

/**
 * Formats a quantity value with proper decimal places and unit
 * Handles extremely large numbers and prevents scientific notation
 * @param value - The quantity value
 * @param unit - The unit of measurement
 * @param decimals - Number of decimal places for small values (default: 0 for integers, 1 for decimals)
 * @param compactDecimals - Number of decimal places for compact format (default: 2)
 * @returns Formatted quantity string (e.g., "1,234.5 lbs", "1.93M ml", "1.93B lbs")
 */
export function formatQuantity(value: number, unit: string, decimals: number = 0, compactDecimals: number = 2): string {
  if (value === 0) return `0 ${unit}`
  if (isNaN(value) || !isFinite(value)) return `0 ${unit}`
  
  let absValue: number
  
  // Check if the number is extremely large (might be displayed in scientific notation)
  const valueStr = String(value)
  
  // Handle scientific notation
  if (valueStr.includes('e+') || valueStr.includes('e-') || valueStr.includes('E+') || valueStr.includes('E-')) {
    const parts = valueStr.toLowerCase().split('e')
    const baseNum = parseFloat(parts[0])
    const expStr = parts[1].replace('+', '')
    const expNum = parseInt(expStr, 10)
    absValue = Math.abs(baseNum * Math.pow(10, expNum))
  } else {
    absValue = Math.abs(value)
  }
  
  // For very large quantities, use compact format with readable decimals
  if (absValue >= 1e6) {
    return `${formatCompactNumber(absValue, compactDecimals)} ${unit}`
  }
  
  // For smaller quantities, use standard format with locale string
  if (decimals === 0) {
    return `${absValue.toLocaleString(undefined, { maximumFractionDigits: 0 })} ${unit}`
  }
  
  return `${absValue.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })} ${unit}`
}
