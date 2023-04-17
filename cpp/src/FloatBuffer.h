/**     ___           ___           ___                         ___           ___     
 *     /__/\         /  /\         /  /\         _____         /  /\         /__/|    
 *    |  |::\       /  /::\       /  /::|       /  /::\       /  /::\       |  |:|    
 *    |  |:|:\     /  /:/\:\     /  /:/:|      /  /:/\:\     /  /:/\:\      |  |:|    
 *  __|__|:|\:\   /  /:/~/::\   /  /:/|:|__   /  /:/~/::\   /  /:/  \:\   __|__|:|    
 * /__/::::| \:\ /__/:/ /:/\:\ /__/:/ |:| /\ /__/:/ /:/\:| /__/:/ \__\:\ /__/::::\____
 * \  \:\~~\__\/ \  \:\/:/__\/ \__\/  |:|/:/ \  \:\/:/~/:/ \  \:\ /  /:/    ~\~~\::::/
 *  \  \:\        \  \::/          |  |:/:/   \  \::/ /:/   \  \:\  /:/      |~~|:|~~ 
 *   \  \:\        \  \:\          |  |::/     \  \:\/:/     \  \:\/:/       |  |:|   
 *    \  \:\        \  \:\         |  |:/       \  \::/       \  \::/        |  |:|   
 *     \__\/         \__\/         |__|/         \__\/         \__\/         |__|/   
 *
 *  Description: 
 *
 *	sustainPedal2	
 *		 
 *  FloatBuffer.h, created by Marek Bereza on 01/08/2017.
 *  
 */
#pragma once
#include <vector>
#include <assert.h>
//#include "util.h"
//#include "maths.h"
#include <fstream>

using namespace std;


class FloatBuffer: public vector<float> {
public:
    void linspace(float a, float b, int N) {
        float h = (b - a) / ((float)N-1.f);
        resize(N);
        for(int i = 0; i < N; i++) {
            (*this)[i] = a + h * i;
        }
    }
	
	FloatBuffer(int sz) {
		zeros(sz);
	}
	
	FloatBuffer() {
		
	}
	
	FloatBuffer(float *arr, int size) {
		set(arr, size);
	}
    
    /**
     * You can copy an array of floats into the buffer
     * by doing set(buff, length);
     * or if you want to get just the left channel, you can
     * set the start to 0 and the stride to 2
     * or right channel with start=1 and stride = 2.
     *
     * parameters:
     *  length is always how long you want your buffer to be
     *  start is the offset in the input float array
     *  stride is how many samples to iterate by on each loop
     */
    void set(float *buff, int length, int start = 0, int stride = 1) {
        
        if(start==0 && stride==1) {
            assign(buff, buff + length);
        } else {
            resize(length);
            int j = start;
            for(int i = 0; i < length; i++) {
                (*this)[i] = buff[j];
                j += stride;
            }
        }
    }
	
	void setStereoFromMono(float *data, int length) {
		resize(length*2);
		for(int i = 0; i < length; i++) {
			(*this)[i*2] = data[i];
			(*this)[i*2+1] = data[i];
		}
	}
    
	int16_t floatToInt16(float in) {
		return in * 32767.f;
	}
	vector<int16_t> getInt16() {
		vector<int16_t> buff;
		buff.resize(size());
		for(int i = 0; i < size(); i++) {
			buff[i] = floatToInt16((*this)[i]);
		}
		return buff;
	}
	
	FloatBuffer stereoToMono() {
		FloatBuffer ret;
		ret.resize(size() / 2);
		for(int i = 0; i < ret.size(); i++) {
			ret[i] = ((*this)[i*2] + (*this)[i*2+1]) * 0.5;
		}
		return ret;
	}
	
    void save(string path) {
        ofstream myfile;
        myfile.open (path.c_str());
        
        
        for(int i = 0; i < size(); i++) {
            if(i>0) myfile << ",";
            myfile << to_string((*this)[i]);
        }
        
        
        myfile.close();
    }
    
//    void load(string path) {
//        string line;
//        string f;
//        ifstream myfile (path.c_str());
//        if (myfile.is_open())
//        {
//            while ( getline (myfile,line) )
//            {
//                f += line + "\n";
//            }
//            myfile.close();
//        }
//
//        vector<string> smps = split(f, ",");
//        resize(smps.size());
//        for(int i =0 ; i < smps.size(); i++) {
//            (*this)[i] = stof(smps[i]);
//        }
//    }
//
	
    void setFromLeftChannel(float *buff, int length) {
        set(buff, length, 0, 2);
    }
    
    void setFromRightChannel(float *buff, int length) {
        set(buff, length, 1, 2);
    }
	
	
//	void random(float min = -1, float max = 1) {
//		for(int i = 0; i < size(); i++) {
//			(*this)[i] = randf(min, max);
//		}
//	}
    
    // sets the input samples to the contents of this FloatBuffer
    void get(float *buff, int length) {
        memcpy(buff, data(), length * sizeof(float));
    }
    
    void getMonoAsStereo(float *buff, int length) {
        for(int i =0 ; i < length; i++) {
            float s = (*this)[i];
            buff[i*2] = s;
            buff[i*2+1] = s;
        }
    }
    
    void zeros(int N = -1) {
        if(N!=-1) {
            resize(N);
        }
        std::fill(begin(), end(), 0);
    }
    void print() {
        printf("[");
        for(int i = 0; i < size(); i++) {
            if(i>0) printf(",");
            printf(" %f", (*this)[i]);
        }
        printf(" ]\n");
    }
    
	
//    FloatBuffer& operator= (const FloatBuffer &buff)
//    {
//        // self-assignment guard
//        if (this == &buff)
//            return *this;
//		
//        // do the copy
//        assert(size()==buff.size());
//        copy(buff.begin(), buff.end(), this->begin());
//		
//        // return the existing object so we can chain this operator
//        return *this;
//    }
    FloatBuffer& operator+=(const FloatBuffer& right) {
        assert(size()==right.size());
        
        for(int i = 0; i < size(); i++) {
            (*this)[i] += right[i];
        }
        
        return *this;
    }
    
    FloatBuffer& operator-=(const FloatBuffer& right) {
        assert(size()==right.size());
        
        for(int i = 0; i < size(); i++) {
            (*this)[i] -= right[i];
        }
        
        return *this;
    }
    
    FloatBuffer& operator*=(const FloatBuffer& right) {
        assert(size()==right.size());
        
        for(int i = 0; i < size(); i++) {
            (*this)[i] *= right[i];
        }
        
        return *this;
    }
    
    FloatBuffer& operator/=(const FloatBuffer& right) {
        assert(size()==right.size());
        
        for(int i = 0; i < size(); i++) {
            (*this)[i] /= right[i];
        }
        
        return *this;
    }
    
    
    FloatBuffer& operator+=(const float& right) {
        
        
        for(int i = 0; i < size(); i++) {
            (*this)[i] += right;
        }
        
        return *this;
    }
    
    FloatBuffer& operator-=(const float& right) {
        
        
        for(int i = 0; i < size(); i++) {
            (*this)[i] -= right;
        }
        
        return *this;
    }
    
    FloatBuffer& operator*=(const float& right) {
        
        
        for(int i = 0; i < size(); i++) {
            (*this)[i] *= right;
        }
        
        return *this;
    }
    
    FloatBuffer& operator/=(const float& right) {
        
        
        for(int i = 0; i < size(); i++) {
            (*this)[i] /= right;
        }
        
        return *this;
    }
    
};
