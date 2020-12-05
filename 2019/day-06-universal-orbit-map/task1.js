const fs = require('fs');
const filename = 'input.txt';

let input = fs.readFileSync(filename).toString();

let uniques = {};
input.split(")").join("\n").split("\n").forEach(orbit => {
    if (!uniques[orbit]) {
        uniques[orbit] = 0;
    }
})

let dict = {};
input.split("\n").forEach(line => {
    dict[line.split(")")[1]] = line.split(")")[0];
})

for (let orbit in uniques) {
    if (orbit != 'COM') {
        let cur = orbit;
        while (cur != 'COM') {
            cur = dict[cur];
            uniques[orbit]++;
        }
    }
}

const count = Object.values(uniques).reduce((acc, cur) => acc + cur);

console.log(count)