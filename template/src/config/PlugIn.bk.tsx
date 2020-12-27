// import * as React from 'react'
// import ReactDOM from 'react-dom'
// import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
// /**Components */
// import Typography from '@material-ui/core/Typography'
// import { SelectBox } from './components/SelectBox'
// import { BasicTextField } from './components/TextField'
// import { DatePicker } from './components/DatePicker'
// import { SwitchList } from './components/SwitchList'
// import { SaveButton, CancelButton } from './components/Buttons'

// /**API */
// import { getApps, getFields, getDepartments, getConfig } from './kintoneAPI'
// /**Types */
// import { RespApp, RespField, RespDepartment } from './kintoneAPI'

// /**kintoneのテーマカラーに調整 */
// const theme = createMuiTheme({
// 	palette: {
// 		primary: {
// 			main: '#3498db',
// 		},
// 		secondary: {
// 			main: '#fff',
// 			contrastText: '#3498db',
// 		},
// 	},
// })
// const useStyles = makeStyles((theme) => ({
// 	root: {
// 		margin: theme.spacing(1),
// 		width: '25ch',
// 	},
// 	required: {
// 		color: 'red',
// 	},
// }))

// /** Reducer | setConfigがメンドいので簡素な形でもつ */
// export type StateKeys = keyof State
// export type State = {
// 	[key: string]: string | string[]
// 	app: string
// 	single_line_text: string
// 	date_field: string
// 	period: string
// 	date: string
// 	department: string[]
// 	token: string
// }
// type Action = { type: StateKeys; payload: string | string[] }

// const reducer = (state: State, action: Action) => {
// 	return {
// 		...state,
// 		[action.type]: action.payload,
// 	}
// }

// /** Context: kintone-API-Response */
// export type KintoneContextType = {
// 	apps: RespApp[]
// 	fields: RespField[]
// 	departments: RespDepartment[]
// }
// export const KintoneContext = React.createContext({} as KintoneContextType)

// /** Context: App */
// export type AppContextType = {
// 	state: State
// 	dispatch: React.Dispatch<Action>
// }
// export const AppContext = React.createContext({} as AppContextType)

// /** Initial Values */
// const initApp = { appId: '', name: '' }
// const initField = { label: '', code: '', type: '' }
// const initDepartment = { key: '', name: '', checked: false }
// const initKintone = { apps: [initApp], fields: [initField], departments: [initDepartment] }
// const initState = {
// 	app: '',
// 	single_line_text: '',
// 	date_field: '',
// 	period: '',
// 	date: '2020-12-24',
// 	department: [],
// 	token: '',
// }

// /** Validation */
// export const ValidateNumber = (value: number) => {
// 	return isFinite(value) ? false : true
// }
// /**
//  * App-Component | React.FC & HooksAPI Pattern
//  */
// export const PlugIn: React.FC = () => {
// 	const classes = useStyles()
// 	const [kintone, setKintone] = React.useState(initKintone)
// 	const [state, dispatch] = React.useReducer(reducer, initState)

// 	/**API-Request */
// 	React.useEffect(() => {
// 		const fetchData = async () => {
// 			const kintoneApiResp = {
// 				apps: await getApps(),
// 				fields: await getFields(),
// 				departments: await getDepartments(),
// 			}
// 			setKintone(kintoneApiResp)
// 		}
// 		const config = getConfig()
// 		// console.log(config)
// 		for (const key of Object.keys(config)) {
// 			dispatch({ type: key, payload: config[key] })
// 		}
// 		fetchData()
// 	}, [])

// 	return (
// 		<ThemeProvider theme={theme}>
// 			<KintoneContext.Provider value={kintone}>
// 				<AppContext.Provider value={{ state, dispatch }}>
// 					<Typography variant="body1" gutterBottom>
// 						アプリを選択
// 						<span className={classes.required}>*</span>
// 					</Typography>
// 					<SelectBox apiType="APP" name="app" />

// 					<Typography variant="body1" gutterBottom>
// 						フィールドを選択【文字列1行】
// 						<span className={classes.required}>* </span>
// 					</Typography>
// 					<SelectBox apiType="FIELD" name="single_line_text" fieldType="SINGLE_LINE_TEXT" />

// 					<Typography variant="body1" gutterBottom>
// 						フィールドを選択【日付】
// 						<span className={classes.required}>* </span>
// 					</Typography>
// 					<SelectBox apiType="FIELD" name="date_field" fieldType="DATE" />

// 					<Typography variant="body1" gutterBottom>
// 						期を入力
// 						<span className={classes.required}>* </span>
// 					</Typography>
// 					<BasicTextField name="period" validate={ValidateNumber} />

// 					<Typography variant="body1" gutterBottom>
// 						日付を選択
// 						<span className={classes.required}>* </span>
// 					</Typography>
// 					<DatePicker name="date" />

// 					<Typography variant="body1" gutterBottom>
// 						利用する部署
// 						<span className={classes.required}>* </span>
// 					</Typography>
// 					<SwitchList name="department" />

// 					<Typography variant="body1" gutterBottom>
// 						APIトークン
// 						<span className={classes.required}>* </span>
// 					</Typography>
// 					<BasicTextField name="token" />

// 					<div>
// 						<SaveButton name="保存" />
// 						<CancelButton name="キャンセル" />
// 					</div>
// 				</AppContext.Provider>
// 			</KintoneContext.Provider>
// 		</ThemeProvider>
// 	)
// }
// ReactDOM.render(<PlugIn />, document.querySelector('#app'))
