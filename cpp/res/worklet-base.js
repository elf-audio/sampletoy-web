


let v = null;

function receiveMessage(s){
  // console.log(s);
  if(v!=null) v.receiveMessage(s);
}


class Worklet extends AudioWorkletProcessor {

	constructor() {
		super();
		console.log("STARTING");
		this.kernel = Module();
   
   		
		this.my = new this.kernel.SampletoyApp(sampleRate);

		// Allocate memory in the Emscripten heap for the audio data
		// WARNING: this never gets deallocated! 
		// this.audioDataPtr = this.module._malloc(8192 * Float32Array.BYTES_PER_ELEMENT);
		//	it should be deallocated with a call like this:
		// this.module._free(audioDataPtr);

		

		this.port.onmessage = (event) => {
			// Handling data from the node.
			this.my.sendCommand(event.data);
		};
		v = this;
	}

	receiveMessage(s) {
		this.port.postMessage(s);
		// console.log("WORKLET", s);
	}
	
	process(inputs, outputs, parameters) {

		// const output = outputs[0];	

		// const length = output[0].length;
		// this.my.getSamples(this.audioDataPtr, length)

		const output = outputs[0][0];	

		const length = output.length;
		this.my.getSamples(output, length)

		// for (let i = 0; i < length; ++i) {

		// 	// output[1][i] =
		// 	output[0][i] = this.my.getSample();
		// 	output[1][i] = output[1][i];
		// }



		return true;
	}
}

registerProcessor('worklet', Worklet);

