/**
 * 2nd-Layer | PlugInProvider.tsx | Reducerによる状態管理レイヤー
 */
import * as React from 'react'

/** Reducer
 *  kintone-PlugInに関してはsetConfigがkey/valueしか受け付けないので
 *  簡素なデータ形式で状態管理する
 */

export type State = { [key: string]: string }
export type Action = { type: string; payload: string }
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
const initState = {}

export const PlugInContextProvider: React.FC = ({ children }) => {
	const [state, dispatch] = React.useReducer(reducer, initState)
	return (
		<PlugInContext.Provider value={{ state, dispatch }}>
			{children}
		</PlugInContext.Provider>
	)
}
