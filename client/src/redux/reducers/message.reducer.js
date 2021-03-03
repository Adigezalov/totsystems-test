import {GET_ALL, CLEAR_ALL, GET_CREATED, GET_NEW, CREATE_NEW, REMOVE, EDIT, GET_ONE} from '../types/message.types'
import {LOGOUT} from '../types/authorization.types'

const initialState = {
	messages: [],
	newMessage: null,
}

export const messageReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL:
			return {...state, messages: action.payload}
		case GET_ONE:
			return {...state, newMessage: action.payload}
		case GET_NEW:
			return {...state, messages: [...state.messages, action.payload]}
		case GET_CREATED:
			return {...state, messages: [...state.messages, action.payload], newMessage: null}
		case CREATE_NEW:
			return {...state, newMessage: {...state.newMessage, message: action.payload}}
		case REMOVE:
			return {...state, messages: state.messages.filter(item => item.id !== action.payload)}
		case EDIT:
			const index = state.messages.findIndex(item => item.id === action.payload.id)
			state.messages.splice(index, 1, action.payload)
			return {...state, messages: state.messages.slice(), newMessage: null}
		case CLEAR_ALL:
			return initialState
		case LOGOUT:
			return initialState
		default:
			return state
	}
}
