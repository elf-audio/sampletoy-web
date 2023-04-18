


let v = null;

function receiveMessage(s){
  // console.log(s);
  if(v!=null) v.receiveMessage(s);
}


class Worklet extends AudioWorkletProcessor {

	constructor() {
		super();

		this.kernel = Module();
   
		this.getSamples = this.kernel.cwrap('getSamples', 'number', ['number', 'number']);

		// Pre-allocate memory for the output buffer
		this.bufferLength = 128; // Default buffer size in AudioWorkletProcessor

		this.outputPtr = this.kernel._malloc(this.bufferLength * Float32Array.BYTES_PER_ELEMENT);
		this.outputHeap = new Float32Array(this.kernel.HEAPF32.buffer, this.outputPtr, this.bufferLength);
		
		this.port.onmessage = (event) => {
			// Handling data from the node.
			this.my.sendCommand(event.data);
		};
		this.receiveMessage("DONE--")
		v = this;
	}

	receiveMessage(s) {
		this.port.postMessage(s);
		// console.log("WORKLET", s);
	}
	
	process(inputs, outputs, parameters) {

		const output = outputs[0];	
		const length = output[0].length;

        // // Check if buffer size changed and reallocate memory if needed
        if (length !== this.bufferLength) {
            this.kernel._free(this.outputPtr);
            this.bufferLength = length;
            this.outputPtr = this.kernel._malloc(this.bufferLength * Float32Array.BYTES_PER_ELEMENT);
            this.outputHeap = new Float32Array(this.kernel.HEAPF32.buffer, this.outputPtr, this.bufferLength);
        }

		this.getSamples(this.outputPtr, length)
	    output[0].set(this.outputHeap)
		
		return true;
	}
}

registerProcessor('worklet', Worklet);

