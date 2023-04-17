import cog from './cog.svg'
import React from 'react'

import './App.css'
import Toggle from './components/Toggle.js'
import Slider from './components/Slider.js'
import RecButton from './components/RecButton.js'
import WaveCropper from './components/WaveCropper.js'
import TouchPad from './components/TouchPad.js'
import ZoomButton from './components/ZoomButton.js'
import { Segmented, Option } from './components/Segmented.js'

import {Tools, Tool} from './components/Tools.js'
import DevTools from './components/DevTools'
import { setMouseIsDown } from './app/mouseUtil'
import FullSizeCanvas from './components/FullSizeCanvas'
import SpinningStar from './components/SpinningStar'
function Title() {
	return  <div id="title">
		<h1>SAMPLETOY</h1>
	</div>
}

function Top() {
	return <div id="top">
		<Title />
		<div id="cog"><img src={cog} alt="settings" /></div>
	</div>
}



// Import the DevTools only if the NODE_ENV is not production.
let MyDevTools = () => {return <div /> }
if (process.env.NODE_ENV !== 'production') {
// //   const { default: DefaultDevTools } = require('@devtools-detect');
  MyDevTools = () => {return <DevTools />}
}



function App() {

	// const dispatch = useDispatch();

	function globalMouseDown() {
		setMouseIsDown(true)
		// dispatch(actionMap['mouseIsDown'](true))
	}
	function globalMouseUp() {
		setMouseIsDown(false)
		// dispatch(actionMap['mouseIsDown'](false))
	}
  return (

    // <div id="main" onMouseDown={globalMouseDown} onMouseUp={globalMouseUp}>
    //   <Top />
	
	// 	<div id="rec-wave-chop">
	// 		<div id="rec-wave-zoom">
	// 			<RecButton />
	// 			<WaveCropper />
	// 			<ZoomButton />
	// 		</div>
	// 		<TouchPad />
	// 	</div>
	// 	<div>
	// 		<Tools>
	// 			<Tool name="PITCH">
	// 			<Slider name="PTICH" stateName="pitch" />
	// 			<Slider name="RANGE" stateName="range" />
	// 			<Toggle name="SMOOTH LOOP" stateName="smoothLoop" />
	// 			</Tool>
	// 			<Tool name="SCALE">
	// 				<Toggle name="STEPPED" stateName="stepped" />
	// 				<Toggle name="BASS MODE" stateName="bassMode" />
	// 				<Slider name="NOTE STEP" stateName="noteStep" />

	// 				<Segmented stateName="scale">
	// 					<Option name="CHROM" />
	// 					<Option name="MAJ" />
	// 					<Option name="MIN" />
	// 					<Option name="PENTA" />
	// 					<Option name="WHOLE" />
	// 				</Segmented>	
	// 			</Tool>
	// 			<Tool name="DELAY">
	// 				<Slider name="MIX" stateName="delayMix" />
	// 				<Slider name="DELAY" stateName="delayDelay" />
	// 				<Slider name="REPEAT" stateName="delayRepeat" />
	// 			</Tool>
	// 			<Tool name="ENV">
	// 				<Slider name="ATTACK" stateName="envAttack" />
	// 				<Slider name="RELEASE" stateName="envRelease" />
	// 			</Tool>
	// 			<Tool name="MOD">
	// 				<Segmented stateName="mod">
	// 					<Option name="NONE" />
	// 					<Option name="LP" />
	// 					<Option name="BP" />
	// 					<Option name="HP" />
	// 					<Option name="ATT." />
	// 					<Option name="REL." />
	// 				</Segmented>	
	// 			</Tool>
	// 		</Tools>
			
	// 	</div>
	// 	<MyDevTools />
	// </div>
	<SpinningStar />
  );
}

export default App;
