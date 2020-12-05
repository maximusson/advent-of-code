// calculate function
const getFuel = (mass) => {
    return parseInt(mass/3)-2;
}

// read input into array
const getData = () => {
    const fs = require('fs')
    const filename = 'input.txt';
    const array = fs.readFileSync(filename).toString().split("\n");
    return array;
}

// solve task
const input = getData();
const fuel = input
    .map(i => getFuel(i))
    .reduce((total, num) => {
        total += num;
        return total;
    });

console.log(fuel);
