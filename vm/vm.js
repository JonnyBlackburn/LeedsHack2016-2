var vm = vm || {};

vm.init = function init() {
	vm.Memory.init(10);
	vm.pc = 0;
	vm.accumulator = null;
	vm.labels = {};
	vm.output = [];
}

vm.parseLabels = function(instructions) {
	if(instructions.length > 0) {
		vm.labels = {};
		vm.pc = 0;

		while(vm.pc < instructions.length) {
			if(instructions[vm.pc].match(/^[\w\d]+(?=:)/ig)) {
				vm.labels[instructions[vm.pc].substring(0, instructions[vm.pc].length - 1)] = vm.pc;
			}

			vm.pc++;
		}
	}
}

vm.execute = function(instr, inpt) {
	if(instr.length > 0 && inpt.length > 0) {
		let instructions = instr.split("\n");
		let input = inpt.split(" ");

		vm.parseLabels(instructions);
		vm.pc = 0;

		while(vm.pc < instructions.length) {
			let tokenAndParams = instructions[vm.pc].split(" ");

			switch(tokenAndParams[0]) {
				case "IBX": //Get from the input and put into the accumulator
					vm.accumulator = parseInt(input.shift());
					break;
				case "OBX": //Put whats in the accumulator into the output
					vm.output.push(vm.accumulator);
					vm.accumulator = null;
					break;
				case "ADD": //Add what is at the address to the accumulator
					if(vm.Memory.addressInRange(tokenAndParams[1]) && vm.nullParamCheck(tokenAndParams) && vm.accumulator !== null) {
						vm.accumulator += parseInt(vm.Memory.read(tokenAndParams[1]));
					}
					break;
				case "SUB": //Subtract what is at the address to the accumulator
					if(vm.Memory.addressInRange(tokenAndParams[1]) && vm.nullParamCheck(tokenAndParams) && vm.accumulator !== null) {
						vm.accumulator -= parseInt(vm.Memory.read(tokenAndParams[1]));
					}
					break;
				case "CPYT": //Copy To the memory address from accumulator
					if(vm.Memory.addressInRange(tokenAndParams[1])) {
						vm.Memory.write(tokenAndParams[1], vm.accumulator);
					}
					break;
				case "CPYF": //Copy From the memory address to the accumulator
					if(vm.Memory.addressInRange(tokenAndParams[1])) {
						vm.accumulator = parseInt(vm.Memory.read(tokenAndParams[1]));
					}
					break;
				case "JMP": //Jump to the label
					vm.pc = vm.labels[tokenAndParams[1]];
					break;
				case "JMPZ": //Jump to the label if the accumulator is 0
					if(vm.accumulator === 0) {
						vm.pc = vm.labels[tokenAndParams[1]];
					}
					break;
				case "JMPN": //Jump to the label if the accumulator is less than 0
					if(vm.accumulator < 0) {
						vm.pc = vm.labels[tokenAndParams[1]];
					}
					break;
			}
			vm.pc++;
		}

		return vm.output;
	}
}

vm.nullParamCheck = function(tokenAndParams) {
	if(tokenAndParams[1] === null) {
		throw new Error("Null reference error: " + tokenAndParams);
	}

	return true;
}
