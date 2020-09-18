
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
const App = require('./app.jsx').default;
import {grey, amber, red} from 'material-ui/colors'
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {darkBaseTheme} from 'material-ui';
const muiTheme = createMuiTheme(darkBaseTheme);

ReactDOM.hydrate((

		<BrowserRouter>
			<MuiThemeProvider theme={muiTheme}>
				<App />
			</MuiThemeProvider>
		</BrowserRouter>

), document.getElementById('root'));
