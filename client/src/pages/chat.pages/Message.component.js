import React from 'react'
import {Box, IconButton, makeStyles, Paper, Typography} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

const useStyles = makeStyles(theme => ({
	message: {
		paddingTop: theme.spacing(1),
		paddingRight: theme.spacing(2),
		paddingLeft: theme.spacing(2),
		paddingBottom: theme.spacing(1),
		minWidth: 150,
		maxWidth: 300,
	},
}))

const MessageComponent = props => {
	const {message, removeMessage, editMessage} = props
	const classes = useStyles()

	const myMessage = +localStorage.getItem('user') === +message.user.id

	return (
		<Box mb={1} display={'flex'} width={'100%'} justifyContent={myMessage ? 'flex-end' : 'flex-start'}>
			<Paper className={classes.message} elevation={3}>
				<Box mb={1}>
					<Box mb={1}>
						<Typography align={'right'} variant={'caption'}>
							{message.user.username}
						</Typography>
					</Box>
					<Typography align={myMessage ? 'right' : 'left'} variant={'body2'}>
						{message.message}
					</Typography>
				</Box>
				{myMessage ? (
					<Box display={'flex'} flexDirection={'row'} justifyContent={'flex-end'}>
						<IconButton
							size={'small'}
							variant='outlined'
							color={'primary'}
							style={{marginRight: 10}}
							onClick={() => editMessage(message)}
						>
							<EditIcon fontSize={'small'} />
						</IconButton>
						<IconButton size={'small'} variant='outlined' color={'secondary'} onClick={() => removeMessage(message.id)}>
							<DeleteForeverIcon fontSize={'small'} />
						</IconButton>
					</Box>
				) : null}
			</Paper>
		</Box>
	)
}

export default MessageComponent
