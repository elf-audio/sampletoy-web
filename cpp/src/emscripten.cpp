#include "SampletoyApp.h"

#include <emscripten/bind.h>
#include <emscripten.h>

EMSCRIPTEN_BINDINGS(MyLiveAudio) {
	emscripten::class_<SampletoyApp>("SampletoyApp")
		.constructor<double>()
		// .function("getVector", &MyLiveAudio::getVector)
		// .function("sendCommand", &MyLiveAudio::sendCommand)
		.function("getSample", &SampletoyApp::getSample)
		// .function("getR", &MyLiveAudio::getR)
		;
// void audioOut(float *samples, int length, int numChans) override

	emscripten::register_vector<float>("vector<float>");
}

void sendMessage(std::string msg) {
	// msg = "receiveMessage('"+msg+"')";
	// emscripten_run_script(msg.c_str());
	EM_ASM_({
		receiveMessage(UTF8ToString($0));
		}, msg.c_str()
	);
}