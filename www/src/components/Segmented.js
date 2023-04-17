import React, { cloneElement, useState } from 'react'
// import { useSelector } from 'react-redux';
import { getMouseIsDown } from '../app/mouseUtil'

import { useSelector, useDispatch } from 'react-redux';
import { actionMap } from '../app/stateSlice';

const Option = ({ name, isActive, onMouseDown, onMouseMove }) => {
	return <li className={isActive?"selected":null} onMouseDown={onMouseDown} onMouseMove={onMouseMove}><label>{name}</label></li>;	
}
  
const Segmented = ({ children, stateName }) => {

	const dispatch = useDispatch();
	const stateValue = useSelector((state) => state.state[stateName]);

	const handleChange = (val) => {
		if (actionMap[stateName]) {
			dispatch(actionMap[stateName](val));
		}
	};

	// const [activeOption, setActiveOption] = useState(1);
	return <ul className="segmented">
		{children.map((child, index) =>
			cloneElement(child, {
				key: child.props.name,
				isActive: stateValue === index,
				onMouseDown: () => handleChange(index),
				onMouseMove: () => {
					if(getMouseIsDown()) {
						handleChange(index);
					}
				}
			}),
		)}
	</ul>
}

export { Segmented, Option }
