const Intcode = require('./intcode');
const fs = require('fs')
const filename = 'input.txt';

// get input
let program = fs.readFileSync(filename).toString().split(",");
noun = 12;
verb = 2;

// get intcode computer
const intcode = new Intcode(program, noun, verb);
intcode.init();
intcode.run();
console.log(intcode.returnFirstPositionOfProgram());
