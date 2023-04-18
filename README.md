# SAMPLETOY WEB

I once made an iOS app called Sampletoy - it used openFrameworks (a C++ creative coding library) to build the UI - this is an attempt to redo the UI in React as a learning exercise and connect it to the C++ audio back-end, and optionally build a web audio version of the audio engine as its quite simple.

In order to build you have to install emscripten (`brew install emscripten`) then cd to the `cpp` folder and run `./build.sh` - this will generate `www/public/audioWorklet.js` - the wasm AudioWorklet

some cmake emscripten instructions that might be helpful elsewhere
https://gist.github.com/WesThorburn/00c47b267a0e8c8431e06b14997778e4