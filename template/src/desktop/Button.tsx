import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import PageviewIcon from '@material-ui/icons/Pageview'

/** Styles */
const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(1),
	},
}))

export const MyButton = () => {
	const classes = useStyles()
	return (
		<IconButton aria-label="page-view" className={classes.root}>
			<PageviewIcon />
		</IconButton>
	)
}
