/**
 * InputForm.tsx
 * 要素にタイトルをつけて返す
 */
import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

/** Styles */
const useStyles = makeStyles(() => ({
	required: {
		color: 'red',
	},
}))

type Props = {
	children?: React.ReactChild
	title: string
	required?: boolean
}
export const InputForm: React.FC<Props> = ({ children, title, required }) => {
	const classes = useStyles()
	return (
		<>
			<Grid container alignItems="center">
				<Grid item>
					<ChevronRightIcon fontSize="small" color="primary" />
				</Grid>
				<Grid item>
					<Typography variant="body1" gutterBottom>
						{title}
						{required && (
							<span className={classes.required}>*</span>
						)}
					</Typography>
				</Grid>
			</Grid>
			<Grid>{children}</Grid>
		</>
	)
}
