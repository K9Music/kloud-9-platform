/*
 Node script to vectorize PNG logos in public/logos/pngs into SVGs in public/logos.
 - Uses canvas to load PNGs
 - Removes solid background (based on corner color tolerance)
 - Uses imagetracerjs to trace to SVG
 - Writes SVGs with the same base filename (replacing .png with .svg)
*/

/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');
const ImageTracer = require('imagetracerjs');

const INPUT_DIR = path.resolve(__dirname, '..', 'public', 'logos', 'pngs');
const OUTPUT_DIR = path.resolve(__dirname, '..', 'public', 'logos');

function listPngFiles(dirPath) {
  return fs
    .readdirSync(dirPath)
    .filter((f) => f.toLowerCase().endsWith('.png'))
    .map((f) => path.join(dirPath, f));
}

function colorDistanceSquared(a, b) {
  const dr = a[0] - b[0];
  const dg = a[1] - b[1];
  const db = a[2] - b[2];
  return dr * dr + dg * dg + db * db;
}

function getPixel(data, width, x, y) {
  const idx = (y * width + x) * 4;
  return [data[idx], data[idx + 1], data[idx + 2], data[idx + 3]];
}

function removeSolidBackground(imageData, tolerance = 10) {
  // Determine background by sampling 4 corners and averaging
  const { data, width, height } = imageData;
  const corners = [
    getPixel(data, width, 0, 0),
    getPixel(data, width, width - 1, 0),
    getPixel(data, width, 0, height - 1),
    getPixel(data, width, width - 1, height - 1),
  ];
  const bg = [
    Math.round((corners[0][0] + corners[1][0] + corners[2][0] + corners[3][0]) / 4),
    Math.round((corners[0][1] + corners[1][1] + corners[2][1] + corners[3][1]) / 4),
    Math.round((corners[0][2] + corners[1][2] + corners[2][2] + corners[3][2]) / 4),
  ];

  // Only remove background if it's near white or near black
  const isNearWhite = colorDistanceSquared(bg, [255, 255, 255]) <= (tolerance * tolerance);
  const isNearBlack = colorDistanceSquared(bg, [0, 0, 0]) <= (tolerance * tolerance);
  if (!isNearWhite && !isNearBlack) {
    return imageData; // preserve colored backgrounds such as blue
  }

  const tol2 = tolerance * tolerance;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const idx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const dist2 = colorDistanceSquared([r, g, b], bg);
      if (dist2 <= tol2) {
        data[idx + 3] = 0; // set alpha to 0
      }
    }
  }
  return imageData;
}

function embedPngAsSvg(pngBuffer, width, height) {
  const base64 = pngBuffer.toString('base64');
  // Inline the PNG to preserve exact appearance and avoid tracing artifacts
  return (
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet">` +
    `<image width="${width}" height="${height}" href="data:image/png;base64,${base64}"/>` +
    `</svg>`
  );
}

async function vectorizePng(pngPath) {
  const img = await loadImage(pngPath);
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  let imageData = ctx.getImageData(0, 0, img.width, img.height);

  const baseName = path.basename(pngPath).toLowerCase();
  const isBlueBackground = baseName.includes('blue background');
  if (isBlueBackground) {
    // Return an SVG that embeds the original PNG to exactly preserve appearance
    const pngBuffer = fs.readFileSync(pngPath);
    return embedPngAsSvg(pngBuffer, img.width, img.height);
  }

  imageData = removeSolidBackground(imageData, 15);

  const options = {
    // Quality/speed trade-offs - tuned for better fidelity
    ltres: 0.5, // error threshold for straight lines (lower = more precise)
    qtres: 0.5, // error threshold for quadratic splines (lower = more precise)
    pathomit: 2, // disregard noise (lower = keep more detail)
    rightangleenhance: true,
    colorsampling: 1, // 0: disabled, 1: deterministic, 2: random
    numberofcolors: 32, // increased for better color fidelity
    mincolorratio: 0.01, // lower to keep more colors
    colorquantcycles: 5, // increased for better quantization
    scale: 1,
    roundcoords: 0, // keep precise coordinates
    strokewidth: 0,
    linefilter: false, // keep all lines
  };

  const svgString = ImageTracer.imagedataToSVG(imageData, options);
  return svgString;
}

function toOutputSvgPath(pngPath) {
  const base = path.basename(pngPath, path.extname(pngPath));
  return path.join(OUTPUT_DIR, `${base}.svg`);
}

async function main() {
  if (!fs.existsSync(INPUT_DIR)) {
    console.error(`Input directory not found: ${INPUT_DIR}`);
    process.exit(1);
  }
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const files = listPngFiles(INPUT_DIR);
  if (files.length === 0) {
    console.warn('No PNG files found to vectorize.');
    return;
  }

  console.log(`Vectorizing ${files.length} PNG files...`);
  for (const file of files) {
    try {
      const svg = await vectorizePng(file);
      const outPath = toOutputSvgPath(file);
      fs.writeFileSync(outPath, svg, 'utf8');
      console.log(`✔ Wrote ${path.relative(process.cwd(), outPath)}`);
    } catch (err) {
      console.error(`✖ Failed on ${file}:`, err.message);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


