/**
 * 2nd-Layer | PlugInProvider.tsx | Reducerによる状態管理レイヤー
 */
import * as React from 'react'

/** Reducer
 *  kintone-PlugInに関してはsetConfigがkey/valueしか受け付けないので
 *  簡素なデータ形式で状態管理する
 */
export type StateKeys = keyof State
export type State = {
	[key: string]: string | string[]
	app: string
	single_line_text: string
	date_field: string
	period: string
	date: string
	department: string[]
	token: string
}
type Action = { type: StateKeys; payload: string | string[] }

export const reducer = (state: State, action: Action) => {
	return {
		...state,
		[action.type]: action.payload,
	}
}
export type PlugInContextType = {
	state: State
	dispatch: React.Dispatch<Action>
}
const PlugInContext = React.createContext({} as PlugInContextType)

/**PlugInContext: Pass-to-lowerLayer*/
export const usePlugInContext = () => React.useContext(PlugInContext)

/**Initial-Values */
const initState = {
	app: '',
	single_line_text: '',
	date_field: '',
	period: '',
	date: '2020-12-24',
	department: [],
	token: '',
}

export const PlugInContextProvider: React.FC = ({ children }) => {
	const [state, dispatch] = React.useReducer(reducer, initState)
	return (
		<PlugInContext.Provider value={{ state, dispatch }}>
			{children}
		</PlugInContext.Provider>
	)
}
