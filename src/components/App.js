import React, { Component } from 'react';

import Map from './Map';
import List from './List';

import '../scss/app.scss';

export default class App extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			data: require('../json/data.json'),
			index: null
		};
	}
	
	updateStateFromChild(key, val) {
		this.setState({
			[key]: val
		});
	}
	
	render() {
		return (
			<main className='main'>
				<div className='map-list'>
					<Map
						data={this.state.data}
						index={this.state.index}
						updateStateFromChild={this.updateStateFromChild.bind(this)}
					/>
					
					<List
						data={this.state.data}
						index={this.state.index}
						updateStateFromChild={this.updateStateFromChild.bind(this)}
					/>
				</div>
			</main>
		);
	}
}