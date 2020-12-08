class Computer {
    constructor(program){
        this.program = program.slice(0); // pass by value
        this.isTerminated = false;
        this.instructionPointer = 0;
        this.history = [];
        this.accumulator = 0;
        this.warning = {}; // 
    }
    run(){
        while (!this.isTerminated) {
            // console.slog('instruction pointer', this.instructionPointer)
            if (this.instructionPointer >= this.program.length) {
                this.warning = { id: 1, message: 'WARNING: instruction pointer out of program' };
                return this.accumulator;
            };
            const line = this.program[this.instructionPointer];
            const operation = line.split(' ')[0];
            const argument = line.split(' ')[1];
            switch(operation) {
                case 'acc':
                    this.accumulator += parseInt(argument);
                    this.history.push(this.instructionPointer);
                    this.instructionPointer++;
                    break;
                case 'jmp':
                    this.history.push(this.instructionPointer);
                    this.instructionPointer += parseInt(argument);
                    break;
                case 'nop':
                    this.history.push(this.instructionPointer);
                    this.instructionPointer++;
                    break;
                default:
                    console.log();
                    this.warning = { id: 2, message: 'WARNING: undefined operation - ' + operation + ' with argument ' + argument };
                    break;
            }

            if (this.history.includes(this.instructionPointer)) {
                this.warning = { id: 3, message: 'WARNING: you probably have an infinite loop' };
                this.isTerminated = true;
            }
        }
        return this.accumulator;
    }
}

module.exports = Computer;