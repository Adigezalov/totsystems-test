import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import {TextField, Button, Box} from '@material-ui/core'
import {logInAction} from '../../redux/actions/authorization.actions'

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
	},
	form: {
		display: 'flex',
		width: 300,
		flexDirection: 'column',
	},
}))

const LoginPage = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const [user, setUser] = useState({username: '', password: ''})
	const [disabled, setDisabled] = useState(true)

	useEffect(() => {
		user.username.length && user.password.length ? setDisabled(false) : setDisabled(true)
	}, [user])

	const handleSetUser = (data, field) => {
		setUser({...user, [field]: data})
	}

	const logIn = () => {
		dispatch(logInAction(user))
	}

	return (
		<Box className={classes.root}>
			<Box className={classes.form}>
				<Box mb={1}>
					<TextField
						size={'small'}
						fullWidth
						variant={'outlined'}
						label={'Логин'}
						value={user.username}
						onChange={event => {
							handleSetUser(event.target.value, 'username')
						}}
					/>
				</Box>
				<Box mb={1}>
					<TextField
						size={'small'}
						fullWidth
						type={'password'}
						variant={'outlined'}
						label={'Пароль'}
						value={user.password}
						onChange={event => {
							handleSetUser(event.target.value, 'password')
						}}
					/>
				</Box>
				<Box>
					<Button size={'small'} fullWidth variant='contained' color='primary' disabled={disabled} onClick={logIn}>
						Войти
					</Button>
				</Box>
			</Box>
		</Box>
	)
}

export default LoginPage
