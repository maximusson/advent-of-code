const fs = require('fs')

const input = fs.readFileSync('input.txt').toString();
const matrix = input.split("\n").map(row => row.split('').map(cell => cell));

const asteroids = [];
for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[0].length; x++) {
        if (matrix[y][x] === '#') {
            const asteroid = {};
            asteroid.x = x;
            asteroid.y = y;
            asteroid.visibles = 0;
            asteroids.push(asteroid);
        }
    }
}

// p1 is base, p2 is asteroid to check, p3 could be between p1 and p2
asteroids.forEach(p1 => {
    asteroids.forEach(p2 => {
        if (p1 !== p2) {
            let p2CanBeSeenByP1 = true;
            asteroids.forEach(p3 => {
                if (p1 !== p2 && p1 !== p3 && p2 !== p3) {
                    if (isPointOnLine(p1,p2,p3)) {
                        if (isPointInBetween(p1,p2,p3)) {
                            p2CanBeSeenByP1 = false;
                        }
                    }
                }   
            }); 
            if (p2CanBeSeenByP1) p1.visibles++;
        }
    });
});

console.log(Math.max(...asteroids.map(el => el.visibles)))


function isPointOnLine(p1, p2, p3) {
    if ((p3.x - p1.x) * (p1.y - p2.y) - (p3.y - p1.y) * (p1.x - p2.x) === 0) {
        return true;
    } else {
        return false;
    }
}

function isPointInBetween(p1, p2, p3) {
    let maxX = p1.x;
    if (p2.x > p1.x) maxX = p2.x;
    let minX = p1.x;
    if (p2.x < p1.x) minX = p2.x;
    let maxY = p1.y;
    if (p2.y > p1.y) maxY = p2.y;
    let minY = p1.y;
    if (p2.y < p1.y) minY = p2.y;
    
    if (p3.x >= minX && p3.x <= maxX && p3.y >= minY && p3.y <= maxY) {
        return true;
    } else {
        return false;
    }
}