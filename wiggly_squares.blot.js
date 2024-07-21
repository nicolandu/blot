// Wiggly Squares by Nicolas Landucci is GPLv3-licensed.
const width = 125;
const height = 125;

// multiple of 2
const gridDim = 8;

function rect(w, h) {
  return [
    [
      [-w / 2, -h / 2],
      [-w / 2, h / 2],
      [w / 2, h / 2],
      [w / 2, -h / 2],
      [-w / 2, -h / 2],
    ]
  ]
}

setDocDimensions(width, height);

// store final lines here
const finalLines = [];

const allPos = [];

for (let i = -gridDim + 1; i < gridDim; i += 2) {
  const colPos = [];
  for (let j = -gridDim + 1; j < gridDim; j += 2) {
    const square = rect(10, 10);
    const shapeCenter = [i * 6, j * 6];
    bt.translate(
      square,
      shapeCenter,
    );
    bt.translate(square, [
      bt.randInRange(-1, 1) *
      Math.sqrt(shapeCenter[0] ** 2 + shapeCenter[1] ** 2) / 30,
      bt.randInRange(-1, 1) *
      Math.sqrt(shapeCenter[0] ** 2 + shapeCenter[1] ** 2) / 30
    ]);

    const cc = bt.bounds(square).cc;

    // rotate to face away from centre with random amount decreasing away from centre
    bt.rotate(square, Math.atan2(cc[0] + bt.randInRange(-1, 1),
        cc[1] + bt.randInRange(-1, 1)) *
      180 / Math.PI
    );
    bt.join(finalLines, square);
    colPos.push(cc);
  }
  allPos.push(colPos);
}

// centre mark, 2x2 mm
bt.join(finalLines, [
  [
    [0, 1],
    [0, -1]
  ],
  [
    [1, 0],
    [-1, 0]
  ]
]);

const allPosSpiral = [];
for (let ring = 0; ring < (gridDim / 2); ring++) {
  // left
  for (let i = ring; i < gridDim-ring; i++) {
    allPosSpiral.push(allPos[ring][i]);
  }
  // top
  for (let i = ring+1; i < gridDim-ring; i++) {
    allPosSpiral.push(allPos[i][gridDim-ring-1]);
  }
  // right
  for (let i = gridDim-ring-2; i >= ring; i--) {
    allPosSpiral.push(allPos[gridDim-ring-1][i]);
  }
  // bottom
  for (let i = gridDim-ring-2; i > ring; i--) {
    allPosSpiral.push(allPos[i][ring]);
  }
}

const curve = bt.catmullRom(allPosSpiral);
bt.join(finalLines, [curve]);



const finalLinesBounds = bt.bounds(finalLines);

bt.translate(
  finalLines,
  [width / 2, height / 2],
);

// draw it
drawLines(finalLines);
