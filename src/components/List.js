import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import iScroll from 'iscroll';
import ReactIScroll from 'react-iscroll';

import { SLIDE_WIDTH, SLIDE_MARGIN } from '../constants';

export default class List extends Component {
	constructor(props) {
		super(props);
		
		this.list_items = [];
	}
	
	scrollToBeginning() {
        const self = this;
        
        this.refs.iScroll.withIScroll(function(iScroll){
            iScroll.scrollTo(0, 0);
        });
    }
	
	scrollToItem(index) {
		const self = this;
		
		this.refs.iScroll.withIScroll(function(iScroll){
			iScroll.scrollToElement( self.list_items[index], 1000 );
		});
	}
	
	componentDidUpdate(prev_props, prev_state) {
		if (this.props.index !== null && !this.props.focus_on_point) {
			this.scrollToItem(this.props.index);
		}
	}
	
	componentDidMount() {
		this.storeDOMReferences();
	}
	
	emptyDOMReferences() {
		this.list_items.length = 0;
	}
	
	storeDOMReferences() {
		const self = this;
		
		Object.keys(this.refs).map(function(key, i){
			self.list_items.push( ReactDOM.findDOMNode(self.refs[key]) );
		});
	}
	
	render() {
		const self = this;
		
		const items = this.props.data.features.map(function(item, i){
			const list_item =
				<ListItem
					updateStatesFromChild={self.props.updateStatesFromChild.bind(this)}
					
					//Switch these out with whatever information you want to appear in the info boxes
					name={item.properties.name}
					description={item.properties.description}
					link={item.properties.link}
					image={item.properties.image}
					
					index={i}
					key={i}
					ref={'item-' + i}
					highlighted={i === self.props.index}
				/>;
			
			return list_item;
		});
		
		return (
			<ReactIScroll
				iScroll={iScroll}
				className='list'
				ref='iScroll'
				options={{mouseWheel: false, scrollbars: true, fadeScrollbars: true, scrollX: true, scrollY: false, eventPassthrough: true}}>
				<div style={{ width: (SLIDE_WIDTH + SLIDE_MARGIN) * this.props.data.features.length + SLIDE_MARGIN + 'px' }}>
					<div className='list__items'>
						{items}
					</div>
				</div>
			</ReactIScroll>
		);
	}
}

class ListItem extends Component {
	constructor(props) {
		super(props);
	}
	
	viewOnMap(e) {
		this.props.updateStatesFromChild({
			index: this.props.index,
			focus_on_point: true
		});
	}
	
	render() {
		const item_style = this.props.highlighted ? 'list__item--highlighted' : 'list__item--normal';
		
		//Customize the info box
		return (
			<div className={item_style}>
				<h3 className='list__title'>{this.props.name}</h3>
				<div className='list__inner'>
					<p className='list__description'>{this.props.description}</p>
					<button className='list__button' onClick={this.viewOnMap.bind(this)}>View on map</button>
					<a target='_blank' href={this.props.link} className='list__link'>Maybe you want a link</a>
					<img className='list__image' src={require('../../assets/images/' + this.props.image)} />
				</div>
			</div>
		);
	}
}