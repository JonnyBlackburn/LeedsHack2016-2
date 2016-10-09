var vm = vm || {};

vm.execute = function(instr, inpt) {
	if(instr.length > 0 && inpt.length > 0) {
		let instructions = instr.split("\n");
		let input = inpt.split(" ");
		let labels = vm.parseLabels(instructions);

		vm.Memory.init(10);

		var executeRecurse = function(index, accumulator, output) {
			if(index < instructions.length) {
				let tokenAndParams = instructions[index].split(" ");

				switch(tokenAndParams[0]) {
					case "IBX": //Get from the input and put into the accumulator
						accumulator = parseInt(input.shift());
						break;
					case "OBX": //Put whats in the accumulator into the output
						output.push(accumulator);
						accumulator = null;
						break;
					case "ADD": //Add what is at the address to the accumulator
						if(vm.Memory.addressInRange(tokenAndParams[1]) && vm.nullParamCheck(tokenAndParams) && accumulator !== null) {
							accumulator += parseInt(vm.Memory.read(tokenAndParams[1]));
						}
						break;
					case "SUB": //Subtract what is at the address to the accumulator
						if(vm.Memory.addressInRange(tokenAndParams[1]) && vm.nullParamCheck(tokenAndParams) && accumulator !== null) {
							accumulator -= parseInt(vm.Memory.read(tokenAndParams[1]));
						}
						break;
					case "CPYT": //Copy To the memory address from accumulator
						if(vm.Memory.addressInRange(tokenAndParams[1])) {
							vm.Memory.write(tokenAndParams[1], accumulator);
						}
						break;
					case "CPYF": //Copy From the memory address to the accumulator
						if(vm.Memory.addressInRange(tokenAndParams[1])) {
							accumulator = parseInt(vm.Memory.read(tokenAndParams[1]));
						}
						break;
					case "JMP": //Jump to the label
						index = labels[tokenAndParams[1]];
						break;
					case "JMPZ": //Jump to the label if the accumulator is 0
						if(accumulator === 0) {
							index = labels[tokenAndParams[1]];
						}
						break;
					case "JMPN": //Jump to the label if the accumulator is less than 0
						if(accumulator < 0) {
							index = labels[tokenAndParams[1]];
						}
						break;
					case "I2A": //Convert an integer to ASCII char and outputs it
						output.push(String.fromCharCode(accumulator));
						accumulator = null;
						break;
				}

				return executeRecurse(index + 1, accumulator, output);
			} else {
				return output;
			}
		}

		return executeRecurse(0, null, []);;
	}
}

vm.parseLabels = function(instructions) {
	if(instructions.length > 0) {
		var labelRecurse = function(index, labels) {
			if(index < instructions.length) {
				if(instructions[index].match(/^[\w\d]+(?=:)/ig)) {
					labels[instructions[index].substring(0, instructions[index].length - 1)] = index;
				}
				return labelRecurse(index + 1, labels);
			} else {
				return labels;
			}
		}

		return labelRecurse(0, {});
	}
}

vm.nullParamCheck = function(tokenAndParams) {
	if(tokenAndParams[1] === null) {
		throw new Error("Null reference error: " + tokenAndParams);
	}

	return true;
}
