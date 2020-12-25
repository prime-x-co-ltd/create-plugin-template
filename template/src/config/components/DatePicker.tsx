import React, { useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import { AppContext } from '..'
import { getDate } from 'date-fns'

/** Styles */
const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(1),
		width: '25ch',
	},
}))

const convYYYYMMDD = (date: Date) => {
	const Y = date.getFullYear()
	const M = ('00' + (date.getMonth() + 1)).slice(-2)
	const D = ('00' + date.getDate()).slice(-2)
	return `${Y}-${M}-${D}`
}

export const DatePicker = () => {
	const classes = useStyles()
	const { dispatch } = useContext(AppContext)
	// 外部ライブラリなのでローカルステート持たないとダメみたい
	const [selectedDate, setSelectedDate] = useState<Date | null>(new Date('2020-12-23'))
	const handleDateChange = (date: Date | null) => {
		setSelectedDate(date)
		if (date) {
			dispatch({ type: 'date', payload: convYYYYMMDD(date) })
		}
	}
	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<KeyboardDatePicker
				id="date-picker-inline"
				className={classes.root}
				disableToolbar
				variant="inline"
				inputVariant="outlined"
				format="yyyy/MM/dd"
				margin="normal"
				size="small"
				autoOk={true}
				value={selectedDate}
				onChange={handleDateChange}
			/>
		</MuiPickersUtilsProvider>
	)
}
