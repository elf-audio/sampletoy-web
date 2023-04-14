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
			state.stepped = action.payload;
		},
		setBassMode: (state, action) => {
			state.bassMode = action.payload;
		},
		setSmoothLoop: (state, action) => {
			state.smoothLoop = action.payload;
		},
		setScale: (state, action) => {
			state.scale = action.payload;
		},
		setMod: (state, action) => {
			state.mod = action.payload;
		},
		
	},
})

// // Action creators are generated for each case reducer function
// export const { 
// 	setStepped, 
// 	setBassMode, 
// 	setSmoothLoop 
// } = stateSlice.actions;

export default stateSlice.reducer

export const actionMap = {
	stepped: 		stateSlice.actions.setStepped,
	bassMode: 		stateSlice.actions.setBassMode,
	smoothLoop: 	stateSlice.actions.setSmoothLoop,
	scale: 			stateSlice.actions.setScale,
	mod: 			stateSlice.actions.setMod,
};

