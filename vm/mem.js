var vm = vm || {};

vm.Memory = (function () {
	let mem = {};

	function init(memSize) {

		var memRecurse = function(index) {
			if(index > 0) {
				mem[--index] = null;
				return memRecurse(index);
			} else {
				return mem;
			}
		}

		return memRecurse(memSize);
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