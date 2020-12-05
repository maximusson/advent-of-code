class Intcode {
    constructor(program, noun, verb){
        this.program = program.slice(0); // pass by value
        this.noun = noun;
        this.verb = verb;
    }
    init(){
        this.program[1] = this.noun;
        this.program[2] = this.verb;
    }
    run(){
        // run program
        for (let i = 0; i < this.program.length; i = i+4) {
            let opcode = parseInt(this.program[i]);
            let pos1 = parseInt(this.program[i+1]);
            let pos2 = parseInt(this.program[i+2]);
            let pos3 = parseInt(this.program[i+3]);
            let val1 = parseInt(this.program[pos1]);
            let val2 = parseInt(this.program[pos2]);
            let val3 = 0;
            let bExit = false;

            switch (opcode) {
                case 1:
                    val3 = val1 + val2;
                    this.program[pos3] = val3;
                    break;
                case 2:
                    val3 = val1 * val2;
                    this.program[pos3] = val3;        
                    break;
                case 99:
                    // console.log("end of program");
                    bExit = true;
                    break;
                default:
                    console.log("error in line ", i, "opcode: ", opcode);
                    break;
            }

            if (bExit) {
                break;
            }
        }
    }
    returnFirstPositionOfProgram(){
        return parseInt(this.program[0]);
    }
    resultTask2(){
        return parseInt(this.program[1])*100 + parseInt(this.program[2]);
    }
}

module.exports = Intcode;
