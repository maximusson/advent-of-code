const fs = require('fs')

const input = fs.readFileSync('input.txt').toString();

// dict, key: char, value: 
const uniques = {};
Array.from(new Set(input.split("\n").join("").split(""))).forEach(unique => uniques[unique] = 0);
// { a: 0, b: 0, c: 0 }

const groups = input.split("\n\n").map(group => [group]).map(user => user[0].split("\n"));
// groups -> group -> answers
// [
//     [ 'abc' ],
//     [ 'a', 'b', 'c' ],
//     [ 'ab', 'ac' ],
//     [ 'a', 'a', 'a', 'a' ],
//     [ 'b' ]
// ]   

groups.forEach(group => {
    Object.keys(uniques).forEach(key => {
        sameAnswer = true;
        group.forEach(answer => {
            if (!answer.includes(key)) {
                sameAnswer = false
            }
        })
        if (sameAnswer) {
            uniques[key]++;
        }
    });
});

const count = Object.values(uniques).reduce((acc, cur) => acc + cur);
console.log(count)
