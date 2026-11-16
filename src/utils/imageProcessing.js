export function calculateColorDistance(colorA, colorB) {
    const redDiff = colorB.r - colorA.r;
    const greenDiff = colorB.g - colorA.g;
    const blueDiff = colorB.b - colorA.b;

    return Math.sqrt(
        redDiff ** 2 +
        greenDiff ** 2 +
        blueDiff ** 2
    )
}

export function processImage(imageData, targetColor, threshold) {
    const pixels = imageData.data;

    const target = {
        r: parseInt(targetColor.slice(1, 3), 16),
        g: parseInt(targetColor.slice(3, 5), 16),
        b: parseInt(targetColor.slice(5, 7), 16)
    }

    const output = new ImageData(
        imageData.width,
        imageData.height
    )

    for (let i = 0; i < pixels.length; i += 4) {
        const current = {
            r: pixels[i],
            g: pixels[i + 1],
            b: pixels[i + 2]
        };
        
        const distance = calculateColorDistance(current, target);

        const matches = distance <= threshold;
        const value = matches ? 255 : 0;

        output.data[i] = value;
        output.data[i + 1] = value;
        output.data[i + 2] = value;
        output.data[i + 3] = 255;
    }

    return output;
}