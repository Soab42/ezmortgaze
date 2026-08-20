// Central site configuration — single source of truth.
// All hardcoded domain references should use SITE_URL from here.

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://ezmortgagelender.net'

export const SITE_NAME = 'EZMortgageLender.net®'
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`
// Logo artwork comes in two variants: LOGO_ON_DARK has white text for dark
// surfaces (navbar, footer), LOGO_ON_LIGHT has navy text for light surfaces.
export const LOGO_ON_DARK = '/EZ-Mortgage-Lender-Final-Logo-Dark.png'
export const LOGO_ON_LIGHT = '/EZ-Mortgage-Lender-Final-Logo-Light.png'

// Absolute URL used for metadata / structured data (rendered on light backgrounds).
export const LOGO = `${SITE_URL}${LOGO_ON_LIGHT}`
