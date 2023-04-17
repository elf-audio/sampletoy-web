#pragma once 

#define MAX_DELAY 44100

#include <vector>

class InterpolatingDelay {
public:
	
	std::vector<float> buffer;
	
	float	actualDelayTime;
	int		writeHead;
	float	readHead;
	int		delay;
	float	feedback;
	float mix;
	float lerpAmt;
	float lerpAmtM;
	
	InterpolatingDelay() {
		actualDelayTime = 0;
		writeHead		= 0;
		readHead		= 0;
		delay		= 11025;
		feedback		= 0.2;
		mix = 0.5;
		buffer.resize(MAX_DELAY);
		fill(buffer.begin(), buffer.end(), 0);
		lerpAmt = 0.99975;
		lerpAmtM = 1 - lerpAmt;
	}
	
	float readFrac(std::vector<float> &buff, float index) {
		int i = index;
		int j = index + 1;
		if(j >= buff.size()) j -= buff.size();
		float frac = index - i;

		return buff[i] * (1 - frac) + buff[j] * frac;
	}
	
	float process(float inp) {
		writeHead++;
		writeHead %= MAX_DELAY;
		
		actualDelayTime = actualDelayTime * lerpAmt + delay * lerpAmtM;
		
		readHead = writeHead - actualDelayTime;
		if(readHead<0) readHead += MAX_DELAY;
		
		float out = readFrac(buffer, readHead);
		
		buffer[writeHead] = out * feedback + inp;
		
		return inp + (out - inp) * mix;
	}
};
