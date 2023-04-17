#include <stdio.h>

#include <math.h>
#include <fstream>
#include <iostream>
#include <string>
using namespace std;

// if this is true, we only write WRITE_BUFF_SIZE shorts at a time
#define BUFFERED_WRITE
#define WRITE_BUFF_SIZE 256

class WavFile {
private:
	float *data;
	
public:
	
	int channels;
	int samplerate;
	int bitsPerSample;
	int length;
	
	void setFormat(int _channels, int _samplerate, int _bitsPerSample) {
		channels = _channels;
		samplerate = _samplerate;
		bitsPerSample = _bitsPerSample;
	}
	
	WavFile() {
		channels = 1;
		samplerate = 44100;
		bitsPerSample = 16;
		data = NULL;
	}
	
	
	// write out the wav file
	bool save(const char *path) {
		
		if(data==NULL) return false;
		
		short myFormat = 1;
		
		int mySubChunk1Size = 16;
		int myByteRate = samplerate * channels * bitsPerSample/8;
		short myBlockAlign = channels * bitsPerSample/8;
		
		int myChunkSize = 36 + length*bitsPerSample/8;
		int myDataSize = length*bitsPerSample/8;
		
		fstream myFile (path, ios::out | ios::binary);
		
		// write the wav file per the wav file format
		myFile.seekp (0, ios::beg); 
		myFile.write ("RIFF", 4);
		myFile.write ((char*) &myChunkSize, 4);
		myFile.write ("WAVE", 4);
		myFile.write ("fmt ", 4);
		myFile.write ((char*) &mySubChunk1Size, 4);
		myFile.write ((char*) &myFormat, 2); // should be 1 for PCM
		myFile.write ((char*) &channels, 2); // # channels (1 or 2)
		myFile.write ((char*) &samplerate, 4); // 44100
		myFile.write ((char*) &myByteRate, 4); //
		myFile.write ((char*) &myBlockAlign, 2);
		myFile.write ((char*) &bitsPerSample, 2); //16
		myFile.write ("data", 4);
		myFile.write ((char*) &myDataSize, 4);
		
#ifdef BUFFERED_WRITE
		short buff[WRITE_BUFF_SIZE];
		int pos = 0;
		while(pos<length) {
			int len = min(WRITE_BUFF_SIZE, length-pos);
			for(int i = 0; i < len; i++) {
				buff[i] = round(data[pos]*32760.f);
				pos++;
			}
			myFile.write ((char*)buff, len*bitsPerSample/8);
		}
#else 
		short buff[length];
		for(int i = 0; i < length; i++) {
			buff[i] = round(data[i]*32760.f);
		}
		myFile.write ((char*)buff, myDataSize);
#endif		
		return true;
	}
	
	// this gives you data that you have to free yourself
	float *getData() {
		float *d = data;
		data = NULL;
		return d;
	}
	
	// length is the length in samples, not frames 
	// - must give malloced memory
	void setData(float *_data, int _length) {
		data = _data;
		length = _length;
	}
	
	// read a wav file into this class
	bool load(char* path) {
		ifstream inFile(path, ios::in | ios::binary);
		short myBlockAlign;		
		int mySubChunk1Size,myByteRate;
		int myChunkSize;
		short format = 1;
		inFile.seekg(4, ios::beg);
		inFile.read( (char*) &myChunkSize, 4 ); // read the ChunkSize
		
		inFile.seekg(16, ios::beg);
		inFile.read( (char*) &mySubChunk1Size, 4 ); // read the SubChunk1Size
		
		//inFile.seekg(20, ios::beg);
		inFile.read( (char*) &format, sizeof(short) ); // read the file format.  This should be 1 for PCM
		
		//inFile.seekg(22, ios::beg);
		inFile.read( (char*) &channels, sizeof(short) ); // read the # of channels (1 or 2)
		
		//inFile.seekg(24, ios::beg);
		inFile.read( (char*) &samplerate, sizeof(int) ); // read the samplerate
		
		//inFile.seekg(28, ios::beg);
		inFile.read( (char*) &myByteRate, sizeof(int) ); // read the byterate
		
		//inFile.seekg(32, ios::beg);
		inFile.read( (char*) &myBlockAlign, sizeof(short) ); // read the blockalign
		
		//inFile.seekg(34, ios::beg);
		inFile.read( (char*) &bitsPerSample, sizeof(short) ); // read the bitspersample
		
		inFile.seekg(40, ios::beg);
		inFile.read( (char*) &length, sizeof(int) ); // read the size of the data
		
		length /= sizeof(short);
		if(bitsPerSample!=16 || length<=0 || format!=1 || channels!=1) {
			return false;
		}
		
		// read the data chunk
		short *rawData = new short[length];
		inFile.seekg(44, ios::beg);
		inFile.read((char*)rawData, length*sizeof(short));
		inFile.close(); // close the input file
		
		if(data!=NULL) free(data);
		// bytes to shorts
		data = new float[length];
		for(int i = 0; i < length; i++) {
			data[i] = ((float)rawData[i])/32767.f;
		}
		delete [] rawData;
		
		return true; // this should probably be something more descriptive
	}
};
