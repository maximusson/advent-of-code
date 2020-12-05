const fs = require('fs')
const filename = 'input.txt';

const input = fs.readFileSync(filename).toString();
const passports = input.split("\n\n").map(line => {return line.split("\n").join(" ")}).map(line => {return line.split(" ")});
const passportsWithPersonalInformation = passports.map(passport => { return passport.map( property => { return property.split(":")} ) });

const fields = ['byr','iyr','eyr','hgt','hcl','ecl','pid'];

count = 0
passportsWithPersonalInformation.forEach(keyValues => {
    let hasValidKeys = true;
    let keys = keyValues.map(keyValue => {return keyValue[0]});
    fields.forEach(field => {
        if (!keys.includes(field)) {
            hasValidKeys = false;
        }
    });
    
    if (hasValidKeys) {
        hasValidFields = true;

        const birthYear = keyValues.find(keyValue => keyValue[0] === 'byr')[1];
        if (!/^(19[2-9][0-9]|200[0-2])$/.test(birthYear)) {hasValidFields = false;}

        const issueYear = keyValues.find(keyValue => keyValue[0] === 'iyr')[1];
        if (!/^(201[0-9]|2020)$/.test(issueYear)) {hasValidFields = false;}

        const expirationYear = keyValues.find(keyValue => keyValue[0] === 'eyr')[1];
        if (!/^(202[0-9]|2030)$/.test(expirationYear)) {hasValidFields = false;}

        const height = keyValues.find(keyValue => keyValue[0] === 'hgt')[1];
        if (!/^([1][5-8][0-9][c][m]|[1][9][0-3][c][m]|[5][9][i][n]|[6][0-9][i][n]|[7][0-6][i][n])$/.test(height)) {hasValidFields = false;}

        const hairColor = keyValues.find(keyValue => keyValue[0] === 'hcl')[1];
        if (!/^(#[0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f])$/.test(hairColor)) {hasValidFields = false;}

        const eyeColor = keyValues.find(keyValue => keyValue[0] === 'ecl')[1];
        if (!/^([a][m][b]|[b][l][u]|[b][r][n]|[g][r][y]|[g][r][n]|[h][z][l]|[o][t][h])$/.test(eyeColor)) {hasValidFields = false;}

        const passportID = keyValues.find(keyValue => keyValue[0] === 'pid')[1];
        if (!/^([0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9])$/.test(passportID)) {hasValidFields = false;}       

        if (hasValidFields) {
            count++;
        }
    }
})

console.log(count)
