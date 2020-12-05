const fs = require('fs')
const filename = 'input.txt';

// get input
const input = fs.readFileSync(filename).toString().split("\n");
let numCorrectPasswords = 0;

input.forEach(line => {
    min = parseInt(line.split("-")[0]);
    max = parseInt(line.split("-")[1].split(" ")[0]);
    char = line.split(" ")[1].split(":")[0];
    str = line.split(" ")[2];
    charCounter = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === char) {
            charCounter++;
        }
    }
    if (charCounter >= min && charCounter <= max) {
        numCorrectPasswords++;
    }
    //console.log(min, max, char, str, charCounter, numCorrectPasswords);
})

console.log(numCorrectPasswords);
