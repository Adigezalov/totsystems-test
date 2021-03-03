import axios from 'axios'
import {hideLoaderAction, showErrorAction, showLoaderAction} from './app.actions'
import {GET_ALL, CLEAR_ALL, GET_NEW, GET_CREATED, CREATE_NEW, REMOVE, EDIT, GET_ONE} from '../types/message.types'
import {API_URL} from '../../keys'

export function getAllMessagesAction(room) {
	return async dispatch => {
		try {
			dispatch(showLoaderAction())
			const response = await axios({
				method: 'GET',
				url: `${API_URL}/api/message/${room}`,
				headers: {
					Authorization: localStorage.getItem('token'),
				},
			})

			if (response.error) {
				dispatch(showErrorAction(response.error))
			} else {
				dispatch({
					type: GET_ALL,
					payload: response.data,
				})
			}
		} catch (e) {
			dispatch(showErrorAction(e.response.data.message))
			dispatch(hideLoaderAction())
		}
	}
}

export function getOneMessageAction(message) {
	return {
		type: GET_ONE,
		payload: message,
	}
}

export function getNewMessageAction(message) {
	return {
		type: GET_NEW,
		payload: message,
	}
}

export function getCreatedMessageAction(message) {
	return {
		type: GET_CREATED,
		payload: message,
	}
}

export function createNewMessageAction(message) {
	return {
		type: CREATE_NEW,
		payload: message,
	}
}

export function removeMessageAction(id) {
	return {
		type: REMOVE,
		payload: id,
	}
}

export function editMessageAction(message) {
	return {
		type: EDIT,
		payload: message,
	}
}

export function clearAllMessagesAction() {
	return {
		type: CLEAR_ALL,
	}
}
