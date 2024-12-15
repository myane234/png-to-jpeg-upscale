const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputFolder = "./gambar";
const outputFolder = path.join(inputFolder, "hasil");

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

// Membaca semua file dalam folder input
fs.readdir(inputFolder, (err, files) => {
  if (err) {
    console.error("Gagal membaca folder:", err);
    return;
  }

  const pngFiles = files.filter(
    (file) => path.extname(file).toLowerCase() === ".png"
  );

  if (pngFiles.length === 0) {
    console.log("Tidak ada file PNG di folder:", inputFolder);
    return;
  }

  pngFiles.forEach((file) => {
    const inputPath = path.join(inputFolder, file);
    const outputFileName = file.replace(".png", ".jpeg");
    const outputPath = path.join(outputFolder, outputFileName);

    sharp(inputPath)
      .resize(1812, 1024)
      .jpeg({ quality: 100 })
      .toFormat("jpeg")
      .toFile(outputPath)
      .then(() => {
        console.log(`Berhasil mengonversi: ${file} -> ${outputFileName}`);
      })
      .catch((err) => {
        console.error(`Gagal mengonversi ${file}:`, err);
      });
  });
});
