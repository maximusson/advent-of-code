const fs = require('fs')
const filename = 'input.txt';

let input = fs.readFileSync(filename).toString().split("\n");
let ids = input.map(line => {
    let row = [0,127];
    let col = [0,7];
    let cur = [0,0];
    line.split("").forEach(l => {
        switch(l) {
            case "F":
                cur[0] = row[0];
                cur[1] = row[0]+(row[1]-row[0]+1)/2-1;
                row = cur.slice(0);
                break;
            case "B":
                cur[0] = row[0]+(row[1]-row[0]-1)/2+1;
                cur[1] = row[1];
                row = cur.slice(0);
                break;
            case "L":
                cur[0] = col[0];
                cur[1] = col[0]+(col[1]-col[0]+1)/2-1;
                col = cur.slice(0);           
                break;
            case "R":
                cur[0] = col[0]+(col[1]-col[0]-1)/2+1;
                cur[1] = col[1];
                col = cur.slice(0);
                break;
        }
    });
    return (row[0] * 8 + col[0]);
});

for (let i = Math.min(...ids); i <= Math.max(...ids); i++) {
    if (!ids.includes(i)) {
        console.log(i)
    }
}