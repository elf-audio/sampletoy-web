
import React from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { actionMap } from '../app/stateSlice';

const Toggle = ({name, stateName}) => {

	const dispatch = useDispatch();
	const stateValue = useSelector((state) => state.state[stateName]);

	const handleToggle = () => {
		if (actionMap[stateName]) {
			dispatch(actionMap[stateName](!stateValue));
		}
	};

	return <div 
			className={stateValue? "checkbox selected" : "checkbox"} 
			onMouseDown={handleToggle}>
				<label>{name}</label>
	</div>;
}

export default Toggle