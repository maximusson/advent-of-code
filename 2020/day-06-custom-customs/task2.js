const fs = require('fs')
const input = fs.readFileSync('input.txt').toString();

const uniques = {};
Array.from(new Set(input.split("\n").join("").split(""))).forEach(unique => uniques[unique] = 0);

const groups = input.split("\n\n").map(group => [group]).map(user => user[0].split("\n"));
 
groups.forEach(group => {
    Object.keys(uniques).forEach(key => {
        sameAnswer = true;
        group.forEach(answer => {
            if (!answer.includes(key)) sameAnswer = false;
        })
        if (sameAnswer) uniques[key]++;
    });
});

console.log(Object.values(uniques).reduce((acc, cur) => acc + cur));


// uniques - dict, key: char, value: 
// { a: 0, b: 0, c: 0 }

// groups -> group -> answers
// [
//     [ 'abc' ],
//     [ 'a', 'b', 'c' ],
//     [ 'ab', 'ac' ],
//     [ 'a', 'a', 'a', 'a' ],
//     [ 'b' ]
// ]  
