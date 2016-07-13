import L from 'leaflet';
import React, { Component } from 'react';

import 'leaflet/dist/leaflet.css';

export default class Map extends Component {
	constructor(props) {
		super(props);
		
		this.initial = true;
		
		this.state = {
			is_active: false
		};
	}
	
	enableMap() {
		this.setState({
			is_active: true
		});
		
		this.map.touchZoom.enable();
  	    this.map.dragging.enable();
  	    this.map.doubleClickZoom.enable();
  	    this.map.scrollWheelZoom.enable();
  	    this.map.keyboard.enable();
	}
	
	//Adjust to style points based on GeoJSON feature properties
	getPointColor(category) {
		let color;
	
		if (category === 1) {
			return '#e25151';
		} else {
			return '#00009c';
		}
		
		return color;
	}
	
	addPoints() {
		const self = this;
		
		let num = 0;
		
		this.group = L.geoJson(this.props.data, {
			pointToLayer: function(feature, latlng){
				return new L.CircleMarker(latlng, {
					fillColor: self.getPointColor(feature.properties.category),
					fillOpacity: .8,
					weight: 0,
					radius: 15
				});
			},
			
			onEachFeature: function(feature, layer){
				feature.properties.index = num;
				
				layer.on('click', function(e){
					self.pointClick(e);
				});
				
				num++;
			}
		}).addTo(this.map);
		
		this.map.fitBounds( this.group.getBounds() );
	}
	
	highlightPoint() {
		this.group.setStyle({
			fillOpacity: .3
		});
		
		const target = this.group.getLayers()[this.props.index];
		
		target.setStyle({
			fillOpacity: .8
		});
	}
	
	resetHighlight() {
		this.group.setStyle({
			fillOpacity: .8
		});
	}
	
	mapClick() {
		this.props.updateStateFromChild('index', null);
	}
	
	pointClick(e) {
		const target = e.target;
		
		this.props.updateStateFromChild('index', target.feature.properties.index);
		
		target.bringToFront();
	}
	
	componentDidUpdate(prev_props, prev_state) {
		if (this.initial) {
			this.initial = false;
			
		} else {
			if (this.props.index === null) {
				this.resetHighlight();
				
			} else {
				this.highlightPoint();
			}
		}
	}
	
	componentDidMount() {
		const self = this;
        
        const map = this.map = L.map(this.refs.map, {
            zoomControl: false,
            dragging: false,
            touchZoom: false,
            doubleClickZoom: false,
            scrollWheelZoom: false,
            keyboard: false,
            tap: false
        });
        
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);
        
        this.map.on('click', function(e){
        	self.mapClick();
        });
        
        this.addPoints();
	}
	
	render() {
		const overlay_styles = this.state.is_active ? 'map__overlay--hidden' : 'map__overlay--visible';
	
		return (
			<div className='map'>
				<div className={overlay_styles}>
					<button className='map__view' onClick={this.enableMap.bind(this)}>View map</button>
				</div>

				<div className='map__figure' id='map' ref='map'></div>
			</div>
		);
	}
}