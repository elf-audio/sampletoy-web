#!/bin/zsh

echo "sampletoy emscripten builder"

mkdir -p build

#### THIS BLOCK JUST BUILDS THE SOURCES CPP FASHION
# 
# rm -Rf build/*.o
# g++ -c -std=c++20 -O3 src/MarekFilter.cpp 		-o build/MarekFilter.o
# g++ -c -std=c++20 -O3 src/Recorder.cpp 			-o build/Recorder.o
# g++ -c -std=c++20 -O3 src/SampletoyApp.cpp 		-o build/SampletoyApp.o
# g++ -c -std=c++20 -O3 src/SampletoyAppAudio.cpp -o build/SampletoyAppAudio.o


#### THIS BUILDS IT IN EMSCRIPTEN
#### - should probably have a switch so cmake can do all the building

# Define the check_error function
check_error() {
    if [ $1 -ne 0 ]; then
        echo "failure in build.sh"
        exit $1
    fi
}

pushd build
	emcmake cmake ..
	check_error $?
	make
	check_error $?
	cat sampletoy_web.wasm.js ../res/worklet-base.js > ../../www/public/audioWorklet.js
	check_error $?
popd




