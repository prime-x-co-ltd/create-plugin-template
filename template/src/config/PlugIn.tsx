/**
 * 3rd-Layer | PlugIn.tsx | React-Componentトップレイヤー
 */

import * as React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

/**Context&Reducer */
import { usePlugInContext } from './PlugInProvider'
/**Components */
// import { InputForm } from './components/InputForm'
// import { BasicTextField, NumberValidateTextField } from './components/TextField'
// import { DatePicker } from './components/DatePicker'
// import { SelectBox } from './components/SelectBox'
// import { SwitchList } from './components/SwitchList'
// import { ButtonForm } from './components/ButtonForm'
/**Types */
import { State } from './PlugInProvider'

/**kintoneのテーマカラーに調整 */
const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#3498db',
		},
		secondary: {
			main: '#fff',
			contrastText: '#3498db',
		},
	},
})
type Props = { config: State }
export const PlugIn: React.FC<Props> = ({ config }) => {
	const { dispatch } = usePlugInContext()
	React.useEffect(() => {
		for (const key of Object.keys(config)) {
			dispatch({ type: key, payload: config[key] })
		}
	}, [config, dispatch])

	return (
		<ThemeProvider theme={theme}>
			{/* <InputForm title="アプリを選択" required>
				<SelectBox name="app" apiType="APP" />
			</InputForm>
			<InputForm title="フィールドを選択【文字列】" required>
				<SelectBox
					name="single_line_text"
					apiType="FIELD"
					fieldType="SINGLE_LINE_TEXT"
				/>
			</InputForm>
			<InputForm title="期を入力" required>
				<NumberValidateTextField name="period" />
			</InputForm>
			<InputForm title="フィールドを選択【日付】" required>
				<SelectBox name="date_field" apiType="FIELD" fieldType="DATE" />
			</InputForm>
			<InputForm title="日付を選択" required>
				<DatePicker name="date" />
			</InputForm>
			<InputForm title="利用する部署" required>
				<SwitchList name="department" />
			</InputForm>
			<InputForm title="APIトークン">
				<BasicTextField name="token" />
			</InputForm>
			<ButtonForm /> */}
		</ThemeProvider>
	)
}
