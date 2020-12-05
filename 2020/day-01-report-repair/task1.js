const fs = require('fs')
const filename = 'input.txt';

// get input
let input = fs.readFileSync(filename).toString().split("\n");

// get number
loop1:
for (let k = 0; k < input.length; k++) {
    for (let j = 0; j < input.length; j++) {
        num1 = parseInt(input[k]);
        num2 = parseInt(input[j]);
        if (num1+num2 === 2020) {
            console.log(num1*num2);
            break loop1;
        }   
    }
}
