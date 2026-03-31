// Central site configuration — single source of truth.
// All hardcoded domain references should use SITE_URL from here.

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://ezmortgagelender.net'

export const SITE_NAME = 'EZMortgageLender.net®'
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`
export const LOGO = `${SITE_URL}/logo.png`
