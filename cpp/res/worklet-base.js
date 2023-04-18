


let v = null;

function receiveMessage(s){
  // console.log(s);
  if(v!=null) v.receiveMessage(s);
}


// import Module from './simple-kernel.wasmmodule.js';
// import {RENDER_QUANTUM_FRAMES, MAX_CHANNEL_COUNT, HeapAudioBuffer}
//   from './wasm-audio-helper.js';


class Worklet extends AudioWorkletProcessor {

	constructor() {
		super();
		console.log("STARTING");
		this.kernel = Module();
   
   		
		this.my = new this.kernel.SampletoyApp(sampleRate);
		this.receiveMessage("STARTING--")
		//  // Pre-allocate memory for the output buffer
		 this.bufferLength = 128; // Default buffer size in AudioWorkletProcessor

		 // this line crashes the thing

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
        // if (length !== this.bufferLength) {
        //     this.kernel._free(this.outputPtr);
        //     this.bufferLength = length;
        //     this.outputPtr = this.kernel._malloc(this.bufferLength * Float32Array.BYTES_PER_ELEMENT);
        //     this.outputHeap = new Float32Array(this.kernel.HEAPF32.buffer, this.outputPtr, this.bufferLength);
        // }

		try {
		this.my.getSamples(this.outputPtr, length)
		} catch(e) {
			this.receiveMessage("err: " + e)
		}
        // // Copy the generated sine wave from the Emscripten heap to the JavaScript output buffer
        // output.set(this.outputHeap)
		

		for (let i = 0; i < length; ++i) {
			output[0][i] = this.my.getSample();
			output[1][i] = output[0][i];
		}

		return true;
	}
}

registerProcessor('worklet', Worklet);

