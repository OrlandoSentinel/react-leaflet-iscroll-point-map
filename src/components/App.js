import React, { Component } from 'react';

import Map from './Map';
import List from './List';

import '../scss/app.scss';

export default class App extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			data: require('../json/data.json'),
			index: null,
			focus_on_point: false
		};
	}
	
	updateStatesFromChild(obj) {
		this.setState(obj);
	}
	
	render() {
		return (
			<main className='main'>
				<div className='map-list'>
					<Map
						data={this.state.data}
						index={this.state.index}
						focus_on_point={this.state.focus_on_point}
						updateStatesFromChild={this.updateStatesFromChild.bind(this)}
					/>
					
					<List
						data={this.state.data}
						index={this.state.index}
						focus_on_point={this.state.focus_on_point}
						updateStatesFromChild={this.updateStatesFromChild.bind(this)}
					/>
				</div>
			</main>
		);
	}
}