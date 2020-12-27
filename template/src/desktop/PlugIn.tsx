import * as React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { MyButton } from './components/ShowDialog'

/** Kintone-Theme-Color */
const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#3498db',
		},
		secondary: {
			main: '#fff',
			contrastText: '#3498db',
		},
	},
})

export const PlugIn: React.FC = () => {
	return (
		<ThemeProvider theme={theme}>
			<MyButton />
		</ThemeProvider>
	)
}
