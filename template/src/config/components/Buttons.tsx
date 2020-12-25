/**
 * 一旦結合度は無視。ボタンごとに関数を割り当てる
 */

import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
/**API */
import { saveConfig, saveCancel } from '../kintoneAPI'
import { AppContext } from '..'

/** Styles */
const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(1),
	},
}))

type Props = { name: string }
export const SaveButton = ({ name }: Props) => {
	const classes = useStyles()
	const { state } = useContext(AppContext)
	// event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	const handeClick = () => saveConfig(state)

	return (
		<>
			<Button variant="contained" color="primary" className={classes.root} onClick={handeClick}>
				{name}
			</Button>
		</>
	)
}
export const CancelButton = ({ name }: Props) => {
	const classes = useStyles()
	const handleClick = () => saveCancel()
	return (
		<>
			<Button variant="contained" color="secondary" className={classes.root} onClick={handleClick}>
				{name}
			</Button>
		</>
	)
}

// type Props = {
// 	name: string
// 	type: 'ok' | 'cancel'
// }

// export const NormalButton = ({ name, type }: Props) => {
// 	const classes = useStyles()
// 	if (type === 'ok') {
// 		return (
// 			<React.Fragment>
// 				<Button variant="contained" color="primary" className={classes.root}>
// 					{name}
// 				</Button>
// 			</React.Fragment>
// 		)
// 	} else {
// 		return (
// 			<Button variant="contained" color="secondary" className={classes.root}>
// 				{name}
// 			</Button>
// 		)
// 	}
// }
