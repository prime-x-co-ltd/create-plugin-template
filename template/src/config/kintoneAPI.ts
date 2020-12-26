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

/** Get-Apps */

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

/** Get-Fields */

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

/** Get-Departments */

export type RespDepartment = {
	key: string
	name: string
	checked: boolean
}
interface GetDepartments {
	(): Promise<RespDepartment[]>
}
export const getDepartments: GetDepartments = async () => {
	return Promise.resolve([
		{ key: 'ac', name: '経理', checked: false },
		{ key: 'hr', name: '人事', checked: false },
		{ key: 'bp', name: '事業推進部', checked: false },
		{ key: 'ap', name: 'アカウント部', checked: false },
	])
}

/** Save-Config */
export interface SaveConfig {
	(state: State): void
}
export const saveConfig: SaveConfig = (state) => {
	// configはkey:valueじゃないとダメ
	const config = JSON.stringify(state)
	console.log('Bytes:', new Blob([config]).size)
	kintone.plugin.app.setConfig({ config: config })
	return
}

/** Save-Cancel*/
interface SaveCancel {
	(): void
}
export const saveCancel: SaveCancel = () => history.back()

/** Get-Config */
interface GetConfig {
	(): State
}
export const getConfig: GetConfig = () => {
	const config = kintone.plugin.app.getConfig(Utils.PLUGIN_ID)
	return JSON.parse(config.config)
}

/** Load-PlugIn-ID */
;((PLUGIN_ID): void => {
	Utils.PLUGIN_ID = PLUGIN_ID
	return
})(kintone.$PLUGIN_ID)
