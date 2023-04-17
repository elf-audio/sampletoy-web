//
//  Recorder.cpp
//  sampletoy
//
//  Created by Marek Bereza on 11/03/2019.
//

#include "Recorder.h"
#include "Global.h"

void Recorder::getMono(float *outData, int *ioLength) {
	*ioLength = min(LENGTH, recordLength);
	
	// ahh, straight copy
	if(numChannels==1) {
		memcpy(outData, recordBuffer, *ioLength*sizeof(float));
	} else if(numChannels==2) {
		// deinterleave
		for(int i = 0; i < *ioLength; i++) {
			outData[i] = recordBuffer[i*2];
		}
	} else {
		// bugger...
	}
}
