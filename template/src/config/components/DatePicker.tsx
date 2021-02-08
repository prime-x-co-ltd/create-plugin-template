// import * as React from 'react'
// import { makeStyles } from '@material-ui/core/styles'
// import 'date-fns'
// import DateFnsUtils from '@date-io/date-fns'
// import {
// 	MuiPickersUtilsProvider,
// 	KeyboardDatePicker,
// } from '@material-ui/pickers'
// /**Context */
// import { usePlugInContext } from '../PlugInProvider'
// /**Types */
// import { StateKeys } from '../PlugInProvider'

// /** Styles */
// const useStyles = makeStyles((theme) => ({
// 	root: {
// 		margin: theme.spacing(1),
// 		width: '20ch',
// 	},
// }))
// /** Types: DatePicker */
// type Props = { name: StateKeys }
// /** DatePicker */
// export const DatePicker = ({ name }: Props) => {
// 	const classes = useStyles()
// 	const { state, dispatch } = usePlugInContext()
// 	const dateToString = (date: Date) => {
// 		const Y = date.getFullYear()
// 		const M = ('00' + (date.getMonth() + 1)).slice(-2)
// 		const D = ('00' + date.getDate()).slice(-2)
// 		return `${Y}-${M}-${D}`
// 	}
// 	const handleDateChange = (date: Date | null) => {
// 		if (date) {
// 			dispatch({ type: 'date', payload: dateToString(date) })
// 		}
// 	}
// 	return (
// 		<MuiPickersUtilsProvider utils={DateFnsUtils}>
// 			<KeyboardDatePicker
// 				id="date-picker-inline"
// 				className={classes.root}
// 				disableToolbar
// 				variant="inline"
// 				inputVariant="outlined"
// 				format="yyyy/MM/dd"
// 				margin="normal"
// 				size="small"
// 				autoOk={true}
// 				value={state[name]}
// 				onChange={handleDateChange}
// 			/>
// 		</MuiPickersUtilsProvider>
// 	)
// }
