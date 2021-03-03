import React, {useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import io from 'socket.io-client'
import {Box} from '@material-ui/core'
import {API_URL} from '../../keys'
import {
	clearAllMessagesAction,
	createNewMessageAction,
	editMessageAction,
	getAllMessagesAction,
	getCreatedMessageAction,
	getNewMessageAction,
	getOneMessageAction,
	removeMessageAction,
} from '../../redux/actions/message.actions'
import InputComponent from './Input.component'
import MessageComponent from './Message.component'

const socket = io.connect(API_URL)

const ChatPage = () => {
	const messagesEnd = useRef(null)
	const dispatch = useDispatch()
	const url = useSelector(s => s.app.url)
	const messages = useSelector(s => s.message.messages)
	const newMessage = useSelector(s => s.message.newMessage)

	console.log(messages)

	useEffect(
		function () {
			scrollToBottom()
		},
		[messages]
	)

	const scrollToBottom = () => {
		if (!messagesEnd) {
			return
		}
		messagesEnd.current.scrollIntoView({behavior: 'smooth'})
	}

	useEffect(() => {
		dispatch(clearAllMessagesAction())
		dispatch(getAllMessagesAction(url))
		socket.off()
		socket.on(`CHAT_ROOM_${url}_FROM_SERVER`, message => {
			dispatch(getNewMessageAction(message))
		})
		socket.on(`CHAT_ROOM_${url}_FROM_SERVER_MY`, message => {
			dispatch(getCreatedMessageAction(message))
		})
		socket.on(`REMOVE_MESSAGE_FROM_SERVER`, id => {
			dispatch(removeMessageAction(id))
		})
		socket.on(`EDIT_MESSAGE_FROM_SERVER`, message => {
			dispatch(editMessageAction(message))
		})
	}, [url])

	const setNewMessage = message => {
		dispatch(createNewMessageAction(message))
	}

	const editMessage = message => {
		dispatch(getOneMessageAction(message))
	}

	const sentMessage = () => {
		newMessage.id
			? socket.emit(`EDIT_MESSAGE_FROM_CLIENT`, {message: newMessage.message, id: newMessage.id})
			: socket.emit(`CHAT_ROOM_FROM_CLIENT`, {
					message: newMessage.message,
					roomId: url,
					user: localStorage.getItem('user'),
			  })
	}

	const removeMessage = id => {
		socket.emit(`REMOVE_MESSAGE_FROM_CLIENT`, {id})
	}

	return (
		<>
			<Box pb={6}>
				{messages.map(message => {
					return (
						<MessageComponent
							key={message.id}
							message={message}
							removeMessage={removeMessage}
							editMessage={editMessage}
						/>
					)
				})}
				<div ref={messagesEnd} />
			</Box>
			<InputComponent setNewMessage={setNewMessage} sentMessage={sentMessage} newMessage={newMessage} />
		</>
	)
}

export default ChatPage
