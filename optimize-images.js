const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
let allImages = fs.readdirSync(path.join(__dirname, "images"));
// allImages = allImages.slice(0,3);
// console.log({allImages});

(async () => {
  console.log(`Optimizing ${allImages.length} images...`);
  await Promise.all(
    allImages.map((imageName) => {
      return sharp(path.join(__dirname, "images", imageName))
        .resize({ width: 100, height: 100, kernel: "nearest" })
        .toFile(path.join(__dirname, "optimized-images", imageName));
    })
  );
})();
