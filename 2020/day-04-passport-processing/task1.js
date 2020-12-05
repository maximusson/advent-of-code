const fs = require('fs')
const filename = 'input.txt';

const input = fs.readFileSync(filename).toString();
const passports = input.split("\n\n").map(line => {return line.split("\n").join(" ")}).map(line => {return line.split(" ")});
const passportsWithoutPersonalInformation = passports.map(passport => { return passport.map( property => { return property.split(":")[0]} ) });

const fields = ['byr','iyr','eyr','hgt','hcl','ecl','pid'];

count = 0
passportsWithoutPersonalInformation.forEach(p => {
    let isValid = true;
    fields.forEach(f => {
        if (!p.includes(f)) {
            isValid = false;
        }
    });
    if (isValid) {
        count++;
    }
})

console.log(count)