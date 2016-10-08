var vm = vm || {};

vm.Memory = (function () {
	let mem = {};

	function init(memSize) {

		for (let i = memSize - 1; i >= 0; i--) {
			mem[i] = null;
		}
		return mem;
	}

	function read(address) {
		return mem[address];
	}

	function write(address, value) {
		mem[address] = value;
	}

	function addressInRange(address) {
		if(address >= getMemSize()) {
			throw new Error("Memory Address out of range. [" + address + "]");
		}

		return address < getMemSize();
	}

	function getMemSize() {
		let size = 0;
		let key = null;

		for(key in mem) {
			if(mem.hasOwnProperty(key)) size++;
		}

		return size;
	}

	return {
		init: init,
		read: read,
		write: write,
		addressInRange: addressInRange
	};
})();