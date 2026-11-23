function calculateColorDistance(colorA, colorB) {
    const redDiff = colorB.r - colorA.r;
    const greenDiff = colorB.g - colorA.g;
    const blueDiff = colorB.b - colorA.b;

    return Math.sqrt(
        redDiff ** 2 +
        greenDiff ** 2 +
        blueDiff ** 2
    )
}

function calculateOutput(pixels, target, output, threshold) {
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

    calculateOutput(pixels, target, output, threshold);

    return output;
}

export function findConnectedGroups(binaryImage) {
  const height = binaryImage.length;

  if (height === 0 || binaryImage[0].length === 0) {
    throw new Error('Binary image cannot be empty');
  }

  const width = binaryImage[0].length
  const visited = Array.from(
    { length: height },
    () => Array(width).fill(false)
  )

  const groups = []

  const moves = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ]

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (binaryImage[row][col] !== 1 || visited[row][col]) {
        continue
      }

      let pixels = 0
      let sumX = 0
      let sumY = 0

      const stack = [[row, col]]
      visited[row][col] = true

      while (stack.length > 0) {
        const [currentRow, currentCol] = stack.pop()

        pixels++
        sumX += currentCol
        sumY += currentRow

        for (const [dr, dc] of moves) {
          const nextRow = currentRow + dr
          const nextCol = currentCol + dc

          if (
            nextRow >= 0 &&
            nextRow < height &&
            nextCol >= 0 &&
            nextCol < width &&
            binaryImage[nextRow][nextCol] === 1 &&
            !visited[nextRow][nextCol]
          ) {
            visited[nextRow][nextCol] = true
            stack.push([nextRow, nextCol])
          }
        }
      }

      groups.push({
        size: pixels,
        centroid: {
          x: Math.trunc(sumX / pixels),
          y: Math.trunc(sumY / pixels),
        },
      })
    }
  }

  groups.sort((a, b) => {
  if (a.size !== b.size) {
    return b.size - a.size
  }

  if (a.centroid.x !== b.centroid.x) {
    return b.centroid.x - a.centroid.x
  }

  return b.centroid.y - a.centroid.y
})

  return groups
}

export function imageDataToBinaryArray(imageData) {
  const { width, height, data } = imageData
  const binaryImage = []

  for (let y = 0; y < height; y++) {
    const row = []

    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4

      // White pixels are foreground (1).
      // Black pixels are background (0).
      const isWhite = data[index] === 255

      row.push(isWhite ? 1 : 0)
    }

    binaryImage.push(row)
  }

  return binaryImage
}
