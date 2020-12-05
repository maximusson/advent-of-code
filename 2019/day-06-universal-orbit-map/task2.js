const fs = require('fs');
const filename = 'input.txt';

let input = fs.readFileSync(filename).toString();

let dict = {};
input.split("\n").forEach(line => {
    dict[line.split(")")[1]] = line.split(")")[0];
})

let you = {};
let san = {};

let cur = 'YOU';
while (cur != 'COM') {
    cur = dict[cur];
    you[cur] = 1;
}

cur = 'SAN';
while (cur != 'COM') {
    cur = dict[cur];
    san[cur] = 1;
}

Object.keys(san).forEach(key => {
    if (you[key]) {
        san[key] = 0;
        you[key] = 0;
    }
})

const sum1 = Object.values(san).reduce((acc, cur) => acc + cur);
const sum2 = Object.values(you).reduce((acc, cur) => acc + cur);
console.log(sum1+sum2)