import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'
import MainLayout from '../layouts/Main.layout'

export const PrivateRoute = ({page, ...rest}) => {
	const token = useSelector(state => state.app.token)

	return (
		<Route
			{...rest}
			render={({location}) =>
				token || localStorage.getItem('token') ? (
					<MainLayout>{page}</MainLayout>
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: {from: location},
						}}
					/>
				)
			}
		/>
	)
}
