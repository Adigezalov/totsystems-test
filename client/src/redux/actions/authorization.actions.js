import axios from 'axios'
import {hideLoaderAction, setTokenAction, showErrorAction, showLoaderAction} from './app.actions'
import {LOGOUT} from '../types/authorization.types'
import {API_URL} from '../../keys'

export function logInAction(user) {
	return async dispatch => {
		try {
			dispatch(showLoaderAction())
			const response = await axios({
				method: 'POST',
				url: `${API_URL}/api/authorization/login`,
				data: user,
			})
			if (response.error) {
				dispatch(showErrorAction(response.error))
			} else {
				localStorage.setItem('token', response.data.token)
				localStorage.setItem('user', response.data.id)
				localStorage.setItem('username', response.data.username)
				dispatch(setTokenAction(response.data.token))
			}
			dispatch(hideLoaderAction())
		} catch (e) {
			dispatch(showErrorAction(e.response.data.error))
			dispatch(hideLoaderAction())
		}
	}
}

export function logOutAction() {
	localStorage.clear()
	return {
		type: LOGOUT,
	}
}
