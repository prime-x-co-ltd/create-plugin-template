/**
 * Architecture | There-Layer Model
 *  1st-Layer | index.tsx | kintoneAPIの処理＆管理レイヤー
 *  2nd-Layer | PlugInProvider.tsx | Reducerによる状態管理レイヤー
 *  3rd-Layer | PlugIn.tsx | React-Componentトップレイヤー
 */

/**1st-Layer */
import * as React from 'react'
import ReactDOM from 'react-dom'

/**Components */
import { PlugIn } from './PlugIn'
import { PlugInContextProvider } from './PlugInProvider'
/**API */
import { getApps, getFields, getDepartments, getConfig } from './kintoneAPI'
/**Types */
import { RespApp, RespField, RespDepartment } from './kintoneAPI'

/** Context: kintone-API */
export type KintoneContextType = {
	apps: RespApp[]
	fields: RespField[]
	departments: RespDepartment[]
}
export const KintoneContext = React.createContext({} as KintoneContextType)

/** KintoneContext: Pass-to-lowerLayer*/
export const useKintoneContext = () => React.useContext(KintoneContext)

/** Kintone-Top */
;(async (PLUGIN_ID) => {
	const kintoneResp = {
		apps: await getApps(),
		fields: await getFields(),
		departments: await getDepartments(),
	}
	const config = await getConfig(PLUGIN_ID)

	ReactDOM.render(
		<KintoneContext.Provider value={kintoneResp}>
			<PlugInContextProvider>
				<PlugIn config={config} />
			</PlugInContextProvider>
		</KintoneContext.Provider>,
		document.querySelector('#app')
	)
})(kintone.$PLUGIN_ID)
