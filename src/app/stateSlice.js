import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	stepped: false,
	bassMode: false,
	smoothLoop: false,
	pitch: 0.0,
	range: 0.0,
	noteStep: 0,
	scale: 0,
	delay: {
		mix: 0.0,
		delay: 0.0,
		repeat: 0.0,
	},
	env: {
		attack: 0.0,
		release: 0.0,
	},
	mod: 0,
};
  
export const stateSlice = createSlice({
	name: 'state',
	initialState,
	reducers: {
		
		setStepped: (state, action) => {
			state.stepped = action.payload
		},
		setBassMode: (state, action) => {
			state.bassMode = action.payload
		},
		setSmoothLoop: (state, action) => {
			state.smoothLoop = action.payload
		},
		setScale: (state, action) => {
			state.scale = action.payload
		},
		setMod: (state, action) => {
			state.mod = action.payload
		},
		setPitch: (state, action) => {
			state.pitch = action.payload
		},
		setRange: (state, action) => {
			state.range = action.payload
		},
		setNoteStep: (state, action) => {
			state.noteStep = action.payload
		},
		setDelayMix: (state, action) => {
			state.delay.mix = action.payload
		},
		setDelayDelay: (state, action) => {
			state.delay.delay = action.payload
		},
		setDelayRepeat: (state, action) => {
			state.delay.repeat = action.payload
		},
		setEnvAttack: (state, action) => {
			state.env.attack = action.payload
		},
		setEnvRelease: (state, action) => {
			state.env.release = action.payload
		},
		
	},
})


export default stateSlice.reducer

export const actionMap = {
	stepped: 		stateSlice.actions.setStepped,
	bassMode: 		stateSlice.actions.setBassMode,
	smoothLoop: 	stateSlice.actions.setSmoothLoop,
	scale: 			stateSlice.actions.setScale,
	mod: 			stateSlice.actions.setMod,
	pitch: 			stateSlice.actions.setPitch,
	range: 			stateSlice.actions.setRange,
	noteStep: 		stateSlice.actions.setNoteStep,

	delayMix: 		stateSlice.actions.setDelayMix,
	delayDelay: 	stateSlice.actions.setDelayDelay,
	delayRepeat: 	stateSlice.actions.setDelayRepeat,
	envAttack: 		stateSlice.actions.setEnvAttack,
	envRelease: 	stateSlice.actions.setEnvRelease,
};

