// welcome to blot!

// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start

const width = 125;
const height = 125;
const gridWidth = 10;
const gridHeight = 10;

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

for (let i = 0; i < gridWidth; i++) {
  for (let j = 0; j < gridHeight; j++) {
    const square = rect(10, 10);
    const shapeCenter = [i * 12, j * 12];
    bt.translate(
      square,
      shapeCenter,
    );
    bt.translate(square, [
      bt.randInRange(-1, 1) *
      Math.sqrt((shapeCenter[0] - width / 2) ** 2 + (shapeCenter[1] - height / 2) ** 2) / 30,
      bt.randInRange(-1, 1) *
      Math.sqrt((shapeCenter[0] - width / 2) ** 2 + (shapeCenter[1] - height / 2) ** 2) / 30
    ]);
    bt.rotate(square, Math.atan2(bt.bounds(finalLines).cc[0]-width/2,
                                 bt.bounds(finalLines).cc[1]-width/2));
    bt.join(finalLines, square);
  }
}


const finalLinesBounds = bt.bounds(finalLines);

bt.translate(
  finalLines,
  [width / 2, height / 2],
  finalLinesBounds.cc
);

// draw it
drawLines(finalLines);
