const { groupCollapsed } = require('console');
const fs = require('fs')
const input = fs.readFileSync('input.txt').toString();

// create luggage {owner: '', name: '', count: 0}
const luggage = [];
input.split("\n").forEach(line => {
    ownerBag = line.split('bags contain')[0].trim();;
    line.split('bags contain')[1].split('.').join('').split('bags').join('').split('bag').join('').replace('no other','').trim().split(', ').forEach(bagString => {
        if (bagString) {
            const bag = {};
            bag.owner = ownerBag;
            bag.name = bagString.substring(bagString.split(' ')[0].length).trim();
            bag.count = Number(bagString.split(' ')[0]);
            luggage.push(bag);
        }
    });
});

// search all objects containing object
let result = 0;
let chain = 1;
findBag = 'shiny gold';
luggage.forEach(bag => {
    if (bag.owner === findBag) {
        recurse(bag, chain);
    }
})

function recurse(bag, chain) {
    let childrens = luggage.filter(curBag => curBag.owner === bag.name) 
    chain = chain * bag.count;
    result += chain;
    if (childrens.length > 0) {
        childrens.forEach(child => {
            recurse(child, chain);
        })
    }
}

console.log(result)

// luggage object:
// { owner: 'light red', name: 'bright white', count: 1 }
// { owner: 'light red', name: 'muted yellow', count: 2 }
// { owner: 'dark orange', name: 'bright white', count: 3 }
// { owner: 'dark orange', name: 'muted yellow', count: 4 }
// { owner: 'bright white', name: 'shiny gold', count: 1 }
// { owner: 'muted yellow', name: 'shiny gold', count: 2 }
// { owner: 'muted yellow', name: 'faded blue', count: 9 }
// { owner: 'shiny gold', name: 'dark olive', count: 1 }
// { owner: 'shiny gold', name: 'vibrant plum', count: 2 }
// { owner: 'dark olive', name: 'faded blue', count: 3 }
// { owner: 'dark olive', name: 'dotted black', count: 4 }
// { owner: 'vibrant plum', name: 'faded blue', count: 5 }
// { owner: 'vibrant plum', name: 'dotted black', count: 6 }

// shiny gold 
//     dark olive 1
//         faded blue 3
//         dotted black 4
//     vibrant plum 2
//         faded blue 5
//         dotted black 6


