#!/bin/zsh

echo "sampletoy emscripten builder"
mkdir -p build
rm -Rf build/*.o
g++ -c -std=c++20 -O3 src/MarekFilter.cpp 		-o build/MarekFilter.o
g++ -c -std=c++20 -O3 src/Recorder.cpp 			-o build/Recorder.o
g++ -c -std=c++20 -O3 src/SampletoyApp.cpp 		-o build/SampletoyApp.o
g++ -c -std=c++20 -O3 src/SampletoyAppAudio.cpp -o build/SampletoyAppAudio.o
