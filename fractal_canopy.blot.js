// Wiggly Squares by Nicolas Landucci is GPLv3-licensed.
// mm
const width = 125;
const height = 125;



function lenMapping(x) {
  return x*.75;
}

const minLen = 1;
const angle = 20;

const randomFactor = 0.05;
const randomFactorProgression = 0.05;

const t = new bt.Turtle()
  .left(90)
  .down();

setDocDimensions(width, height);

// store final lines here
const finalLines = [];

const allLines = [];
function rec(x) {
  if (x<minLen) return;
  const line = [];
  t.down();
  line.push(t.pos);
  for (let i = 0; i < 3; i++) {
    t.forward(x/4);
    t.left(90);
    const step = bt.randInRange(
      -randomFactor*x-randomFactorProgression*i*x,
      randomFactor*x+randomFactorProgression*i*x
    );
    t.forward(step);
    line.push(t.pos);
    t.forward(-step);
    t.right(90);
  }
  t.forward(x/4);
  line.push(t.pos);
  
  allLines.push(line);
  t.left(angle);
  rec(lenMapping(x));
  t.right(2*angle);
  rec(lenMapping(x));
  t.left(angle);
  t.forward(-x);
} 

rec(28);
console.log(allLines);
for (let line in allLines) {
  const tmp = [bt.catmullRom(allLines[line])];
  bt.join(finalLines, tmp);
}


bt.translate(
  finalLines,
  [width / 2, height / 2],
  bt.bounds(finalLines).cc
);

// draw it
drawLines(finalLines);
