
// Check if AudioWorklet is available.
let isAudioWorkletAvailable = false;
let hasAudioWorkletDetected = false;

function detectAudioWorklet() {
	if (hasAudioWorkletDetected) return isAudioWorkletAvailable;

	const OfflineAudioContextConstructor =
			window.OfflineAudioContext || window.webkitOfflineAudioContext;
	let context = new OfflineAudioContextConstructor(1, 1, 10000);
	isAudioWorkletAvailable = Boolean(
		context && context.audioWorklet &&
		typeof context.audioWorklet.addModule === 'function');
	hasAudioWorkletDetected = true;
	return isAudioWorkletAvailable;
}


let noiseGenerator = null;

// import workletUrl from 'worklet:./audioWorklet.js';

const demoCode = async (context) => {
	window.startedLoading();
	await context.audioWorklet.addModule('../audioWorklet.js');//workletUrl);

	noiseGenerator = new AudioWorkletNode(context, 'worklet', {numberOfInputs: 1, numberOfOutputs: 1, outputChannelCount: [2]});

	noiseGenerator.connect(context.destination);
	noiseGenerator.port.onmessage = (e) => window.messageReceived(e.data);
	for(let i = 0; i < unsentMsgs.length; i++) {
		sendMsg(unsentMsgs[i]);
	}
	unsentMsgs = [];
	window.finishedLoading();
};

const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
let running = false;

let audioContext = null;

let unsentMsgs = [];



function startAudio() {

	if(!running) {
		if(audioContext==null) {
			audioContext = new AudioContextConstructor();
			demoCode(audioContext);  
		}

		audioContext.resume();
		running = true;
	} else {
		audioContext.suspend();
		running = false;
	}
}


function sendMsg(s) {
	if(noiseGenerator!=null) {
		console.log(s);

		noiseGenerator.port.postMessage(s);
	} else {
		unsentMsgs.push(s);
	}
}
window.startAudioFn = startAudio;
window.sendMsg = sendMsg;