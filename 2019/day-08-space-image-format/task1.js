const fs = require('fs')

const input = fs.readFileSync('input.txt').toString();

const size = [25,6];
const n = size[0]*size[1];
const regex = new RegExp(`.{1,${n}}`,'g');
let layers = input.match(regex);

layers = layers.map(layer => [layer, layer.split('0').length - 1]);
const minNumberOfZeros = Math.min(...layers.map(data => data[1]));

const [layer,] = layers.filter(data => data[1] === minNumberOfZeros)[0];

const countOne = layer.split('1').length-1;
const countTwo = layer.split('2').length-1;

console.log(countOne * countTwo)

