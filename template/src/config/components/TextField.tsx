import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
/**Context */
import { usePlugInContext } from '../PlugInProvider'
/**Componets */
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
/**Types */
import { StateKeys } from '../PlugInProvider'

/**
 * 【TIPS】
 *  同じコンポーネントで分岐処理を書くなら、別コンポーネントにする
 *  コードの重複<<<可読性、シンプルさを重視する
 */

/** Styles */
const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(1),
		width: '35ch',
	},
}))
/** Types: TextField */
type Props = { name: StateKeys }

/** TextField-With-NumberValidate */
export const NumberValidateTextField = ({ name }: Props) => {
	const classes = useStyles()
	const { state, dispatch } = usePlugInContext()
	const [isError, setIsError] = useState(false)

	/** Validation */
	const validateNumber = (value: number) => {
		return isFinite(value) ? false : true
	}
	const handleChangeValidation = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setIsError(validateNumber(parseInt(event.target.value)))
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
				value={state[name]}
				onChange={handleChangeValidation}
			/>
			{isError && (
				<Typography variant="body2" color="error" display="inline">
					数字を入力してください
				</Typography>
			)}
		</Grid>
	)
}

/**TextField-Without-Validate */
export const BasicTextField = ({ name }: Props) => {
	const classes = useStyles()
	const { state, dispatch } = usePlugInContext()
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
				value={state[name]}
				onChange={handleChange}
			/>
		</Grid>
	)
}
