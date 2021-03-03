import {HIDE_ERROR, HIDE_LOADER, SET_TOKEN, SHOW_ERROR, SHOW_LOADER, SET_ROUTE, SET_USER} from '../types/app.types'

export function showLoaderAction() {
	return {
		type: SHOW_LOADER,
	}
}

export function hideLoaderAction() {
	return {
		type: HIDE_LOADER,
	}
}

export function showErrorAction(error) {
	return {
		type: SHOW_ERROR,
		payload: error,
	}
}

export function hideErrorAction() {
	return {
		type: HIDE_ERROR,
	}
}

export function setTokenAction(token) {
	return {
		type: SET_TOKEN,
		payload: token,
	}
}

export function setUserAction(user) {
	return {
		type: SET_USER,
		payload: user,
	}
}

export function setRouteAction(route) {
	return {
		type: SET_ROUTE,
		payload: route,
	}
}
