import React from 'react'
import {Box, Divider, IconButton, InputBase, makeStyles, Paper} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'

const leftPadding = 240

const useStyles = makeStyles(theme => ({
	root: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: '100%',
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
	iconButton: {
		padding: 10,
	},
	divider: {
		height: 28,
		margin: 4,
	},
	field: {
		[theme.breakpoints.up('sm')]: {
			left: leftPadding + 20,
			right: 20,
		},
		bottom: 20,
		position: 'fixed',
	},
}))

const InputComponent = props => {
	const {newMessage, setNewMessage, sentMessage} = props
	const classes = useStyles()

	return (
		<Box className={classes.field}>
			<Paper component='form' className={classes.root}>
				<InputBase
					className={classes.input}
					placeholder={'Сообщение'}
					value={newMessage ? newMessage.message : ''}
					onChange={event => setNewMessage(event.target.value)}
				/>
				<Divider className={classes.divider} orientation='vertical' />
				<IconButton color='primary' className={classes.iconButton} onClick={sentMessage} disabled={!newMessage}>
					<SendIcon />
				</IconButton>
			</Paper>
		</Box>
	)
}

export default InputComponent
