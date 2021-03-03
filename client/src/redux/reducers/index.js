import {combineReducers} from 'redux'
import {appReducer} from './app.reducer'
import {roomReducer} from './room.reducer'
import {messageReducer} from './message.reducer'

export const rootReducer = combineReducers({
	app: appReducer,
	room: roomReducer,
	message: messageReducer,
})
