const Intcode = require('./intcode');
const fs = require('fs')

let program = fs.readFileSync('input.txt').toString().split(",");

// get all possible combinations of 0 1 2 3 4
permutations = {};
for (let i = 0; i <= 43210; i++) {
    const cur = ('0000' + String(i)).slice(-5).split('');
    if (cur.includes('0') && cur.includes('1') && cur.includes('2') && cur.includes('3') && cur.includes('4')) {
        permutations[cur.join('')] = 0;
    }    
}

Object.keys(permutations).forEach(permutation => {

    const numbers = permutation.split('').map(char => parseInt(char));
    const intcodes = numbers.map(number => new Intcode(program, number));

    let lastOutput = 0;
    let i = 0;

    for (let i = 0; i < intcodes.length; i++) {
        intcodes[i].addInput(lastOutput);
        const output = intcodes[i].run();
        
        if (output !== null) lastOutput = output;
    }

    permutations[permutation] = lastOutput;
})

console.log(Math.max(...Object.values(permutations)));