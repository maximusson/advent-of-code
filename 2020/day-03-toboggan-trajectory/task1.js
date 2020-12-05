const Slope = require('./slope');
const fs = require('fs')
const filename = 'input.txt';

const input = fs.readFileSync(filename).toString().split("\n");
const slope = new Slope(input, 3, 1);
console.log(slope.countTrees());
