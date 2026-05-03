/**
 * Extracts the dominant color from an image URL using the Canvas API.
 * This function is intended to be used in the browser.
 */
export async function getDominantColor(imageUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve("#C9A84C"); // Fallback
        return;
      }

      // Resize for performance
      canvas.width = 50;
      canvas.height = 50;
      ctx.drawImage(img, 0, 0, 50, 50);

      const imageData = ctx.getImageData(0, 0, 50, 50).data;
      let r = 0, g = 0, b = 0;
      let count = 0;

      let maxSaturationScore = -1;
      let bestColor = { r: 201, g: 168, b: 76 };

      // Pass 1: Try to find a vibrant color with center weighting
      for (let y = 0; y < 50; y++) {
        for (let x = 0; x < 50; x++) {
          const i = (y * 50 + x) * 4;
          const pr = imageData[i];
          const pg = imageData[i + 1];
          const pb = imageData[i + 2];

          const max = Math.max(pr, pg, pb);
          const min = Math.min(pr, pg, pb);
          const saturation = max === 0 ? 0 : (max - min) / max;
          const luminance = (0.299 * pr + 0.587 * pg + 0.114 * pb);

          // Center weighting (1.0 at center, 0.5 at edges)
          const dx = (x - 25) / 25;
          const dy = (y - 25) / 25;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const weight = 1 - (dist * 0.5);

          if (saturation > 0.02 && luminance > 5) {
            r += pr * weight;
            g += pg * weight;
            b += pb * weight;
            count += weight;

            const score = saturation * weight * 10 + (luminance / 255);
            if (score > maxSaturationScore) {
              maxSaturationScore = score;
              bestColor = { r: pr, g: pg, b: pb };
            }
          }
        }
      }

      // Pass 2: If nothing found, just take raw average of non-black pixels
      if (count === 0) {
        for (let i = 0; i < imageData.length; i += 4) {
          if (imageData[i] > 10 || imageData[i+1] > 10 || imageData[i+2] > 10) {
            r += imageData[i];
            g += imageData[i+1];
            b += imageData[i+2];
            count++;
          }
        }
      }

      if (count > 0) {
        // 90% best vibrant color, 10% average (to keep it grounded)
        const finalR = Math.floor((r / count) * 0.1 + bestColor.r * 0.9);
        const finalG = Math.floor((g / count) * 0.1 + bestColor.g * 0.9);
        const finalB = Math.floor((b / count) * 0.1 + bestColor.b * 0.9);
        resolve(`rgb(${finalR}, ${finalG}, ${finalB})`);
      } else {
        resolve("#C9A84C");
      }
    };

    img.onerror = () => {
      resolve("#C9A84C");
    };
  });
}
