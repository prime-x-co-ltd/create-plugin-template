import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
/**Components */
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Switch from '@material-ui/core/Switch'
/**Context */
import { useKintoneContext } from '../index'
import { usePlugInContext } from '../PlugInProvider'
/**Types */
import { StateKeys } from '../PlugInProvider'

/** Styles */
const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(1),
		width: '25ch',
	},
	list: {
		width: '100%',
		maxWidth: '35ch',
		border: '1px solid #ccc',
		margin: theme.spacing(1),
	},
}))
/** Types: SwitchList */
type Props = { name: StateKeys }
/** SwitchList */
export const SwitchList = ({ name }: Props) => {
	const classes = useStyles()
	const kintone = useKintoneContext()
	const { state, dispatch } = usePlugInContext()
	const [list, setList] = React.useState(kintone.departments)

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

	React.useEffect(() => {
		const list = kintone.departments.map((department) => {
			const checked = state[name] as string[]
			if (checked.find((item) => item === department.name)) {
				department.checked = true
			}
			return department
		})
		if (list) setList(list)
	}, [name, state, kintone])

	return (
		<List className={classes.list}>
			{list.map((item) => (
				<ListItem key={item.key}>
					<ListItemText primary={item.name} />
					<ListItemSecondaryAction>
						<Switch
							name={item.name}
							checked={item.checked}
							color="primary"
							onChange={handleChange}
						/>
					</ListItemSecondaryAction>
				</ListItem>
			))}
		</List>
	)
}
