
import React from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { actionMap } from '../app/stateSlice';


const ZoomButton = () => {
    const dispatch = useDispatch();
	const stateValue = useSelector((state) => state.state["zoom"]);


    const handleToggle = () => {
		if (actionMap["zoom"]) {
			dispatch(actionMap["zoom"](!stateValue));
		}
	};

    return <div id="zoom" 
                className={stateValue?"selected":""}
                onMouseDown={handleToggle}>
        ZOOM
        <div className="overshadow"></div>
    </div>
}

export default ZoomButton
