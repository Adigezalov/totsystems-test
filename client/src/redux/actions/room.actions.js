import axios from 'axios'
import {hideLoaderAction, showErrorAction, showLoaderAction} from './app.actions'
import {GET_ALL} from '../types/room.types'
import {API_URL} from '../../keys'

export function getAllRoomsAction() {
	return async dispatch => {
		try {
			dispatch(showLoaderAction())
			const response = await axios({
				method: 'GET',
				url: `${API_URL}/api/room`,
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
