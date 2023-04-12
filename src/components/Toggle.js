
import { useState } from 'react'

const Toggle = ({name}) => {

	const [active, setActive] = useState(false)

	const clicked = (e) => {
		e.preventDefault()
		setActive(!active)
	}

	return <div 
			className={active? "checkbox selected" : "checkbox"} 
			onMouseDown={clicked}>
				<label>{name}</label>
	</div>;
}

export default Toggle