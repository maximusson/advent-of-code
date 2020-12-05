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
    
    if (str.length >= max) {
        if (str[min-1] === char || str[max-1] === char) {
            if (str[min-1] === char && str[max-1] === char) {
                //console.log("both right")
            } else {
                numCorrectPasswords++;
            }
        }
    }
})

console.log(numCorrectPasswords);
