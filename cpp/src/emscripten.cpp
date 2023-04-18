#include "SampletoyApp.h"

#include <emscripten/bind.h>
#include <emscripten.h>


SampletoyApp app(48000);
extern "C" {
	int getSamples(float *data, int length) {
		app.getSamples(data, length);
		return 0;
	}
}

void sendMessage(std::string msg) {
	// msg = "receiveMessage('"+msg+"')";
	// emscripten_run_script(msg.c_str());
	EM_ASM_({
		receiveMessage(UTF8ToString($0));
		}, msg.c_str()
	);
}