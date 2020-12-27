/**
 * InputForm.tsx
 * OK/Cancelボタン
 */
import * as React from 'react'
/**Components */
import Grid from '@material-ui/core/Grid'
import { SaveButton, CancelButton } from './Buttons'

export const ButtonForm: React.FC = () => {
	return (
		<Grid container alignItems="center">
			<SaveButton name="保存" />
			<CancelButton name="キャンセル" />
		</Grid>
	)
}
