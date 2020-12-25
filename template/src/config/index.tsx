import * as React from 'react'
import ReactDOM from 'react-dom'
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
/**Components */
import Typography from '@material-ui/core/Typography'
import { SelectBox } from './components/SelectBox'
import { BasicTextField } from './components/TextField'
import { DatePicker } from './components/DatePicker'
import { SwitchList } from './components/SwitchList'
import { SaveButton, CancelButton } from './components/Buttons'

/**API */
import { getApps, getFields, getConfig } from './kintoneAPI'
/**Types */
import { Utils } from './kintoneAPI'
import { RespApp, RespField } from './kintoneAPI'

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
const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(1),
		width: '25ch',
	},
	required: {
		color: 'red',
	},
}))

/** Reducer | setConfigがメンドいので簡素な形でもつ */
export type StateKeys = keyof State
export type State = {
	[key: string]: string | string[] | Date
	app: string
	single_line_text: string
	date_field: string
	period: string
	date: Date
	department: string[]
	token: string
}
type Action = { type: StateKeys; payload: string | string[] | Date }

const reducer = (state: State, action: Action) => {
	return {
		...state,
		[action.type]: action.payload,
	}
}

/** Context: kintone-API-Response */
export type KintoneContextType = {
	apps: RespApp[]
	fields: RespField[]
}
export const KintoneContext = React.createContext({} as KintoneContextType)

/** Context: App */
export type AppContextType = {
	state: State
	dispatch: React.Dispatch<Action>
}
export const AppContext = React.createContext({} as AppContextType)

/** Initial Values */
const initApp = { appId: '', name: '' }
const initField = { label: '', code: '', type: '' }
const initKintone = { apps: [initApp], fields: [initField] }
const initState = {
	app: '',
	single_line_text: '',
	date_field: '',
	period: '',
	date: new Date(),
	department: [],
	token: '',
}

/** Validation */
export const ValidateNumber = (value: number) => {
	return isFinite(value) ? false : true
}
/**
 * App-Component | React.FC & HooksAPI Pattern
 */
const App: React.FC = () => {
	const classes = useStyles()
	const [kintone, setKintone] = React.useState(initKintone)
	const [state, dispatch] = React.useReducer(reducer, initState)

	/**API-Request */
	React.useEffect(() => {
		const fetchData = async () => {
			const kintoneApiResp = {
				apps: await getApps(),
				fields: await getFields(),
			}
			setKintone(kintoneApiResp)
		}
		const config = getConfig()
		console.log(config)
		fetchData()
	}, [])

	return (
		<ThemeProvider theme={theme}>
			<KintoneContext.Provider value={kintone}>
				<AppContext.Provider value={{ state, dispatch }}>
					<Typography variant="subtitle2" gutterBottom>
						PLUGIN_ID: {Utils.PLUGIN_ID}
					</Typography>

					<Typography variant="body1" gutterBottom>
						アプリを選択
						<span className={classes.required}>*</span>
					</Typography>
					<SelectBox apiType="APP" name="app" />

					<Typography variant="body1" gutterBottom>
						フィールドを選択【文字列1行】
						<span className={classes.required}>* </span>
					</Typography>
					<SelectBox apiType="FIELD" name="single_line_text" fieldType="SINGLE_LINE_TEXT" />

					<Typography variant="body1" gutterBottom>
						フィールドを選択【日付】
						<span className={classes.required}>* </span>
					</Typography>
					<SelectBox apiType="FIELD" name="date_field" fieldType="DATE" />

					<Typography variant="body1" gutterBottom>
						期を入力
						<span className={classes.required}>* </span>
						{state.period}
					</Typography>
					<BasicTextField name="period" validate={ValidateNumber} />

					<Typography variant="body1" gutterBottom>
						日付を選択
						<span className={classes.required}>* </span>
					</Typography>
					<DatePicker />

					<Typography variant="body1" gutterBottom>
						利用する部署
						<span className={classes.required}>* </span>
					</Typography>
					<SwitchList />

					<Typography variant="body1" gutterBottom>
						APIトークン
						<span className={classes.required}>* </span>
					</Typography>
					<BasicTextField name="token" />

					<div>
						<SaveButton name="保存" />
						<CancelButton name="キャンセル" />
					</div>
				</AppContext.Provider>
			</KintoneContext.Provider>
		</ThemeProvider>
	)
}
ReactDOM.render(<App />, document.querySelector('#app'))
