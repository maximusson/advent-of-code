const fs = require('fs')
const input = fs.readFileSync('input.txt').toString().split("\n").map(number => Number(number));

const len = 25;

// get invalid number
let invalidNumber;
for (let i = 0; i < input.length - len; i++) {
    const numbers = input.reduce((arr, el, index) => {
        if (index >= i && index < i + len) arr.push(el);
        return arr;
    }, []);

    const sums = getSums(numbers);
    const checkNumber = input[i+len];
    if (!sums.includes(checkNumber)) {
        invalidNumber = checkNumber;
    }
}

console.log(invalidNumber)


function getSums(numbers) {
    let sums = [];
    for (let i2 = 0; i2 < numbers.length; i2++) {
        for (let j2 = 0; j2 < numbers.length; j2++) {
            if (i2 !== j2) {
                sums.push(numbers[i2] + numbers[j2]);
            }
        }        
    }
    return sums;
}