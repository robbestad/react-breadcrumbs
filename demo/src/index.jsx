// Import External Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// Import Components
import App from './app.jsx';
import CrumbRoute from './crumb-route.jsx';

// Define element and render method
let element = document.getElementById('app'),
	render = Root => {
		ReactDOM.render((
			<BrowserRouter>
				<CrumbRoute title="Home" path="/" component={ Root } />
			</BrowserRouter>
		), element);
	}

// Initial render
render(App)

// Subsequent HMR renders
if ( module.hot ) {
	module.hot.accept('./app.jsx', () => {
		render(App)
	})
}