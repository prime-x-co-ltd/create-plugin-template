import * as React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
;((PLUGIN_ID) => {
	kintone.events.on('app.record.index.show', (event) => {
		const header = kintone.app.getHeaderSpaceElement()
		const json = kintone.plugin.app.getConfig(PLUGIN_ID)
		const config = JSON.parse(json.config)
		console.log(config)

		ReactDOM.render(<App />, header)
		return event
	})
})(kintone.$PLUGIN_ID)
