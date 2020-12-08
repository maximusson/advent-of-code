const Computer = require('./computer');
const fs = require('fs')

const program = fs.readFileSync('input.txt').toString().split("\n");

const operations = program.reduce((arr, e, i) => {
    if (e.split(' ')[0] === 'nop' || e.split(' ')[0] === 'jmp') arr.push(i);
    return arr;
}, []);

for (let i = 0; i < operations.length; i++) {
    const newProgram = program.map((el, index) => {
        if (index === operations[i]) {
            if (el.includes('nop')) {
                return el.replace('nop','jmp');
            } else {
                return el.replace('jmp','nop');
            }
        } else {
            return el;
        }
    });
    
    const computer = new Computer(newProgram);
    const result = computer.run();

    if (computer.warning.id === 1) {
        console.log(result);
        break;
    }

}