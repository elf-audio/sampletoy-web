import React from 'react'
const RecButton = () => {

	const recClicked = (e) => {
		e.preventDefault()
		console.log('The link was clicked.')
	}
	
	return <div id="rec" onClick={recClicked}>
		<div className="progress"></div>
		<h1>REC</h1>
		<div className="overshadow"></div>
	</div>
}

export default RecButton