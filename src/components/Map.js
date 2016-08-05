import L from 'leaflet';
import React, { Component } from 'react';

import 'leaflet/dist/leaflet.css';

export default class Map extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			can_move: false
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
	
	toggleMapMove() {
		this.setState({
			can_move: !this.state.can_move
		});
	}
	
	disableMapMove() {
		this.map.touchZoom.disable();
		this.map.dragging.disable();
		this.map.doubleClickZoom.disable();
		this.map.scrollWheelZoom.disable();
		this.map.keyboard.disable();
	}
	
	enableMapMove() {
		this.map.touchZoom.enable();
		this.map.dragging.enable();
		this.map.doubleClickZoom.enable();
		this.map.scrollWheelZoom.enable();
		this.map.keyboard.enable();
	}
	
	focusOnPoint() {
		const target = this.group.getLayers()[this.props.index];
		
		this.map.setView( target.getLatLng(), 15);
	}
	
	resetHighlight() {
		this.group.setStyle({
			weight: 0
		});
	}
	
	mapClick() {
		this.props.updateStatesFromChild({
			index: null,
			focus_on_point: false
		});
	}
	
	pointClick(e) {
		const target = e.target;
		
		this.props.updateStatesFromChild({
			index: target.feature.properties.index,
			focus_on_point: false
		});
		
		target.bringToFront();
	}
	
	componentDidUpdate(prev_props, prev_state) {
		if (this.state.can_move) {
			this.enableMapMove();
		
		} else {
			this.disableMapMove();
		}
		
		if (this.props.index === null) {
			this.resetHighlight();
		
		} else {
			if (this.props.focus_on_point) {
				this.focusOnPoint();
			}
			
			this.highlightPoint();
		}
	}
	
	componentDidMount() {
		const self = this;
		
		const bounds = L.latLngBounds(
			L.latLng(22.316684, -88.057872),
			L.latLng(31.990344, -75.291167)
		);
        
        const map = this.map = L.map(this.refs.map, {
            zoomControl: false,
            dragging: false,
            touchZoom: false,
            doubleClickZoom: false,
            scrollWheelZoom: false,
            keyboard: false,
            tap: false,
            zoomAnimation: true,
            animate: true,
			zoomAnimationThreshold: 9909,
			maxBounds: bounds,
			minZoom: 6,
			attributionControl: false
        });
        
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);
		
		L.control.attribution({
        	position: 'topleft'
        }).addTo(this.map);
        
        this.map.on('click', function(e){
        	self.mapClick();
        });
        
        this.addPoints();
	}
	
	render() {
		const button_text = this.state.can_move ? 'Disable pan/zoom' : 'Enable pan/zoom';
	
		return (
			<div className='map'>
				<button className='map__pan-zoom' onClick={this.toggleMapMove.bind(this)}>{button_text}</button>
				<div className='map__figure' id='map' ref='map'></div>
			</div>
		);
	}
}