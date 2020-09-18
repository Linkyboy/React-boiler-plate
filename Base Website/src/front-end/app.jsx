
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Helmet from "react-helmet";
import Index from './views/Index.jsx';

export default class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Helmet
					htmlAttributes={{lang: "fr", amp: undefined}}
					titleTemplate="%s"
					titleAttributes={{itemprop: "name", lang: "fr"}}
					meta={[
						{name: "description", content: "Server side rendering example"},
						{name: "viewport", content: "width=device-width, initial-scale=1"}
					]}
				/>
				<Switch>
					<Route exact path="hgh " component={Index} />
					<Route exact path="/index" component={Index} />
				</Switch>
			</div>
		);
	}
}
