import * as React from 'react'
import ReactDOM from 'react-dom'
import { Theme, makeStyles } from '@material-ui/core/styles'
import ListSubheader from '@material-ui/core/ListSubheader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'

import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

import CategoryIcon from '@material-ui/icons/Category'
import FindInPageIcon from '@material-ui/icons/FindInPage'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import AccountTreeIcon from '@material-ui/icons/AccountTree'
import GroupIcon from '@material-ui/icons/Group'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import AddBoxIcon from '@material-ui/icons/AddBox'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'

// Styles
const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: '100%',
		maxWidth: 800,
		backgroundColor: theme.palette.background.paper,
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
	category: {
		margin: theme.spacing(1),
		width: '15ch',
	},
	assignee: {
		margin: theme.spacing(1),
		width: '35ch',
	},
}))

// API Response
const categories = [
	{ key: 'category_1', value: '広告／運用型広告（FG/TW/LINE/SN/Criteo）' },
	{ key: 'category_2', value: '広告／運用型広告（Y/G）' },
	{ key: 'category_3', value: '広告／予約型広告' },
	{ key: 'category_4', value: '広告／計測ツール・タグマネ' },
	{ key: 'category_5', value: '広告／アドクリエイティブ（LP含む）' },
	{ key: 'category_6', value: '広告／その他' },
]
const assignees = [
	{ key: 'suzuki', value: '鈴木　一郎' },
	{ key: 'yamada', value: '山田　花子' },
	{ key: 'bob', value: 'ボブサップ' },
]
const organizations = [
	{ key: 'account', value: 'アカウント部' },
	{ key: 'design', value: 'デザイン部' },
	{ key: 'marketing', value: 'マーケティング部' },
]
const groups = [
	{ key: 'mgrOrAbove', value: 'MGR以上' },
	{ key: 'directorOrAbove', value: '部長以上' },
	{ key: 'officerOrAbove', value: '役員以上' },
]

// Types
interface User {
	key: string
	value: string
}
interface UserWithIcon extends User {
	icon: () => JSX.Element
}
interface OptionList {
	[key: string]: { key: string; value: string }[]
}

// Components
export const AssigneeListItem = () => {
	const classes = useStyles()
	const divisions = [
		{ key: 'assignees', value: '人から' },
		{ key: 'organizations', value: '組織から' },
		{ key: 'groups', value: 'グループから' },
	]
	const optionList: OptionList = {
		assignees: assignees,
		organizations: organizations,
		groups: groups,
	}
	const [division, setCategory] = React.useState(divisions[0].key)
	const [option, setOption] = React.useState('')

	const handleClickCategory = (event: React.ChangeEvent<HTMLInputElement>) =>
		setCategory(event.target.value)
	const handleClickAssignee = (event: React.ChangeEvent<HTMLInputElement>) =>
		setOption(event.target.value)

	return (
		<>
			<TextField
				select
				label="区分"
				size="small"
				variant="outlined"
				value={division}
				onChange={handleClickCategory}
				className={classes.category}>
				{divisions.map((division) => (
					<MenuItem key={division.key} value={division.key}>
						{division.value}
					</MenuItem>
				))}
			</TextField>
			<TextField
				select
				// label="通知したい人・組織・グループ"
				size="small"
				value={option}
				onChange={handleClickAssignee}
				className={classes.assignee}>
				{optionList[division].map((item) => (
					<MenuItem key={item.key} value={item.value}>
						{item.value}
					</MenuItem>
				))}
			</TextField>
		</>
	)
}

export const AssigneeList = () => {
	const classes = useStyles()
	const divisions = [
		{ key: 'assignees', value: '人から' },
		{ key: 'organizations', value: '組織から' },
		{ key: 'groups', value: 'グループから' },
	]
	const optionList: OptionList = {
		assignees: assignees,
		organizations: organizations,
		groups: groups,
	}

	const [divisionKey, setDivisionKey] = React.useState(divisions[0].key)
	const [selectedKey, setSelectedKey] = React.useState('')
	// const [assignee, setAssignee] = React.useState({} as User)

	const [users, setUsers] = React.useState<UserWithIcon[]>([
		{
			key: '9999',
			value: 'No user selected',
			icon: () => <AccountBoxIcon />,
		},
	])

	const handleClickCategory = (event: React.ChangeEvent<HTMLInputElement>) =>
		setDivisionKey(event.target.value)
	const handleClickAssignee = (event: React.ChangeEvent<HTMLInputElement>) =>
		setSelectedKey(event.target.value)

	const handleClickAdd = () => {
		// Remove default user
		const _users = users.filter((user) => user.key !== '9999')
		let newUser: User | undefined
		let newUserWithIcon: UserWithIcon | undefined
		switch (divisionKey) {
			case 'assignees':
				newUser = assignees.find((a) => a.key === selectedKey)
				if (!newUser) break
				newUserWithIcon = {
					...newUser,
					...{ icon: () => <AccountBoxIcon /> },
				}
				break
			case 'organizations':
				newUser = organizations.find((o) => o.key === selectedKey)
				if (!newUser) break
				newUserWithIcon = {
					...newUser,
					...{ icon: () => <AccountTreeIcon /> },
				}
				break
			case 'groups':
				newUser = groups.find((g) => g.key === selectedKey)
				if (!newUser) break
				newUserWithIcon = {
					...newUser,
					...{ icon: () => <GroupIcon /> },
				}
				break
		}
		if (!newUserWithIcon) return
		const newUsers = [..._users, newUserWithIcon]
		setUsers(newUsers)
		setSelectedKey('')
	}
	const handleClickDelete = (key: string) => {
		const newUsers = users.filter((user) => user.key !== key)
		setUsers(newUsers)
	}
	return (
		<List component="nav" disablePadding>
			<ListItem button className={classes.nested}>
				<ListItemIcon>
					<FindInPageIcon />
				</ListItemIcon>
				<TextField
					select
					label="区分"
					size="small"
					variant="outlined"
					value={divisionKey}
					onChange={handleClickCategory}
					className={classes.category}>
					{divisions.map((division) => (
						<MenuItem key={division.key} value={division.key}>
							{division.value}
						</MenuItem>
					))}
				</TextField>
				<TextField
					select
					label="通知したい人・組織・グループ"
					size="small"
					value={selectedKey}
					onChange={handleClickAssignee}
					className={classes.assignee}>
					{optionList[divisionKey].map((item) => (
						<MenuItem key={item.key} value={item.key}>
							{item.value}
						</MenuItem>
					))}
				</TextField>
				<ListItemSecondaryAction>
					<IconButton
						color="primary"
						edge="end"
						onClick={handleClickAdd}>
						<AddBoxIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
			{users.map((user) => (
				<ListItem button className={classes.nested} key={user.key}>
					<ListItemIcon>{user.icon()}</ListItemIcon>
					<TextField
						size="small"
						className={classes.assignee}
						value={user.value}
					/>
					<ListItemSecondaryAction>
						<IconButton
							color="secondary"
							edge="end"
							onClick={() => handleClickDelete(user.key)}>
							<RemoveCircleIcon />
						</IconButton>
					</ListItemSecondaryAction>
				</ListItem>
			))}
		</List>
	)
}
type Props = { key: number; category: string }
export const CategoryListItem = ({ key, category }: Props) => {
	const [open, setOpen] = React.useState(false)
	const handleClickDetail = () => setOpen(!open)
	return (
		<>
			<ListItem button onClick={handleClickDetail} key={key}>
				<ListItemIcon>
					<CategoryIcon />
				</ListItemIcon>
				<ListItemText primary={category} />
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={open} timeout="auto">
				<AssigneeList />
			</Collapse>
		</>
	)
}
export const CategoryList = () => {
	const classes = useStyles()
	return (
		<List
			component="nav"
			subheader={
				<ListSubheader component="div" id="nested-list-subheader">
					Assignee List by category
				</ListSubheader>
			}
			className={classes.root}>
			{categories.map((category, index) => (
				<>
					<CategoryListItem key={index} category={category.value} />
					<Divider />
				</>
			))}
		</List>
	)
}

const Demo: React.FC = () => {
	return <CategoryList />
}
ReactDOM.render(<Demo />, document.querySelector('#app'))
