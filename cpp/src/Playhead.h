
struct Vec2 {
	float x = 0.f;
	float y = 0.f;
};

class Playhead {
public:
	float speed = 1;
	float actualSpeed = 1;
	float env = 0;
	
	Vec2 p;
	
	int rotation 	= 0;
	float pos 		= 0.f;
	
	float attack 	= 0.01f;
	float release 	= 1.f;
	float mod 		= 0.f;
	
	Playhead(float _s = 1.f) {
		speed = _s;
		actualSpeed = _s;
	}
};