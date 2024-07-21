// Wiggly Squares by Nicolas Landucci is GPLv3-licensed.
// mm
const width = 125;
const height = 125;

// multiple of 2
const gridDim = 8;

//mm
const gridInterval = 12;

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
    const shapeCenter = [i * gridInterval / 2, j * gridInterval / 2];
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
  for (let i = ring; i < gridDim - ring; i++) {
    allPosSpiral.push(allPos[ring][i]);
  }
  // top
  for (let i = ring + 1; i < gridDim - ring; i++) {
    allPosSpiral.push(allPos[i][gridDim - ring - 1]);
  }
  // right
  for (let i = gridDim - ring - 2; i >= ring; i--) {
    allPosSpiral.push(allPos[gridDim - ring - 1][i]);
  }
  // bottom
  for (let i = gridDim - ring - 2; i > ring; i--) {
    allPosSpiral.push(allPos[i][ring]);
  }
}

const curve = [bt.catmullRom(allPosSpiral)];
bt.offset(curve, 1, { arcTolerance: 0.001 });
bt.join(finalLines, curve);

const signaturePoints = [
  [-2.07, 1.26],
  [0, 2],
  [1.33, 3.4],
  [1.22, 4.65],
  [0.18, 5.5],
  [-0.93, 4.29],
  [-1.64, -1.8],
  [-0.65, 0.79],
  [0.54, 1.06],
  [1.67, -2],
  [3.49, -1.29],
  [4.84, 2.55],
  [3.41, 6.11],
  [-1.22, 7.39],
  [-4.14, 4.86],
  [-4.5, 1.76],
  [-3.44, -1.43],
];

const signature = [bt.catmullRom(signaturePoints)];

bt.translate(
  signature,
  [
    (gridDim + 1) / 2 * gridInterval-1,
    -(gridDim + 1) / 2 * gridInterval-1
  ]);

bt.join(finalLines, signature);

bt.translate(
  finalLines,
  [width / 2, height / 2],
);

// draw it
drawLines(finalLines);
