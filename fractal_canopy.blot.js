// Wiggly Squares by Nicolas Landucci is GPLv3-licensed.
// mm
const width = 125;
const height = 125;



function lenMapping(x) {
  return x-1;
}

const t = new bt.Turtle()
  .left(90)
  .down();

// store final lines here
const finalLines = [];

function rec(x) {
  if (x<1) return;
  const line = [];
  t.down();
  line.push(t.pos);
  for (let i = 0; i < 4; i++) {
    t.forward(x);
    line.push(t.pos);
  }
  //finalLines.push(line);
  t.left(45);
  rec(lenMapping(x));
  t.right(90);
  rec(lenMapping(x));
  t.left(45);
  t.forward(-4*x);
}

  
  

rec(15);

/*const lines = [[
    [0, 1],
    [0, -1]
  ],
  [
    [1, 0],
    [0, 0]
  ]];
// centre mark, 2x2 mm*/
bt.join(finalLines, t.path);

/*bt.offset(lines, 2, { arcTolerance: 0.001 });
bt.join(finalLines, lines);*/

bt.translate(
  finalLines,
  [width / 2, height / 2],
);

// draw it
drawLines(finalLines);
