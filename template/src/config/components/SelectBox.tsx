/**
 * APIデータをオプション形式でローカルステートに保持する
 * Context経由で親ステートを更新する
 */

import React, { useCallback, useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
/**Components */
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
/**Context */
import { KintoneContext, AppContext } from '../index'
/**Types */
import { StateKeys } from '../index'
import { RespApp, RespField } from '../kintoneAPI'

/** Styles */
const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(1),
		width: '25ch',
	},
}))

/** API-Response-Type */
type RespType = RespApp | RespField

/** Option-Element-In-SelectBox - Allow-Braket-Notation */
export type Option = {
	[key: string]: string
	label: string
	value: string
}

/** Mapping */
const map = {
	field: new Map([
		['label', 'label'],
		['code', 'value'],
		['type', null],
	]),
	app: new Map([
		['appId', 'value'],
		['name', 'label'],
	]),
}

/** SelectBox */

type ApiType = 'APP' | 'FIELD'
type Props = {
	apiType: ApiType
	name: StateKeys
	fieldType?: string
}
/**
 * @param {ApiType} apiType API種別
 * @param {StateKeys} name 親ステートのプロパティ
 * @param {string} フィールド形式（任意）
 */
export const SelectBox = ({ apiType, name, fieldType }: Props) => {
	const classes = useStyles()
	const kintone = useContext(KintoneContext)
	const { state, dispatch } = useContext(AppContext)

	const [options, setOptions] = useState([{ label: '', value: '' }])

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({ type: name, payload: event.target.value })
	}

	/** APIレスポンス形式ごとのマップを返す/レスポンス形式が増えるたびに要更新 */
	interface MapSelector {
		(obj: RespType): {
			map: Map<string, string | null>
			respType: ApiType
		}
	}
	const mapSelector: MapSelector = (obj) => {
		if (obj !== null && typeof obj === 'object' && typeof obj.appId === 'string') {
			return { map: map.app, respType: 'APP' }
		} else {
			return { map: map.field, respType: 'FIELD' }
		}
	}
	/** 任意のフィールド形式を抽出する */
	interface TypeFilter {
		(data: RespType[], respType: ApiType): RespType[]
	}
	const typeFilter: TypeFilter = useCallback(
		(data, respType) => {
			if (respType !== 'FIELD' || !fieldType) return data
			return data.filter((field) => field.type === fieldType)
		},
		[fieldType]
	)

	interface Mapper {
		(data: RespType[]): Option[]
	}
	const mapper: Mapper = useCallback(
		(data) => {
			const { map, respType } = mapSelector(data[0])
			const _data = typeFilter(data, respType)

			return _data.map((field) => {
				const obj: Option = { label: '', value: '' }
				// 厳密な型推論ではないが、objのkeyがnullになる可能性はないのでstringとみなす
				Object.keys(field).forEach((key) => {
					if (map.get(key)) {
						obj[map.get(key) as string] = field[key]
					}
				})
				return obj
			})
		},
		[typeFilter]
	)
	/** Initialize */
	useEffect(() => {
		switch (apiType) {
			case 'APP':
				setOptions(mapper(kintone.apps))
				break
			case 'FIELD':
				setOptions(mapper(kintone.fields))
				break
		}
	}, [apiType, mapper, kintone])

	/** Render */
	return (
		<TextField
			select
			className={classes.root}
			id="select-outlined"
			variant="outlined"
			size="small"
			value={state[name]}
			onChange={handleChange}
			// helperText="Please select your app"
		>
			{options.map((option) => (
				<MenuItem key={option.value} value={option.value}>
					{option.label}
				</MenuItem>
			))}
		</TextField>
	)
}
