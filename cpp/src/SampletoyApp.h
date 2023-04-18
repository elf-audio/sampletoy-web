#pragma once

#define SPLIT_SOUND_STREAM

#include "Global.h"
#include "InterpolatingDelay.h"
#include "MarekFilter.h"
#include "Recorder.h"
#include "FloatBuffer.h"


#define LENGTH 441000
#define SAMPLERATE 44100
#define BUFFER_SIZE 256

class SampletoyApp  {
	
public:
SampletoyApp(double sampleRate);
	void setup();


	void update();

	bool lastTimeRecording = false;
	
	////////////////////////////////////
	// AUDIO STUFF
	InterpolatingDelay delayL;
	InterpolatingDelay delayR;
	Filter filter;
	Recorder *recorder;
	
	void audioIn( float * output, int bufferSize, int nChannels );
	void audioOut( float * output, int bufferSize, int nChannels );

	float getSample();
	void getSamples(float *samples, int length);
	void getSamplesI(uintptr_t input, int length) {
		float* ptr = reinterpret_cast<float*>(input);
		getSamples(ptr, length);
	}
	void getSamplesF(const float (&input)[8192], int length) {
		getSamples((float*)input, length);
	}
	void getSamplesV(std::vector<float> &v, int length) {
		getSamples(v.data(), length);
	}
	void startRecording();
	void stopRecording();

	int length = 0;
	
	float actualCutoff = 500;
	
	float audio[LENGTH];
	float preview[LENGTH];
	float cursors[20];
	
	bool wasLastRecording = false;
	bool wasLastPlaying = false;
	
	FloatBuffer audioFileBuff;
	bool mustLoadAudioFile = false;

};
