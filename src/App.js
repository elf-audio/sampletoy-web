import cog from './cog.svg'

import './App.css'
import { cloneElement, useState } from 'react'
import Toggle from './components/Toggle.js'
import Slider from './components/Slider.js'
import RecButton from './components/RecButton.js'
import WaveCropper from './components/WaveCropper.js'
import TouchPad from './components/TouchPad.js'
import ZoomButton from './components/ZoomButton.js'
import {Tools, Tool} from './components/Tools.js'

let mouseIsDown = false;

function Title() {
	return  <div id="title">
		<h1>SAMPLETOY</h1>
	</div>
}

function Top() {
	return <div id="top">
		<Title />
		<div id="cog"><img src={cog} /></div>
	</div>
}


const Option = ({ name, isActive, onMouseDown, onMouseMove }) => {
	return <li className={isActive?"selected":null} onMouseDown={onMouseDown} onMouseMove={onMouseMove}><label>{name}</label></li>;	
}
  
const Segmented = ({ children }) => {
	const [activeOption, setActiveOption] = useState(1);
	return <ul className="segmented">
		{children.map((child, index) =>
			cloneElement(child, {
				key: child.props.name,
				isActive: activeOption === index,
				onMouseDown: () => setActiveOption(index),
				onMouseMove: () => {
					if(mouseIsDown) {
						setActiveOption(index);
					}
				}
			}),
		)}
	</ul>
}


function App() {
	function globalMouseDown() {
		mouseIsDown = true;
	}
	function globalMouseUp() {
		mouseIsDown = false;
	}
  return (

    <div id="main" onMouseDown={globalMouseDown} onMouseUp={globalMouseUp}>
      <Top />
	
		<div id="rec-wave-chop">
			<div id="rec-wave-zoom">
				<RecButton />
				<WaveCropper />
				<ZoomButton />
			</div>
			<TouchPad />
		</div>
		<div>
			<Tools>
				<Tool name="PITCH">
				<Slider name="PTICH" />
				<Slider name="RANGE" />
				<Toggle name="SMOOTH LOOP" />
				</Tool>
				<Tool name="SCALE">
					<Toggle name="STEPPED" />
					<Toggle name="BASS MODE" />
					<Slider name="NOTE STEP" />

					<Segmented>
						<Option name="CHROM" />
						<Option name="MAJ" />
						<Option name="MIN" />
						<Option name="PENTA" />
						<Option name="WHOLE" />
					</Segmented>	
				</Tool>
				<Tool name="DELAY">
					<Slider name="MIX" />
					<Slider name="DELAY" />
					<Slider name="REPEAT" />
				</Tool>
				<Tool name="ENV">
					<Slider name="ATTACK" />
					<Slider name="DECAY" />
				</Tool>
				<Tool name="MOD">
					<Segmented>
						<Option name="NONE" />
						<Option name="LP" />
						<Option name="BP" />
						<Option name="HP" />
						<Option name="ATT." />
						<Option name="REL." />
					</Segmented>	
				</Tool>
			</Tools>
			
		</div>
	</div>
  );
}

export default App;
