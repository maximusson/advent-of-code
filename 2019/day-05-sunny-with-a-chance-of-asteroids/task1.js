const Intcode = require('./intcode');
const fs = require('fs')
const filename = 'input.txt';

// get input
let program = fs.readFileSync(filename).toString().split(",");
parameter = 1;

// get intcode computer
const intcode = new Intcode(program, parameter);
intcode.run();
intcode.result();
