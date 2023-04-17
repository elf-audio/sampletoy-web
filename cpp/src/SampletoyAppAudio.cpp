/*
 *  testAppAudio.cpp
 *  sampletoy
 *
 *  Created by Marek Bereza on 11/10/2009.
 *  Copyright 2009 __MyCompanyName__. All rights reserved.
 *
 */

#include "SampletoyApp.h"

void SampletoyApp::setupAudio() {
	recorder = &G.recorder;
	G.filter = &filter;
	G.delayL = &delayL;
	G.delayR = &delayR;
}

//
// SAMPLETOY IS MONO!
//

void SampletoyApp::audioIn( float * output, int bufferSize, int nChannels ) {
	
	if(mustLoadAudioFile) {
	
		length = min(LENGTH, (int)audioFileBuff.size());
		memcpy(audio, audioFileBuff.data(), length*sizeof(float));
		float val = 0;
		for(int i = 0; i < length; i++) {
			if(abs(audio[i])>val) val = abs(audio[i]);
			else val *= 0.999;
			preview[i] = 1.f - ((val-1)*(val-1)); // nice curve
		}
		audioFileBuff.clear();
		
		mustLoadAudioFile = false;
	}
	
	// if recording, just send back silence
	if(G.settings.recording) {
		memset(output, 0, bufferSize * nChannels * sizeof(float));
		return;
	}
	
	
	if(recorder->playingBack) {
		recorder->playback(output, bufferSize, nChannels);
		return;
	}
	
	float attack = G.settings.attack;
	bool filtering = G.settings.mod==MOD_LP || G.settings.mod==MOD_BP || G.settings.mod==MOD_HP;
	
	int filterUpdateCount = 0;

	if(attack>=0.0005) attack = 0;
	if(length>0 && !G.settings.recording) {
		memset(output, 0, sizeof(float)*bufferSize*nChannels);
		
		int start = floor((length)*G.settings.startCrop);
		int end = floor((length-1)*G.settings.endCrop);
		int cursorCount = 0;

		G.audioMutex.lock();
		
		for (auto it = G.playheads.begin(); it != G.playheads.end(); it++) {
			Playhead *p = (*it).second;
			if(p==NULL) continue;
			for(int i = 0; i < bufferSize; i++) {

				p->pos += p->actualSpeed;
				p->actualSpeed = p->speed*0.01f + p->actualSpeed*0.99f;
				
				if(p->pos>=end || p->pos<start) p->pos = G.settings.startCrop*length;
				
				// interpolate between the two samples
				int ppos = floor(p->pos);
				int qpos = ppos + 1;
				if(qpos >= end) {
					qpos = start;
				}
				float interp = p->pos - ppos;
				float out = audio[qpos]*interp + audio[ppos]*(1.f-interp);
				if(G.settings.smoothLoop) {
					float vol = ppos - start;
					if(vol < 30.f) {
						vol /= 30.f;
						out *= vol;
					}else {
						vol = end - ppos;
						if(vol < 30) {
							vol /= 30.f;
							out *= vol;
						}
					}
				}
			
				if((*it).first<0) {
					p->release -= G.settings.release;
					if(p->release<0.f) p->release = 0.f;
					out *= p->release;
					p->env = p->release;
				} else if(p->attack<1.f) {
					p->attack += G.settings.attack;// p->attack + attack;
					if(p->attack>1.f) p->attack = 1.f;
					out *= p->attack;
					p->env = p->attack;
				}
				
				out += output[i*2];
				if(out>1.f) out = 1.f;
				if(out<-1.f) out = -1.f;
				
				output[i*2 + 1] = output[i*2] = out;
			}
			
			
			cursors[cursorCount] = (float) p->pos/length;
			cursorCount++;
		
		}
		G.audioMutex.unlock();
		
		
		for(int i = 0; i < bufferSize; i++) {
			if(filtering) {
				actualCutoff = actualCutoff*0.99 + G.cutoff * 0.01;
				G.filter->calc_filter_coeffs(actualCutoff);
	
				output[i*2+1] = output[i*2] = G.filter->filter(output[i*2]);
			}
			
			output[i*2] = delayL.process(output[i*2]);
			output[i*2+1] = delayR.process(output[i*2+1]);
		}
		G.settings.setCursors(cursors, cursorCount);
		
	} else {
		
		for(int i = 0; i < bufferSize; i++) {
			output[i*2] = delayL.process(output[i*2]);
			output[i*2+1] = delayR.process(output[i*2+1]);
		}
	}
	
	if(recorder->recording) {
		recorder->record(output, bufferSize, nChannels);
	}
}

void SampletoyApp::startRecording() {
	G.settings.zoom = false;
	G.settings.startCrop = 0;
	G.settings.endCrop = 1;
	length = 0;
	lastTimeRecording = false;
}

void SampletoyApp::stopRecording() {
}

void SampletoyApp::audioOut(float *output, int bufferSize, int nChannels) {

	if(G.settings.recording) {
		

		// work out how much we can record
		int rlength = bufferSize*nChannels; //?? nChannels, this might introduce chaos
		
		if(rlength > LENGTH - length) rlength = LENGTH - length;
		if(rlength<=0) {
			return;
		}
		// record it
		memcpy(audio+length, output, rlength*sizeof(float));
		float val = 0;
		for(int i = 1; i < rlength; i++) {
			if(abs(audio[length+i])>val) val = abs(audio[length+i]);
			else val *= 0.999;
			preview[length+i] = 1.f - ((val-1)*(val-1)); // nice curve
		}
		length += rlength;
	}
	G.settings.recTime = (float) length / LENGTH;
	lastTimeRecording = G.settings.recording;
}

int main() {
	printf("hello world\n");
}