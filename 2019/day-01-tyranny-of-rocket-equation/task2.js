// calculate function
const getFuel = (mass) => {
    let curFuel = parseInt(mass/3)-2;
    let totalFuel = curFuel;
    while (curFuel > 0) {
        curFuel = parseInt(curFuel/3)-2;
        if (curFuel > 0) {
            totalFuel += curFuel;
        }
    }
    return totalFuel;
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
