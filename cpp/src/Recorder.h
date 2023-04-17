/*
 *  Recorder.h
 *  sampletoy
 *
 *  Created by Marek Bereza on 20/01/2010.
 *  Copyright 2010 __MyCompanyName__. All rights reserved.
 *
 */
#pragma once

#include <string>

#include "WavFile.h"

class Recorder {
private:
	
	// info about what's being recorded currently
	int numChannels;
	
	// number of frames to record
	int recordLength;
	
	// where are we in the recording?
	int recordPos;
	
	// record into here
	float *recordBuffer;
	
	int playbackPos;

public:
	
	// are we recording
	bool recording;

	// ready to record, but not started yet.
	bool armed;
	
	// are we playing back?
	bool playingBack;
	
	// how long we've recorded for (from 0 - 1) 
	float progress;
	
	float playbackProgress;
	
	Recorder() {
		recordBuffer = NULL;
		armed = false;
		playingBack = false;
		progress = 0;
		playbackProgress = 0;
	}
	
	float *samples;
	
	
	// call this to set up recording
	void arm(int _recordLength, int _numChannels) {
		if(recording) return;
		armed = true;
		recordLength  = _recordLength;
		numChannels = _numChannels;
		// prepare the buffer!!
		if(recordBuffer!=NULL) delete [] recordBuffer;
		recordBuffer = new float[recordLength*numChannels];
	}
	
	void startRecording() {
		if(armed) {
			armed = false;
			recording = true;
			recordPos = 0;
			progress = 0;
		}
	}
	
	void stopRecording() {
		recording = false;
		armed = false;
		recordLength = recordPos;
	}
	
	
	// call this in the audio in callback if recording is true
	void record(float *in, int length, int channels) {
		if(!recording) return;
		
		if(channels!=2) {
			printf("Error! the recorder class only supports stereo input on recording.\n");
			stopRecording();
			return;
		}
			
			
		int len = recordLength - recordPos;
		
		// stop recording if needed
		if(len>=length) len = length;
		else stopRecording();
		
		if(numChannels==2) {
			// straight copy
			for(int i = 0; i < len; i++) {
				recordBuffer[recordPos*2] = in[i*2];
				recordBuffer[recordPos*2 + 1] = in[i*2+1];
				recordPos++;
			}
		} else {
			// deinterleave
			for(int i = 0; i < len; i++) {
				recordBuffer[recordPos] = in[i*2];
				recordPos++;
			}
		}
		progress = (float) recordPos/recordLength;
	}
	
	void playback(float *out, int length, int channels) {
		if(!playingBack) return;
		if(channels!=2) {
			printf("Error! the recorder class only supports stereo output on playback.\n");
			stopPlayingBack();
			return;
		}
		
		int len = recordLength - playbackPos;

		// stop recording if needed
		if(len>=length) len = length;
		else stopPlayingBack();
		
		
		if(numChannels==2) {
			// straight copy
			for(int i = 0; i < len; i++) {
				out[i*2] = recordBuffer[playbackPos*2];
				out[i*2+1] = recordBuffer[playbackPos*2+1];
				playbackPos++;
			}
		} else {
			// deinterleave
			for(int i = 0; i < len; i++) {
				out[i*2] = out[i*2+1] = recordBuffer[playbackPos];
				playbackPos++;
			}
		}
		// silence if we're at the end and we need 
		// to fill the rest of the playback buffer
		if(len<length) {
			int bl = len*channels;
			int el = length*channels;
			for(int i = bl; i < el; i++) {
				out[i] = 0.f;
			}
		}

		playbackProgress = (float) playbackPos/recordLength;
	}
	
	
	void startPlayingBack() {
		if(recording) return; // should never happen(!)
		playbackPos = 0;
		playingBack = true;
		playbackProgress = 0;
	}
	
	void stopPlayingBack() {
		if(recording) return; // should never happen(!)
		playingBack = false;
	}
	
	bool exportFile(string path) {
		if(recordBuffer!=NULL && recordLength>0) {
			// write the file, piece by piece, because it will save memory
			WavFile wf;
			wf.setData(recordBuffer, recordLength*numChannels);
			wf.setFormat(numChannels, 44100, 16);
			return wf.save(path.c_str());
			
		} else {
			return false;
		}
	}
	/**
	 * Returns a mono signal of the record buffer.
	 * You give it the buffer and a pointer to desired
	 * length, and this will fill it up as much
	 * as it can and adjust the length if there's
	 * not enough samples to fill it up.
	 */
	void getMono(float *outData, int *ioLength);
};
