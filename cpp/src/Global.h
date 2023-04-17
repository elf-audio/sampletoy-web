/*
 *  Global.h
 *  sampletoy
 *
 *  Created by Marek Bereza on 13/10/2009.
 *  Copyright 2009 __MyCompanyName__. All rights reserved.
 *
 */
#pragma once
#include "InterpolatingDelay.h"
#include "MarekFilter.h"
#include "Recorder.h"

#define LENGTH 441000

#define CHROMATIC   0
#define MAJOR		1
#define MINOR       2
#define PENTATONIC	3
#define WHOLETONE	4

#define MOD_NONE	0
#define MOD_LP		1
#define MOD_BP		2
#define MOD_HP		3
#define MOD_ATTACK	4
#define MOD_RELEASE	5


class Settings {
public:
	
	bool 	recording 	= false;
	float 	noteStep 	= 0.33;
	bool 	smoothLoop 	= false;
	float 	attack 		= 0.01f;
	float 	release 	= 0.999f;
	bool 	stepped 	= false;
	bool 	minusOctave = false;
	
	float 	delayMix 		= 0.0f;
	float 	delayTime 		= 200;
	float 	delayFeedback 	= 0.1;
	
	float 	startCrop 		= 0.f;
	float 	endCrop 		= 1.f;
	
	bool 	zoom 			= false;
	float	startZoom 		= 0.f;
	float 	endZoom 		= 1.f;
	
	int 	scale 			= CHROMATIC;
	int 	mod 			= MOD_NONE;
	float 	pitch 			= 0.28;
	float 	range 			= 0.7;
	float 	*audio;
	float 	*preview;
	int 	*length;
};


class Global {
public:
	std::mutex audioMutex;
	Settings settings;

	InterpolatingDelay *delayL;
	InterpolatingDelay *delayR;
	Filter *filter;
	float cutoff = 5000;
	
	Recorder recorder;
	float contentScale;

	void init() {
		filter = new Filter();
		filter->q = 10;
	}

	void resampleRecording() {
		
		recorder.getMono(settings.audio, settings.length);
		
		float val = 0;
		for(int i = 0; i < *(settings.length); i++) {
			if(abs(settings.audio[i])>val) val = abs(settings.audio[i]);
			else val *= 0.999;
			settings.preview[i] = val;
		}
	}
	

	float fromEnv(float env) {
		float val = -1.f*log10(env)/3.f - 0.7;
		if(val<0.01) val = 0.01;
		return val;
	}
	
	float toEnv(float rel) {
		return pow(10, -3.f*(rel+0.7));
	}
};


extern Global G;