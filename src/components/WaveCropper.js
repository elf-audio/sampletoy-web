import React, { useRef, useEffect } from 'react'


const WaveCropper = (props) => {

    const canvasRef = useRef(null)

    const draw = (ctx) => {
		ctx.fillStyle = '#000000'
		ctx.beginPath()
		ctx.arc(50, 100, 20, 0, 2*Math.PI)
		ctx.fill()
	}

    useEffect(() => {
		const canvas = canvasRef.current
		const context = canvas.getContext('2d')
		//Our first draw
		draw(context)
	}, [draw])

    return <div id="wave"><div className="overshadow">
        <canvas ref={canvasRef} {...props}/>
        </div></div>
}

export default WaveCropper
