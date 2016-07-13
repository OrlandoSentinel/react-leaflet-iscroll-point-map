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
		if (this.props.index !== null) {
			this.scrollToItem(this.props.index);
		
		} else if (this.props.data !== prev_props.data) {
			this.scrollToBeginning();
			this.emptyDOMReferences();
			this.storeDOMReferences();
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
					updateStateFromChild={self.props.updateStateFromChild.bind(this)}
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
				options={{mouseWheel: true, scrollbars: true, scrollX: true, scrollY: false, wheelHorizontal: true, eventPassthrough: true, fadeScrollbars: true}}>
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
		this.props.updateStateFromChild('index', this.props.index);
	}
	
	render() {
		const item_style = this.props.highlighted ? 'list__item--highlighted' : 'list__item--normal';
		
		return (
			<div className={item_style}>
				<h3 className='list__title'>{this.props.name}</h3>
				<p className='list__description'>{this.props.description}</p>
				<a target='_blank' href={this.props.link} className='list__link'>Maybe you want a link</a>
				<img src={this.props.image} className='list__image' />
			</div>
		);
	}
}