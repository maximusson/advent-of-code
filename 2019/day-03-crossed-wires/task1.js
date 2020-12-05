const fs = require('fs')
const filename = 'input.txt';

// get input
const input = fs.readFileSync(filename).toString().split("\n");

// get points
const getPoints = (inputCode) => {
    let points = [{x:0, y:0}];
    inputCode.split(",").forEach(el => {
        const char = el.charAt(0);
        const num = parseInt(el.substring(1));

        for (let index = 0; index < num; index++) {
            let lastPoint = points[points.length-1];
            let nextPoint = {};
            if (char === "R") {
                nextPoint.x = lastPoint.x + 1;
                nextPoint.y = lastPoint.y;
            }
            if (char === "L") {
                nextPoint.x = lastPoint.x - 1;
                nextPoint.y = lastPoint.y;
            }
            if (char === "U") {
                nextPoint.x = lastPoint.x;
                nextPoint.y = lastPoint.y + 1;
            }
            if (char === "D") {
                nextPoint.x = lastPoint.x;
                nextPoint.y = lastPoint.y - 1;
            }
            points.push(nextPoint);            
        }
    })
    return points;
}

const wire1 = getPoints(input[0]);
const wire2 = getPoints(input[1]);

let distance = null;

for (let i = 0; i < wire1.length; i++) {
    let p1 = wire1[i];
    for (let j = 0; j < wire2.length; j++) {
        let p2 = wire2[j];
        if (p1.x === p2.x && p1.y === p2.y) {
            cur = Math.abs(p1.x) + Math.abs(p1.y);
            if (!distance) {
                distance = cur
            } else if (cur < distance ){
                distance = cur
            }
        }
    }   
}

console.log(distance);
