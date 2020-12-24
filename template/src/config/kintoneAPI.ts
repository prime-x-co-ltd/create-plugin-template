/**kintone-Types */
import { Layout, App } from '@kintone/rest-api-client/lib/client/types'
import { State } from './index'

const appid = kintone.app.getId()

/**Utils | namespaceは非推奨です（使いたかっただけ） */
export namespace Utils {
	/**PlugIn-ID */
	export let PLUGIN_ID: string

	interface FieldSort {
		(layout: Layout, codes?: string[]): string[]
	}
	export const fieldSort: FieldSort = (layout, codes = []) => {
		layout.forEach((values) => {
			switch (values.type) {
				case 'ROW':
					values.fields.forEach((value) => {
						if (value.type !== 'SPACER' && value.type !== 'LABEL' && value.type !== 'HR')
							codes.push(value.code)
					})
					break
				case 'GROUP':
					Utils.fieldSort(values.layout, codes)
					break
				case 'SUBTABLE':
					values.fields.forEach((value) => codes.push(value.code))
					break
			}
		})
		return codes
	}
}

/** Response-Type: getApps/dammyGetApps - Allow-Braket-Notation */
export type RespApp = {
	[key: string]: string
	appId: string
	name: string
}
interface GetApps {
	(): Promise<RespApp[]>
}
interface InnerLoop {
	(offset?: number, _apps?: RespApp[]): Promise<RespApp[]>
}
export const getApps: GetApps = () => {
	return new Promise((resolve, reject) => {
		const innerLoop: InnerLoop = (offset = 0, _apps) => {
			return new Promise((resolve, reject) => {
				kintone
					.api(kintone.api.url('/k/v1/apps', true), 'GET', { offset: offset })
					.then((resp) => {
						let apps: RespApp[] = resp.apps.map((app: App) => {
							return {
								appId: app.appId,
								name: app.name,
							}
						})
						if (_apps) apps = [...apps, ..._apps]
						if (resp.apps.length === 100) {
							innerLoop(offset + 100, apps)
								.then((apps) => resolve(apps))
								.catch((err) => reject(err))
						} else {
							return resolve(apps)
						}
					})
					.catch((err) => reject(err))
			})
		}
		innerLoop()
			.then((resp) => resolve(resp))
			.catch((err) => reject(err))
	})
}

/** Response-Type: getFields/dammyGetFields - Allow-Braket-Notation */
export type RespField = {
	[key: string]: string
	label: string
	code: string
	type: string
}
interface GetFields {
	(): Promise<RespField[]>
}
export const getFields: GetFields = async () => {
	console.log(Utils.PLUGIN_ID)
	return kintone
		.api(kintone.api.url('/k/v1/app/form/layout', true), 'GET', {
			app: appid,
		})
		.then((resp) => {
			const sorted = Utils.fieldSort(resp.layout)
			return kintone
				.api(kintone.api.url('/k/v1/app/form/fields', true), 'GET', {
					app: appid,
				})
				.then((resp) => {
					const fields: RespField[] = []
					sorted.forEach((field) => {
						if (field in resp.properties) {
							fields.push({
								label: resp.properties[field].label,
								code: resp.properties[field].code,
								type: resp.properties[field].type,
							})
						}
					})
					return Promise.resolve(fields)
				})
				.catch((err) => Promise.reject(err))
		})
		.catch((err) => Promise.reject(err))
}
/**Save-Config */
export interface SaveConfig {
	(state: State): void
}
export const saveConfig: SaveConfig = (state) => {
	//いよいよProxyの出番と思われ。。
	console.log(state)
	const config = {
		name: 'Tom',
		age: '25',
	}
	kintone.plugin.app.setConfig(config)
	return
}

/**Load-PlugIn-ID */
;((PLUGIN_ID): void => {
	Utils.PLUGIN_ID = PLUGIN_ID
	return
})(kintone.$PLUGIN_ID)
