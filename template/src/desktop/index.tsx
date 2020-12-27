import * as React from 'react'
import ReactDOM from 'react-dom'
import { PlugIn } from './PlugIn'
/**Types */
import { State } from '../config/PlugInProvider'

export type PlugInContextType = {
	config: State
}
export const PlugInContext = React.createContext({} as PlugInContextType)

/**Kintone-Events */
;((PLUGIN_ID) => {
	kintone.events.on('app.record.index.show', (event) => {
		const json = kintone.plugin.app.getConfig(PLUGIN_ID)
		const config: State = JSON.parse(json.config)
		console.log(config)

		ReactDOM.render(
			<PlugInContext.Provider value={{ config }}>
				<PlugIn />,
			</PlugInContext.Provider>,
			kintone.app.getHeaderSpaceElement()
		)
		return event
	})
})(kintone.$PLUGIN_ID)
