import React, {useEffect} from 'react'
import {Switch, Router, useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {setTokenAction, setUserAction} from './redux/actions/app.actions'
import {PublicRoute} from './components/PublicRoute.component'
import {PrivateRoute} from './components/PrivateRoute.component'
import LoginPage from './pages/login.pages/Login.page'
import ChatPage from './pages/chat.pages/Chat.page'
import NotFoundPage from './pages/404.pages/NotFound.page'

function App() {
	const history = useHistory()
	const dispatch = useDispatch()

	useEffect(() => {
		const token = localStorage.getItem('token')
		const user = localStorage.getItem('user')
		dispatch(setTokenAction(token))
		dispatch(setUserAction(user))
	}, [])

	return (
		<>
			<Router history={history}>
				<Switch>
					<PublicRoute exact path={'/login'} page={<LoginPage />} />
					<PrivateRoute exact path={'/chat/:id'} page={<ChatPage />} />
					<PrivateRoute exact path={'*'} page={<NotFoundPage />} />
				</Switch>
			</Router>
		</>
	)
}

export default App
