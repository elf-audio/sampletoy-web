import star from '../star.svg'

const TouchPad = (props) => {
	
	
	
	
	
	let shapes = []
	for(let i = 0; i < 10; i++) {
		shapes.push(<circle cx={10*i} cy={50} r={5} fill="red" />)
	}
	return <div id="chop" className="inner-shadow">
	
	<svg>
		{shapes}
      </svg>
	{/* <div className="touch"><img src={star} /></div> */}
	
	</div>
}

export default TouchPad


