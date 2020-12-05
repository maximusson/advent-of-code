const fs = require('fs')
const filename = 'input.txt';

// get input
let input = fs.readFileSync(filename).toString().split("\n");

// get number
loop1:
for (let k = 0; k < input.length; k++) {
    for (let j = 0; j < input.length; j++) {
        for (let i = 0; i < input.length; i++) {
            num1 = parseInt(input[k]);
            num2 = parseInt(input[i]);
            num3 = parseInt(input[j]);
            if (num1+num2+num3 === 2020) {
                console.log(num1*num2*num3);
                break loop1;
            }
        }       
    }
}
