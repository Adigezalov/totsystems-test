import {GET_ALL} from '../types/room.types'
import {LOGOUT} from '../types/authorization.types'

const initialState = {
	rooms: [],
}

export const roomReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL:
			return {...state, rooms: action.payload}
		case LOGOUT:
			return initialState
		default:
			return state
	}
}
