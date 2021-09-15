const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
let allFullImages = fs.readdirSync(path.join(__dirname, "images"));

// allImages = allImages.slice(0, 3);
// console.log({allImages});

(async () => {
  console.log(`Optimizing ${allFullImages.length} images...`);
  await Promise.all(
    allFullImages.map((imageName, index) => {
      return (
        sharp(path.join(__dirname, "images", imageName))
          // 600x600 is the size opensea uses
          .resize({ width: 600, height: 600, kernel: "nearest" })
          .toFile(
            path.join(__dirname, "optimized-images", "600x600", imageName)
          )
          .then((_) => {
            if (index % 200 === 0) {
              console.log(
                `(600x600) Optimized ${index + 1} of ${
                  allFullImages.length
                } images...`
              );
            }
          })
      );
    })
  );

  let all600Images = fs.readdirSync(
    path.join(__dirname, "optimized-images", "600x600")
  );
  await Promise.all(
    all600Images.map((imageName, index) => {
      return (
        sharp(path.join(__dirname, "images", imageName))
          // 200x200 is
          .resize({ width: 200, height: 200, kernel: "nearest" })
          .toFile(
            path.join(__dirname, "optimized-images", "200x200", imageName)
          )
          .then((_) => {
            if (index % 200 === 0) {
              console.log(
                `(200x200) Optimized ${index + 1} of ${
                  allFullImages.length
                } images...`
              );
            }
          })
      );
    })
  );

  let all200Images = fs.readdirSync(
    path.join(__dirname, "optimized-images", "200x200")
  );
  await Promise.all(
    all200Images.map((imageName, index) => {
      return (
        sharp(path.join(__dirname, "images", imageName))
          // 100x100 is
          .resize({ width: 100, height: 100, kernel: "nearest" })
          .toFile(
            path.join(__dirname, "optimized-images", "100x100", imageName)
          )
          .then((_) => {
            if (index % 200 === 0) {
              console.log(
                `(100x100) Optimized ${index + 1} of ${
                  allFullImages.length
                } images...`
              );
            }
          })
      );
    })
  );
})();
