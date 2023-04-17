// SpinningStar.js
import React, { useState, useRef } from 'react';
import { css } from '@emotion/react';




const starSvg = (
	<svg width="128px" height="112px" viewBox="0 0 128 112" version="1.1">
	<title>Star</title>
	<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" fill-opacity="0.552529502">
	<polygon id="Star" fill="#FFF383" points="64 63.8883929 32 111.425626 57.1684514 59.9441964 0 56 57.1684514 52.0558036 32 0.574374158 64 48.1116071 96 0.574374158 70.8315486 52.0558036 128 56 70.8315486 59.9441964 96 111.425626"></polygon>
	</g>
	</svg>
	);
	
	const SpinningStar = () => {
		const [stars, setStars] = useState([]);
		const [mouseDown, setMouseDown] = useState(false);
		const padRef = useRef()
		const onTouchMove = (e) => {
			e.preventDefault();
			const pad = padRef.current
			const padRect = pad.getBoundingClientRect()
			
			const newStars = e.touches.length > 0 ? [] : stars;
			for (let i = 0; i < e.touches.length; i++) {
				const touch = e.touches[i];

				const x = touch.pageX - padRect.left - 64;
				const y = touch.pageY - padRect.top - 56;

				newStars.push({
					id: touch.identifier,
					x: x,
					y: y,
				});
			}
			setStars(newStars);
		};
		
		const onMouseDown = (e) => {
			setMouseDown(true);
			
			const pad = padRef.current
			const padRect = pad.getBoundingClientRect()

			const x = e.pageX - padRect.left - 64
			const y = e.pageY - padRect.top - 56


			const newStar = {
				id: 'mouse',
				x: x,
				y: y,
			};
			
			setStars([...stars, newStar]);
		};
		
		const onMouseMove = (e) => {
			if (mouseDown) {
				const pad = padRef.current
				const padRect = pad.getBoundingClientRect()

				const x = e.pageX - padRect.left - 64
				const y = e.pageY - padRect.top - 56

				const newStar = {
					id: 'mouse',
					x: x,
					y: y,
				};
				setStars((prevStars) => prevStars.map((star) => (star.id === 'mouse' ? newStar : star)));
			}
		};
		
		const onMouseUp = () => {
			setMouseDown(false);
			setStars((prevStars) => prevStars.filter((star) => star.id !== 'mouse'));
		};
		
		
		
		return (
			<div className="starGPTRoot">
			<div
			ref={padRef}
			className="starGPTComponent"
			onTouchMove={onTouchMove}
			onMouseDown={onMouseDown}
			onMouseMove={onMouseMove}
			onMouseUp={onMouseUp}
			onMouseLeave={onMouseUp}
			>
			{stars.map((star) => (
				<div key={star.id} className="starGPT" style={{ left: star.x, top: star.y }}>
				{starSvg}
				</div>
				))}
				</div>
				</div>
				);
			};
			
			export default SpinningStar;