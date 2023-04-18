


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

		const output = outputs[0];	

		const length = output[0].length;
		for (let i = 0; i < length; ++i) {

			// output[1][i] =
			output[0][i] = this.my.getSample();
			output[1][i] = output[1][i];
		}



		return true;
	}
}

registerProcessor('worklet', Worklet);

