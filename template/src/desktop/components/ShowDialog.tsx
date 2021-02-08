// import React, { useState } from 'react'
// import { makeStyles } from '@material-ui/core/styles'
// import IconButton from '@material-ui/core/IconButton'
// import PageviewIcon from '@material-ui/icons/Pageview'
// import Button from '@material-ui/core/Button'
// import Dialog from '@material-ui/core/Dialog'
// import DialogContent from '@material-ui/core/DialogContent'
// import DialogActions from '@material-ui/core/DialogActions'
// import List from '@material-ui/core/List'
// import ListSubheader from '@material-ui/core/ListSubheader'
// import ListItem from '@material-ui/core/ListItem'
// import ListItemIcon from '@material-ui/core/ListItemIcon'
// import ListItemText from '@material-ui/core/ListItemText'
// import Collapse from '@material-ui/core/Collapse'
// /**Icons */
// import AppsIcon from '@material-ui/icons/Apps'
// import TextFieldsIcon from '@material-ui/icons/TextFields'
// import TodayIcon from '@material-ui/icons/Today'
// import AccessTimeIcon from '@material-ui/icons/AccessTime'
// import AccountTreeIcon from '@material-ui/icons/AccountTree'
// import ExpandLess from '@material-ui/icons/ExpandLess'
// import ExpandMore from '@material-ui/icons/ExpandMore'
// import StarBorder from '@material-ui/icons/StarBorder'
// import VpnKeyIcon from '@material-ui/icons/VpnKey'
// /**Context */
// import { usePluginContext } from '../index'

// /** Styles */
// const useStyles = makeStyles((theme) => ({
// 	root: {
// 		margin: theme.spacing(1),
// 	},
// 	list: {
// 		width: '100%',
// 		maxWidth: 360,
// 		backgroundColor: theme.palette.background.paper,
// 	},
// 	nested: {
// 		paddingLeft: theme.spacing(4),
// 	},
// }))

// export const MyButton = () => {
// 	const classes = useStyles()
// 	const { config } = usePluginContext()
// 	const [openDialog, setOpenDialog] = useState(false)
// 	const [open, setOpen] = useState(false)

// 	const handleOpenDialog = () => setOpenDialog(true)
// 	const handleCloseDialog = () => setOpenDialog(false)
// 	const handleClick = () => setOpen(!open)

// 	return (
// 		<>
// 			<IconButton
// 				aria-label="page-view"
// 				className={classes.root}
// 				onClick={handleOpenDialog}>
// 				<PageviewIcon fontSize="large" />
// 			</IconButton>
// 			<Dialog open={openDialog} onClose={handleCloseDialog}>
// 				<DialogContent>
// 					<List
// 						className={classes.list}
// 						component="nav"
// 						subheader={
// 							<ListSubheader component="div">
// 								PlugIn-Confiturations
// 							</ListSubheader>
// 						}>
// 						<ListItem button>
// 							<ListItemIcon>
// 								<AppsIcon />
// 							</ListItemIcon>
// 							<ListItemText
// 								primary="APP ID"
// 								secondary={config.app}
// 							/>
// 						</ListItem>
// 						<ListItem button>
// 							<ListItemIcon>
// 								<TextFieldsIcon />
// 							</ListItemIcon>
// 							<ListItemText
// 								primary="TEXT FIELD"
// 								secondary={config.single_line_text}
// 							/>
// 						</ListItem>
// 						<ListItem button>
// 							<ListItemIcon>
// 								<TextFieldsIcon />
// 							</ListItemIcon>
// 							<ListItemText
// 								primary="DATE FIELD"
// 								secondary={config.date_field}
// 							/>
// 						</ListItem>
// 						<ListItem button>
// 							<ListItemIcon>
// 								<AccessTimeIcon />
// 							</ListItemIcon>
// 							<ListItemText
// 								primary="PERIOD"
// 								secondary={config.period}
// 							/>
// 						</ListItem>
// 						<ListItem button>
// 							<ListItemIcon>
// 								<TodayIcon />
// 							</ListItemIcon>
// 							<ListItemText
// 								primary="DATE"
// 								secondary={config.date}
// 							/>
// 						</ListItem>
// 						<ListItem button onClick={handleClick}>
// 							<ListItemIcon>
// 								<AccountTreeIcon />
// 							</ListItemIcon>
// 							<ListItemText primary="DEPARTMENT" />
// 							{open ? <ExpandLess /> : <ExpandMore />}
// 						</ListItem>
// 						<Collapse in={open} timeout="auto" unmountOnExit>
// 							<List component="div" disablePadding>
// 								{config.department.map((item) => (
// 									<ListItem
// 										key={item}
// 										button
// 										className={classes.nested}>
// 										<ListItemIcon>
// 											<StarBorder />
// 										</ListItemIcon>
// 										<ListItemText primary={item} />
// 									</ListItem>
// 								))}
// 							</List>
// 						</Collapse>
// 						<ListItem button>
// 							<ListItemIcon>
// 								<VpnKeyIcon />
// 							</ListItemIcon>
// 							<ListItemText
// 								primary="API TOKEN"
// 								secondary={config.token}
// 							/>
// 						</ListItem>
// 					</List>
// 				</DialogContent>
// 				<DialogActions>
// 					<Button
// 						onClick={handleCloseDialog}
// 						color="primary"
// 						autoFocus>
// 						OK
// 					</Button>
// 					<Button onClick={handleCloseDialog} color="primary">
// 						Cancel
// 					</Button>
// 				</DialogActions>
// 			</Dialog>
// 		</>
// 	)
// }
