const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
let allImages = fs.readdirSync(path.join(__dirname, "images"));
// allImages = allImages.slice(0, 3);
// console.log({allImages});

(async () => {
  console.log(`Optimizing ${allImages.length} images...`);
  await Promise.all(
    allImages.map((imageName, index) => {
      return (
        sharp(path.join(__dirname, "images", imageName))
          // 600x600 is the size opensea uses for cryptopunks: https://opensea.io/assets/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb/7781
          .resize({ width: 600, height: 600, kernel: "nearest" })
          .toFile(path.join(__dirname, "optimized-images", '600x600', imageName)).then(_ => {
		if (index % 101 === 0) {
			console.log(`Optimized ${index + 1} of ${allImages.length} images...`);
		      }
	  })
      );
    })
  );
})();
