/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

async function compressImages() {
  const images = ["gallery_1.png", "gallery_2.png", "gallery_3.png"];
  for (const img of images) {
    const inputPath = path.join(__dirname, "public", img);
    const outputPath = path.join(__dirname, "public", img.replace(".png", ".webp"));
    
    if (fs.existsSync(inputPath)) {
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);
      console.log(`Converted ${img} to WebP!`);
    } else {
      console.log(`File not found: ${inputPath}`);
    }
  }
}

compressImages().catch(console.error);
