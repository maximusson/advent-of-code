class Slope {
    constructor(input, right, down){
        this.input = input.slice(0); // pass by value
        this.right = right;
        this.down = down;
    }
    countTrees(){
        let map = this.input.map(line => line.split(''));

        let trees = 0;
        let col = this.right;
        for (let row = this.down; row < map.length; row += this.down) {
            if (map[row][col % map[0].length] === '#') {
                trees++;
            }
            col += this.right;
        }
        return trees;
    }
}

module.exports = Slope;
