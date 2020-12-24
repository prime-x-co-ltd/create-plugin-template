import React, { useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
/**Context */
import { AppContext } from '../index'
/**Componets */
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
/**Types */
import { StateKeys } from '../index'

/** Styles */
const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(1),
		width: '25ch',
	},
}))

type Props = {
	name: StateKeys
	// validateのパターン増えたらどうしよう。。
	validate?: (value: number) => boolean
}

export const BasicTextField = ({ name, validate }: Props) => {
	const classes = useStyles()
	const { dispatch } = useContext(AppContext)
	const [isError, setIsError] = useState(false)

	const handleChangeValidation = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (validate) setIsError(validate(parseInt(event.target.value)))
		dispatch({
			type: name,
			payload: event.target.value,
		})
	}

	return (
		<Grid container alignItems="center">
			<TextField
				autoComplete="off"
				className={classes.root}
				variant="outlined"
				size="small"
				error={isError}
				onChange={handleChangeValidation}
			/>
			{isError && (
				<Typography variant="body2" color="error" display="inline">
					数字です
				</Typography>
			)}
		</Grid>
	)
}
