import {SHOW_ERROR, HIDE_ERROR, SHOW_LOADER, HIDE_LOADER, SET_TOKEN, SET_ROUTE, SET_USER} from '../types/app.types'
import {LOGOUT} from '../types/authorization.types'

const initialState = {
	token: null,
	user: null,
	loading: false,
	url: null,
	error: null,
}

export const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case SHOW_LOADER:
			return {...state, loading: true}
		case HIDE_LOADER:
			return {...state, loading: false}
		case SHOW_ERROR:
			return {...state, error: action.payload}
		case HIDE_ERROR:
			return {...state, error: null}
		case SET_TOKEN:
			return {...state, token: action.payload}
		case SET_USER:
			return {...state, user: action.payload}
		case SET_ROUTE:
			return {...state, url: action.payload}
		case LOGOUT:
			return initialState
		default:
			return state
	}
}
