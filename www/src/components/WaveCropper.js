import React, { useRef, useEffect } from 'react'
import FullSizeCanvas from './FullSizeCanvas';










const WaveCropper = (props) => {
  const draw = (ctx, width, height) => {
    // Add your custom drawing logic for the WaveCropper component here.
    ctx.fillStyle = '#000000'
		ctx.beginPath()
		ctx.arc(0, 100, 20, 0, 2*Math.PI)
		
		ctx.fill()
		ctx.moveTo(0,0)
		ctx.strokeStyle = '#f00'
		ctx.lineTo(width, height)
		ctx.stroke()
  };


	return <div id="wave"><div className="overshadow">
        <FullSizeCanvas draw={draw} {...props} />;
        </div></div>
 
};

export default WaveCropper
