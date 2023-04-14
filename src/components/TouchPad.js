import star from '../star.svg'
import React, { useState, useRef, useEffect } from 'react'

const TouchPad = (props) => {
	
	const targetRef = useRef();

	const [dims, setDims] = useState({ w: 300, h: 300 });


	const ofGetWidth = 400
	const ofGetHeight = 300

	const scaleX = Math.max(ofGetWidth, ofGetHeight)
	const scaleY = scaleX
	
	const numCols = 50
	
	let shapes = []

	for (let i = 1; i < numCols; i++) {
		let a = i / numCols
		let alpha = 0.1
		if(i%2==0) alpha = 0.3
		if(i%10==0) alpha = 0.6
		let yy = Math.floor(a*scaleY)
		const col = "rgba(172,255,182,"+alpha+")"
		shapes.push(<line key={i+10000} x1={0} y1={yy} x2={dims.w} y2={yy} stroke={col} />)

		if(yy>dims.h) break;
	}
	
	for(let i = 1; i < numCols; i++) {
		let a = i /numCols;
		let alpha = 0.2;
		if(i%2==0) alpha = 0.4;
		if(i%10==0) alpha = 0.8;
		const xx = Math.floor(a*scaleX)
	
		const col = "rgba(172,255,182,"+alpha+")"

		shapes.push(<line key={i} x1={xx} y1={0} x2={xx} y2={dims.h} stroke={col} />)

		if(a*scaleX>dims.w-5) break;
	}

	// useEffect(() => {
	// 	if (targetRef.current) {
	// 	  setDims({
	// 		w: targetRef.current.offsetWidth,
	// 		h: targetRef.current.offsetHeight
	// 	  });
	// 	  console.log(targetRef.current.offsetHeight)
	// 	}
	//   }, []);

	
	
	return <div id="chop" className="inner-shadow">
	
	<svg ref={targetRef}>
		{shapes}
	</svg>
	{/* <div className="touch"><img src={star} /></div> */}
	
	</div>
}

export default TouchPad


