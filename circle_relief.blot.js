// Circle Relief by Nicolas Landucci is GPLv3-licensed.
// NOTE TO SELF: Arrays are passed by reference. To "duplicate" points,
// use Array.slice() .

// mm
const width = 125;
const height = 125;

setDocDimensions(width, height);

const bigCircleRadius = 55;
const medCircleRadius = 54;
const smallCircleRadius = 54;
const circlePointCount = 3000;

const vertLines = [];
const horizLines = [];

const lines = [];

// big circle
const bigCirclePoints = [];
for (let i = 0; i < circlePointCount; i++) {
  bigCirclePoints.push([Math.cos(i * 2 * Math.PI / circlePointCount) * bigCircleRadius,
    Math.sin(i * 2 * Math.PI / circlePointCount) * bigCircleRadius
  ]);
}
// close the circle
bigCirclePoints.push(bigCirclePoints[0].slice());


// medium circle
const medCirclePoints = [];
for (let i = 0; i < circlePointCount; i++) {
  medCirclePoints.push([Math.cos(i * 2 * Math.PI / circlePointCount) * medCircleRadius,
    Math.sin(i * 2 * Math.PI / circlePointCount) * medCircleRadius
  ]);
}
// close the circle
medCirclePoints.push(medCirclePoints[0].slice());

// small circle
const medCirclePoints = [];
for (let i = 0; i < circlePointCount; i++) {
  medCirclePoints.push([Math.cos(i * 2 * Math.PI / circlePointCount) * medCircleRadius,
    Math.sin(i * 2 * Math.PI / circlePointCount) * medCircleRadius
  ]);
}
// close the circle
medCirclePoints.push(medCirclePoints[0].slice());


// translate circles
bt.translate(
  [bigCirclePoints, medCirclePoints],
  [width / 2, height / 2],
);


// vertical lines
for (let i = 1; i <= 121; i+=5) {
  vertLines.push([[i,0],[i,height]]);
}

// horizontal lines
for (let i = 1; i <= 121; i+=5) {
  bt.join(horizLines, [[[0,i],[height,i]]]);
}

bt.translate(
  vertLines,
  [width / 2, height / 2],
  bt.bounds(vertLines).cc
);

bt.translate(
  horizLines,
  [width / 2, height / 2],
  bt.bounds(horizLines).cc
);

bt.offset(vertLines, 1, { endType: "openButt" });
bt.offset(horizLines, 1, { endType: "openButt" });


bt.difference(vertLines, [bigCirclePoints]);
bt.intersection(horizLines, [medCirclePoints]);

//draw it
drawLines(horizLines);
drawLines(vertLines);
