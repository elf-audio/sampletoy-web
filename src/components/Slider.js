import React, { useState, useRef, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { actionMap } from '../app/stateSlice';


const Slider = ({
	stateName,
	name,
	min = 0,
	max = 100,
	initialValue = min,
	onChange = () => {}
  }) => {

	const [value, setValue] = useState(initialValue);
	const [isDragging, setIsDragging] = useState(false);
	const sliderRef = useRef(null);
	

	const dispatch = useDispatch();

	// this is a problem - stateValue and initialValue are both trying to set the initial value
	const stateValue = useSelector((state) => state.state[stateName]);



	const updateValue = (clientX) => {
		const sliderRect = sliderRef.current.getBoundingClientRect();
		const newX = Math.min(
			Math.max(clientX - sliderRect.left, 0),
			sliderRect.width
			);
			
			const newValue = Math.round((newX / sliderRect.width) * (max - min) + min);
			if (actionMap[stateName]) {
				dispatch(actionMap[stateName](newValue));
			} else {
				console.error("No action map entry for '"+stateName+"'")
			}
			setValue(newValue);
			onChange(newValue);
		};
		
		useEffect(() => {
			const handleMove = (e) => {
				if (!isDragging) return;
				
				const clientX = e.touches ? e.touches[0].clientX : e.clientX;
				updateValue(clientX);
			};
			
			const handleEnd = () => {
				setIsDragging(false);
			};
			
			window.addEventListener('mousemove', handleMove);
			window.addEventListener('touchmove', handleMove);
			window.addEventListener('mouseup', handleEnd);
			window.addEventListener('touchend', handleEnd);
			
			return () => {
				window.removeEventListener('mousemove', handleMove);
				window.removeEventListener('touchmove', handleMove);
				window.removeEventListener('mouseup', handleEnd);
				window.removeEventListener('touchend', handleEnd);
			};
		}, [isDragging, min, max, onChange]);
		
		
		
		
		
		
		const handleStart = (e) => {
			setIsDragging(true);
		
			const clientX = e.touches ? e.touches[0].clientX : e.clientX;
			updateValue(clientX);
		};
		
			
			const percentage = ((value - min) / (max - min)) * 100;
			
			return <div 
				className="slider" 
				onMouseDown={handleStart} 
				onTouchStart={handleStart}
				ref={sliderRef}>
			<label>{name}</label>
			<div className="value" style={{ width: `${percentage}%` }} />
			</div>
		}
		
		export default Slider