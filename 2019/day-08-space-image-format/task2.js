const fs = require('fs')

const input = fs.readFileSync('input.txt').toString();

const size = [25,6];
const n = size[0]*size[1];
const regex = new RegExp(`.{1,${n}}`,'g');
const regex2 = new RegExp(`.{1,${size[0]}}`,'g')

let layers = input.match(regex).map(layer => layer.match(regex2).map(line => line.split('')));

let image = layers[0].map(line => line);

for (let x = 0; x < size[0]; x++) {
    for (let y = 0; y < size[1]; y++) {
        const pixel = searchPixelThroughLayers(layers, x, y);
        image[y][x] = pixel;
    }
}

function searchPixelThroughLayers(layers, x, y) {
    for (let z = 0; z < layers.length; z++) {
        const pixel = layers[z][y][x];
        if (pixel === '1' || pixel === '0') return pixel;
    }
}

// beautify output
rows = [];
picture = '';
image.forEach(y => rows.push(y.join('')));
rows.forEach(line => picture += line + "\n");
console.log(picture.split('0').join(' ').split('1').join('#'))
