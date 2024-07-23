// Circle Relief by Nicolas Landucci is GPLv3-licensed.
// NOTE TO SELF: Arrays are passed by reference. To "duplicate" points,
// use Array.slice() .

// mm
const width = 125;
const height = 125;

setDocDimensions(width, height);

const bigCircleRadius = 55;
const medCircleRadius = 54;
const smallCircleRadius = 8;
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
const smallCirclePoints = [];
for (let i = 0; i < circlePointCount; i++) {
  smallCirclePoints.push([Math.cos(i * 2 * Math.PI / circlePointCount) * smallCircleRadius,
    Math.sin(i * 2 * Math.PI / circlePointCount) * smallCircleRadius
  ]);
}
// close the circle
smallCirclePoints.push(smallCirclePoints[0].slice());


// translate circles
bt.translate(
  [bigCirclePoints, medCirclePoints, smallCirclePoints],
  [width / 2, height / 2],
);


// vertical lines
for (let i = -31; i <= height+26; i+=5) {
  vertLines.push([[i,-30],[i,height+30]]);
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

const angle = bt.randInRange(-90,90);
bt.rotate(
  vertLines,
  angle,
  bt.bounds(horizLines).cc
);
bt.rotate(
  horizLines,
  -angle,
  bt.bounds(horizLines).cc
);

bt.difference(vertLines, [bigCirclePoints]);
bt.intersection(vertLines, [[[0,0],[0,height],[width,height],[width,0],[0,0]]]);
bt.intersection(horizLines, [medCirclePoints]);
bt.difference(horizLines, [smallCirclePoints]);

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

for (let i = 0; i < signaturePoints.length; i++) {
  signaturePoints[i][0] += bt.randInRange(-0.2,0.2);
  signaturePoints[i][1] += bt.randInRange(-0.2,0.2);
}

const signature = [bt.catmullRom(signaturePoints)];

bt.rotate(signature, bt.randInRange(-2,2), bt.bounds(signature).cc);

bt.translate(
  signature,
  [
    width/2+bt.randInRange(-0.5,0.5),
    height/2+bt.randInRange(-0.5,0.5)
  ],
  bt.bounds(signature).cc
);


//draw it
drawLines(signature);
drawLines(horizLines);
drawLines(vertLines);
