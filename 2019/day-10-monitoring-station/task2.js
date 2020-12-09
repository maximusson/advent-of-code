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

// get laser station and remove asteroid from collection
const laser = asteroids.filter(el => el.visibles === Math.max(...asteroids.map(el => el.visibles)))[0];
const index = asteroids.reduce((arr, el, i) => {
    if (el.visibles === Math.max(...asteroids.map(el => el.visibles))) arr.push(i);
    return arr;
}, []);
asteroids.splice(index, 1);

// add radius and angle in degree to asteroids collection
asteroids.forEach(p2 => {
    p2.radius = getLengthOfVector(laser, p2);
    p2.angle = calcAngleDegrees(laser, p2);
})

// get unique list of all angles and sort it
const anglesUnique = [...new Set(asteroids.map(el => el.angle))];
anglesUnique.sort((a, b) => (a > b) ? 1 : -1);

count = 0;
while (asteroids.length > 0) {
    anglesUnique.forEach(angle => {
        const asteroidsToBeLasered = asteroids.filter(el => el.angle === angle);
        if (asteroidsToBeLasered.length > 0) {
            // sort
            asteroidsToBeLasered.sort((a, b) => (a.radius > b.radius) ? 1 : -1)
            // find index of lasered asteroid in asteroirds
            const index = asteroids.reduce((arr, el, i) => {
                if (asteroidsToBeLasered[0].x === el.x && asteroidsToBeLasered[0].y === el.y) arr.push(i);
                return arr;
            }, []);
            asteroids.splice(index, 1);
            count++;
            
            if (count === 200) {
                console.log(asteroidsToBeLasered[0].x * 100 + asteroidsToBeLasered[0].y)
            }
            // output
            //matrix[asteroidsToBeLasered[0].y][asteroidsToBeLasered[0].x] = count;
            //console.log(matrix.map(line => line.join("")));
        }
    });
}


function calcAngleDegrees(p1, p2) {
    // get angle, note that start angle shifted by 90 degrees here
    const phi0 = 90;
    let angle = Math.atan2((p2.y-p1.y), (p2.x-p1.x)) * 180 / Math.PI;
    angle = angle + 90 ;
	if (angle < 0) angle = angle + 360; 
  	return angle;
}

function getLengthOfVector(p1, p2) {
    // pythagors p1-p2
    return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
}

function isPointOnLine(p1, p2, p3) {
    // checks if p3 is on a line that goes through p1 and p2
    if ((p3.x - p1.x) * (p1.y - p2.y) - (p3.y - p1.y) * (p1.x - p2.x) === 0) {
        return true;
    } else {
        return false;
    }
}

function isPointInBetween(p1, p2, p3) {
    // checks if p3 is within a rectangle betwenn p1 and p2
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