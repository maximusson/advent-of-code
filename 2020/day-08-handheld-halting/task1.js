const Computer = require('./computer');
const fs = require('fs')

const program = fs.readFileSync('input.txt').toString().split("\n");
const computer = new Computer(program);
const result = computer.run();
console.log(result);
console.log(computer.warning);