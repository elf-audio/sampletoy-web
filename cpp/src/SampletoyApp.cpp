
#include "SampletoyApp.h"

#include "Global.h"
#include <future>

Global G;


SampletoyApp::SampletoyApp(double sampleRate) {

	G.init();

	recorder = &G.recorder;
	G.filter = &filter;
	G.delayL = &delayL;
	G.delayR = &delayR;
	
	G.settings.audio = audio;
	G.settings.preview = preview;
	G.settings.length = &length;
}



//--------------------------------------------------------------
void SampletoyApp::update() {


	if(wasLastRecording && !recorder->recording) {
		// recording finished
		// --- cogMenu->recordingFinished();
	}
	
	
	wasLastRecording = recorder->recording;
	wasLastPlaying = recorder->playingBack;

}


// bool SampletoyApp::openUrl(string url) {
// 	audioFileBuff.clear();
// 	int outNumChans;
// 	int outSamplerate;
	
// 	if(AudioFile::load(url, audioFileBuff, &outNumChans, &outSamplerate)) {
		
// 		if(outNumChans==2) {
// 			// make mono
// 			for(int i = 0; i < audioFileBuff.size() / 2; i++) {
// 				audioFileBuff[i] = (audioFileBuff[i*2] + audioFileBuff[i*2+1]) * 0.5;
// 			}
// 			audioFileBuff.resize(audioFileBuff.size()/2);
// 		}
// 		mustLoadAudioFile = true;

// 	} else {
		
// 		printf("Attempting to load non-audio file\n");
		
// 		////
// 		//
// 		// YOU NEED TO WARN PEOPLE YOU'RE DOING THIS
// 		// IE LOADING ANY FILE - LIUTTLE POPUP SHOULD DO
// 		// ALSO, NEED TO MAKE A BETTER NUMBER FOR THE SAMPLE DATA - RATHER
// 		// THAN TRYING TO CAST DIRECTLY TO FLOAT, MAYBE CAST TO uint16_t and convert
// 		//
// 		//
// 		//
// 		// can't read normal file, lets go binary
		
		
// 		NSURL *nsurl = [NSURL URLWithString:[NSString stringWithUTF8String:url.c_str()]];
// 		string path = [nsurl.path UTF8String];
// 		FILE *f = fopen(path.c_str(), "r");
// 		if (f!=NULL) {
// 			fseek (f, 0 , SEEK_END);
// 			int fsize = ftell (f);
// 			rewind (f);
			
// 			bool done = false;
// 			int  buffSizeBytes = 256;
// 			vector<uint16_t> buff(buffSizeBytes/sizeof(uint16_t));
// 			vector<float> floatBuff(buff.size());
			
			
// 			while(!done) {
// 				int numBytesRead = fread((void*)(buff.data()), buffSizeBytes, 1, f);

// 				for(int i = 0; i < buff.size(); i++) {
// 					floatBuff[i] = (float)buff[i] / 32767.f;
// 				}
// 				audioFileBuff.insert(audioFileBuff.end(), floatBuff.begin(), floatBuff.end());
				
				
				
// 				if(numBytesRead!=buffSizeBytes) done = true;
// 			}
			
			
			
			
			
// 			confirmDialog("Non-audio file", "This file doesn't contain audio, do you want Sampletoy to load it as audio ANYWAY?",
// 						  [&,url](){ // ok pressed
// 							mustLoadAudioFile = true;
// 						  },
// 						  [&](){ // cancel pressed
// 							  audioFileBuff.clear();
// 						  });
// 		} else {
// 			// printf("---------\n");
// 			// perror("Error");
// 			// printf("---------\n");
// 			// alertDialog("File read error", "Sorry, Sampletoy cannot read that file");
// 		}
		
		
		
// 	}
	
// 	return true;
// }


double phase = 0;
float SampletoyApp::getSample() {
	phase += 2.0 * 3.141 * 256.0 / 48000.f;

	return sin(phase) * 0.5f;
}

void SampletoyApp::getSamples(float *samples, int length) {
	// format is non-interleaved, LLLLLLLRRRRRRR
	for(int i = 0; i < length; i++) {
		samples[i] =samples[i+length] = getSample();

	}
}