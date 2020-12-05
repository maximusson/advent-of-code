const Slope = require('./slope');
const fs = require('fs')
const filename = 'input.txt';

// get input
const input = fs.readFileSync(filename).toString().split("\n");

// [right, down]
const traverse = [[1,1],[3,1],[5,1],[7,1],[1,2]];

let result = 1;
for (let i = 0; i < traverse.length; i++) {
    const right = traverse[i][0];
    const down = traverse[i][1];
    const slope = new Slope(input, right, down);
    result = result * slope.countTrees();
}

console.log(result);
