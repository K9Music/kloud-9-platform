# Kloud 9 Logo Files

This directory contains the official logo files for Kloud 9. The logos are available in different formats and variations to ensure optimal usage across different contexts.

## Available Formats

### Legacy SVGs (kept for compatibility)
- `logo-full-light.svg` - Full logo in light colors for dark backgrounds
- `logo-full-dark.svg` - Full logo in dark colors for light backgrounds
- `icon-light.svg` - Icon in light colors for dark backgrounds
- `icon-dark.svg` - Icon in dark colors for light backgrounds

### New Canva-derived Assets (PNG → SVG)
The following files were imported from Canva as PNGs and vectorized to SVGs for scalability. Prefer these when matching the latest branding from Canva.

- `Kloud 9 logo & name (black background).svg`
- `Kloud 9 logo & name (blue background).svg`
- `Kloud 9 logo & name (white background).svg`
- `Kloud 9 logo only (black background).svg`
- `Kloud 9 logo only (blue background).svg`
- `Kloud 9 logo only (white background).svg`

## Usage Guidelines

### Size Recommendations
- Full Logo: Minimum width of 120px
- Icon Only: Minimum width of 32px
- Maintain aspect ratio when resizing

### Color Variations
- Use the background-specific variants as named (black/blue/white background) to match the intended context.

### Clear Space
- Maintain padding around the logo of at least half the logo's height
- Keep the logo clear of other graphic elements

### Don'ts
- Don't stretch or distort the logo
- Don't recolor exported PNGs/SVGs arbitrarily; keep brand consistency
- Don't add effects (shadows, gradients, etc.)
- Don't rotate the logo

## Technical Details
- Formats: SVG (vectorized from PNG) and PNG
- Viewport: Preserved aspect ratio
- Resolution independent (SVG)

### Build Scripts
- Vectorization script: `scripts/vectorize-logos.cjs`
- Input directory: `public/logos/pngs`
- Output directory: `public/logos`
- Dependencies: `imagetracerjs`, `canvas`

To regenerate SVGs from PNGs:

```bash
npm install
node scripts/vectorize-logos.cjs
```