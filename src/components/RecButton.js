const RecButton = () => {

	const recClicked = (e) => {
		e.preventDefault()
		console.log('The link was clicked.')
	}
	
	return <div id="rec" onClick={recClicked}>
		<div class="progress"></div>
		<h1>REC</h1>
		<div class="overshadow"></div>
	</div>
}

export default RecButton