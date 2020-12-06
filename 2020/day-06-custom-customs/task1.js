const fs = require('fs')

const input = fs.readFileSync('input.txt').toString();
const groups = input.split("\n\n").map(group => group.split("\n").join("")).map(group => Array.from(new Set(group.split(""))));

let result = 0; 
groups.forEach(el => result += el.length);

console.log(result)
