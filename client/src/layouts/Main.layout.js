import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {
	AppBar,
	CssBaseline,
	Divider,
	Drawer,
	Hidden,
	List,
	ListItem,
	ListItemText,
	Toolbar,
	Typography,
	IconButton,
	ListItemIcon,
	Button,
	Box,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import ChatIcon from '@material-ui/icons/Chat'
import {makeStyles, useTheme} from '@material-ui/core/styles'
import {logOutAction} from '../redux/actions/authorization.actions'
import {setRouteAction} from '../redux/actions/app.actions'
import {getAllRoomsAction} from '../redux/actions/room.actions'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	appBar: {
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
}))

const MainLayout = ({children}) => {
	const classes = useStyles()
	const theme = useTheme()
	const dispatch = useDispatch()
	const url = useSelector(s => s.app.url)
	const rooms = useSelector(s => s.room.rooms)
	const [mobileOpen, setMobileOpen] = useState(false)

	useEffect(() => {
		dispatch(setRouteAction(window.location.pathname.split('/')[2]))
	})

	useEffect(() => {
		dispatch(getAllRoomsAction())
	}, [])

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen)
	}

	const logOut = () => {
		dispatch(logOutAction())
	}

	const drawer = (
		<>
			<Box className={classes.toolbar} display={'flex'} justifyContent={'center'} alignItems={'center'}>
				<Typography>{localStorage.getItem('username')}</Typography>
			</Box>
			<Divider />
			<List>
				{rooms.map(room => (
					<ListItem key={room.id} button component={Link} to={`/chat/${room.id}`} selected={+url === +room.id}>
						<ListItemIcon>
							<ChatIcon />
						</ListItemIcon>
						<ListItemText primary={room.name} />
					</ListItem>
				))}
			</List>
		</>
	)

	return (
		<Box className={classes.root}>
			<CssBaseline />
			<AppBar position='fixed' className={classes.appBar}>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						edge='start'
						onClick={handleDrawerToggle}
						className={classes.menuButton}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' style={{flexGrow: 1}}>
						TOTSystems
					</Typography>
					<Button variant={'outlined'} size={'small'} onClick={logOut}>
						Выход
					</Button>
				</Toolbar>
			</AppBar>
			<nav className={classes.drawer} aria-label='mailbox folders'>
				<Hidden smUp implementation='css'>
					<Drawer
						variant='temporary'
						anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true,
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation='css'>
					<Drawer
						classes={{
							paper: classes.drawerPaper,
						}}
						variant='permanent'
						open
					>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
			<Box className={classes.content}>
				<Box className={classes.toolbar} />
				{children}
			</Box>
		</Box>
	)
}

export default MainLayout
