const Intcode = require('./intcode');
const fs = require('fs')

let program = fs.readFileSync('input-test.txt').toString().split(",");

// get all possible combinations of 56789
permutations = {};
for (let i = 0; i <= 98765; i++) {
    const cur = ('0000' + String(i)).slice(-5).split('');
    if (cur.includes('5') && cur.includes('6') && cur.includes('7') && cur.includes('8') && cur.includes('9')) {
        permutations[cur.join('')] = 0;
    }    
}

Object.keys(permutations).forEach(permutation => {
    const numbers = permutation.split('').map(char => parseInt(char));
    const intcodes = numbers.map(number => new Intcode(program, number));

    let lastOutput = 0;
    let i = 0;

    while (intcodes[4].isRunning) {
        intcodes[i].addInput(lastOutput);
        const output = intcodes[i].run();
        
        if (output !== null) lastOutput = output;

        i++;
        if (i === intcodes.length) i = 0;
    }

    permutations[permutation] = lastOutput;
})

console.log(Math.max(...Object.values(permutations)));