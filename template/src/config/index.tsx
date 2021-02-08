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

/**API Demo data */
const categories = [
	{ key: 'category_1', value: '広告／運用型広告（FG/TW/LINE/SN/Criteo）' },
	{ key: 'category_2', value: '広告／運用型広告（Y/G）' },
	{ key: 'category_3', value: '広告／予約型広告' },
	{ key: 'category_4', value: '広告／計測ツール・タグマネ' },
	{ key: 'category_5', value: '広告／アドクリエイティブ（LP含む）' },
	{ key: 'category_6', value: '広告／その他' },
]
const assignees = [
	{ key: 'suzuki', value: '鈴木　一郎' },
	{ key: 'yamada', value: '山田　花子' },
	{ key: 'bob', value: 'ボブサップ' },
]
const organizations = [
	{ key: 'account', value: 'アカウント部' },
	{ key: 'design', value: 'デザイン部' },
	{ key: 'marketing', value: 'マーケティング部' },
]
const groups = [
	{ key: 'mgrOrAbove', value: 'MGR以上' },
	{ key: 'directorOrAbove', value: '部長以上' },
	{ key: 'officerOrAbove', value: '役員以上' },
]

/** Context: kintone-API */
export type KintoneContextType = {
	categories: { key: string; value: string }[]
	assignees: { key: string; value: string }[]
	organizations: { key: string; value: string }[]
	groups: { key: string; value: string }[]
}
export const KintoneContext = React.createContext({} as KintoneContextType)

/** KintoneContext: Pass-to-lowerLayer*/
export const useKintoneContext = () => React.useContext(KintoneContext)

/** Kintone-Top */
;(async (PLUGIN_ID) => {
	const kintoneResp = {
		categories: categories,
		assignees: assignees,
		organizations: organizations,
		groups: groups,
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
