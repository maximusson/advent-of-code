class Intcode {
    constructor(program, parameter){
        this.program = program.slice(0); // pass by value
        this.parameter = parameter;
    }
    run(){
        const debugmode = false;
        let next = 0;
        let i = 0;
        let bRun = true;
        while (bRun){
            if (debugmode) console.log("start", i, next);
            i += next;
            let command = ('00000' + this.program[i]).slice(-5);
            let opcode = parseInt(command.slice(-2));
            let modeParameter1 = parseInt(command.charAt(2));
            let modeParameter2 = parseInt(command.charAt(1));
            let modeParameter3 = parseInt(command.charAt(0));

            let val1 = 0;
            let val2 = 0;
            let val3 = 0;
            let pos1 = 0;
            let pos2 = 0;
            let pos3 = 0;

            if (debugmode) console.log("pointer i", i, " - opcode", opcode, "command", command);

            switch (opcode) {
                case 1:
                    val1 = getValue(this.program, i+1, modeParameter1);
                    val2 = getValue(this.program, i+2, modeParameter2);
                    val3 = val1 + val2;
                    pos3 = getPosition(this.program, i+3, modeParameter3);
                    this.program[pos3] = val3;
                    next = 4;
                    if (debugmode) console.log("val1", val1, "val2", val2, "val3", val3, "pos3", pos3);       
                    break;
                case 2:
                    val1 = getValue(this.program, i+1, modeParameter1);
                    val2 = getValue(this.program, i+2, modeParameter2);
                    val3 = val1 * val2;
                    pos3 = getPosition(this.program, i+3, modeParameter3);
                    this.program[pos3] = val3;
                    next = 4;       
                    break;
                case 3:
                    pos1 = getPosition(this.program, i+1, modeParameter1);
                    this.program[pos1] = this.parameter;
                    next = 2;
                    if (debugmode) console.log("val1", this.parameter, "pos1", pos1);
                    break;
                case 4:
                    val1 = getValue(this.program, i+1, modeParameter1);
                    this.parameter = val1;
                    next = 2;
                    //console.log("val1", val1)
                    break;
                case 5:
                    val1 = getValue(this.program, i+1, modeParameter1);
                    val2 = getValue(this.program, i+2, modeParameter2);
                    if (val1 != 0) {
                        i = val2;
                        next = 0;
                        console.log("val1", val1, "val2", val2, "i", i, "next", next)
                    } else {
                        next = 3;
                        console.log("val1", val1, "val2", val2, "next", next)
                    }
                    break;
                case 6:
                    val1 = getValue(this.program, i+1, modeParameter1);
                    val2 = getValue(this.program, i+2, modeParameter2);
                    if (val1 === 0) {
                        i = val2;
                        next = 0;
                        console.log("val1", val1, "val2", val2, "i", i, "next", next)
                    } else {
                        next = 3;
                        console.log("val1", val1, "val2", val2, "next", next)
                    }
                    break;
                case 7:
                    val1 = getValue(this.program, i+1, modeParameter1);
                    val2 = getValue(this.program, i+2, modeParameter2);
                    pos3 = getPosition(this.program, i+3, modeParameter3);
                    if (val1 < val2) {
                        val3 = 1;
                    } else {
                        val3 = 0;
                    }
                    next = 4;
                    this.program[pos3] = val3;
                    break;
                case 8:
                    val1 = getValue(this.program, i+1, modeParameter1);
                    val2 = getValue(this.program, i+2, modeParameter2);
                    pos3 = getPosition(this.program, i+3, modeParameter3);
                    if (val1 === val2) {
                        val3 = 1;
                    } else {
                        val3 = 0;
                    }
                    next = 4;
                    this.program[pos3] = val3;
                    if (debugmode) console.log("val1", val1, "val2", val2, "val3", val3, "pos3", pos3);
                    break;
                case 99:
                    if (debugmode) console.log("end of program");
                    next = 0;
                    bRun = false;
                    break;
                default:
                    console.log("error in line ", i, "opcode: ", opcode);
                    bRun = false;
                    break;
            }
            if (debugmode) console.log(this.program);
        }
    }
    result() {
        console.log(this.parameter);
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