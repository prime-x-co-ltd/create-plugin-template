import React, { useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
/**Components */
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Switch from '@material-ui/core/Switch'
import { AppContext } from '..'

/** Styles */
const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(1),
		width: '25ch',
	},
	list: {
		width: '100%',
		maxWidth: 240,
		border: '1px solid #ccc',
	},
}))

export const SwitchList = () => {
	const classes = useStyles()
	const { dispatch } = useContext(AppContext)
	const [list, setList] = useState([
		{ key: 0, name: '経理', checked: false },
		{ key: 1, name: '人事', checked: false },
		{ key: 2, name: '事業推進部', checked: false },
		{ key: 3, name: 'アカウント部', checked: false },
	])
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const updated = list.map((item) => {
			if (item.name === event.target.name) {
				item.checked = !item.checked
				return item
			} else {
				return item
			}
		})
		setList(updated)
		const checked: string[] = []
		updated.forEach((item) => {
			if (item.checked) checked.push(item.name)
		})
		dispatch({ type: 'department', payload: checked })
	}
	return (
		<List className={classes.list}>
			{list.map((item) => (
				<ListItem key={item.key}>
					<ListItemText primary={item.name} />
					<ListItemSecondaryAction>
						<Switch name={item.name} checked={item.checked} color="primary" onChange={handleChange} />
					</ListItemSecondaryAction>
				</ListItem>
			))}
		</List>
	)
}
