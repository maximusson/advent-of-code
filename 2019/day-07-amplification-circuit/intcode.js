class Intcode {
    constructor(program, phase){
        this.program = program.slice(0); // pass by value
        this.inputs = [phase];
        this.output = null;
        this.isRunning = true;
        this.i = 0;
    }
    run(){
        let next = 0;
        this.output = null;

        outside:
        while (this.isRunning){
            this.i += next;
            const command = ('00000' + this.program[this.i]).slice(-5);
            const opcode = parseInt(command.slice(-2));
            const modeParameter1 = parseInt(command.charAt(2));
            const modeParameter2 = parseInt(command.charAt(1));
            const modeParameter3 = parseInt(command.charAt(0));

            let val1;
            let val2;
            let val3;
            let pos1;
            let pos3;

            switch (opcode) {
                case 1:
                    val1 = getValue(this.program, this.i+1, modeParameter1);
                    val2 = getValue(this.program, this.i+2, modeParameter2);
                    val3 = val1 + val2;
                    pos3 = getPosition(this.program, this.i+3, modeParameter3);
                    this.program[pos3] = `${val3}`;
                    next = 4;      
                    break;
                case 2:
                    val1 = getValue(this.program, this.i+1, modeParameter1);
                    val2 = getValue(this.program, this.i+2, modeParameter2);
                    val3 = val1 * val2;
                    pos3 = getPosition(this.program, this.i+3, modeParameter3);
                    this.program[pos3] = val3;
                    next = 4;       
                    break;
                case 3:
                    pos1 = getPosition(this.program, this.i+1, modeParameter1);
                    this.program[pos1] = this.inputs.shift();
                    next = 2;
                    break;
                case 4:
                    val1 = getValue(this.program, this.i+1, modeParameter1);
                    this.output = val1;
                    next = 2;
                    this.i += next;
                    break outside;
                case 5:
                    val1 = getValue(this.program, this.i+1, modeParameter1);
                    val2 = getValue(this.program, this.i+2, modeParameter2);
                    if (val1 != 0) {
                        this.i = val2;
                        next = 0;
                    } else {
                        next = 3;
                    }
                    break;
                case 6:
                    val1 = getValue(this.program, this.i+1, modeParameter1);
                    val2 = getValue(this.program, this.i+2, modeParameter2);
                    if (val1 === 0) {
                        this.i = val2;
                        next = 0;
                    } else {
                        next = 3;
                    }
                    break;
                case 7:
                    val1 = getValue(this.program, this.i+1, modeParameter1);
                    val2 = getValue(this.program, this.i+2, modeParameter2);
                    pos3 = getPosition(this.program, this.i+3, modeParameter3);
                    if (val1 < val2) {
                        val3 = 1;
                    } else {
                        val3 = 0;
                    }
                    next = 4;
                    this.program[pos3] = val3;
                    break;
                case 8:
                    val1 = getValue(this.program, this.i+1, modeParameter1);
                    val2 = getValue(this.program, this.i+2, modeParameter2);
                    pos3 = getPosition(this.program, this.i+3, modeParameter3);
                    if (val1 === val2) {
                        val3 = 1;
                    } else {
                        val3 = 0;
                    }
                    next = 4;
                    this.program[pos3] = val3;
                    break;
                case 99:
                    // next = 0;
                    this.isRunning = false;
                    break;
                default:
                    console.log("error in line ", this.i, "opcode: ", opcode);
                    this.isRunning = false;
                    break;
            }
        }
        return this.output;
    }
    addInput(input){
        this.inputs.push(input);
    }
    getOutput() {
        return this.output;
    }
}

function getValue(program, pos, mode) {
    if (mode === 1) {
        return parseInt(program[pos]);    
    } else if (mode === 0) { 
        return parseInt(program[program[pos]]);
    } else {
        console.log('error [getValue] - unknown mode');
    }
}

function getPosition(program, pos, mode) {
    if (mode === 1) {
        return parseInt(program[program[pos]]);
        console.log('warning [getPosition] - immediate mode unusual')
    } else if (mode === 0) { 
        return parseInt(program[pos]);
    } else {
        console.log('error [getPosition] - unknown mode');
    }
}

module.exports = Intcode;