import { configureStore } from '@reduxjs/toolkit'
import stateReducer from './stateSlice'
import DevTools from '../components/DevTools';

const store = configureStore({
	reducer: {
		state: stateReducer
	},
	enhancers: [
		DevTools.instrument()
	]
})



export default store