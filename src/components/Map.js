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
					opacity: .9,
					color: '#222',
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
			weight: 0
		});
		
		const target = this.group.getLayers()[this.props.index];
		
		target.setStyle({
			weight: 5
		});
	}
	
	resetHighlight() {
		this.group.setStyle({
			weight: 0
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
		return (
			<div className='map'>
				<div className='map__figure' id='map' ref='map'></div>
			</div>
		);
	}
}