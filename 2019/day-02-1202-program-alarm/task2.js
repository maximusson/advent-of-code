const Intcode = require('./intcode');
const fs = require('fs')
const filename = 'input.txt';

// get input
let program = fs.readFileSync(filename).toString().split(",");
let intcode = null;

for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
        intcode = new Intcode(program, noun, verb);
        intcode.init();
        intcode.run();
        if (intcode.returnFirstPositionOfProgram() === 19690720) {
            console.log(intcode.resultTask2());
        }
    }    
}
