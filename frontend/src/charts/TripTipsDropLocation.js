import React, { useState, useEffect, useRef } from 'react';
import {getData} from '../utils';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoiY21wZTI4MS11YXYiLCJhIjoiY2w4Z2k0bmQ4MDBtcTQwbWtyc2o2MmEzNCJ9._iLFdHOPj9f8k5lekXN2HA';

function TripTipsDropLocation() {

  const [data, setData] = useState([]);
  const mapContainer = useRef(null);
	const map = useRef(null);
	const [lng, setLng] = useState(-87.49);
	const [lat, setLat] = useState(41.89);
	const [zoom, setZoom] = useState(8);

  useEffect(() => {
    if (data.length) {
      return;
    }
    async function fetchData() {
      const tripMonthsData = await getData('/api/trips/coords');
      // console.log(tripMonthsData);
      setData(tripMonthsData.data);
    }
    fetchData();
  });

  useEffect(() => {
  	if (data.length) {
  		let newD = data.slice(0, 1000);
  		for (let x = 0; x < newD.length; x++) {
  			const marker = new mapboxgl.Marker()
					.setLngLat([newD[x].dropoff_longitude, newD[x].dropoff_latitude])
					.addTo(map.current);
  		}
  	}
  }, [data])

  useEffect(() => {
  	if (map.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [lng, lat],
			zoom: zoom
		});
		// const marker = new mapboxgl.Marker()
		// 	.setLngLat([-70.9, 42.35])
		// 	.addTo(map.current);
  });

  useEffect(() => {
		if (!map.current) return; // wait for map to initialize
		map.current.on('move', () => {
			setLng(map.current.getCenter().lng.toFixed(4));
			setLat(map.current.getCenter().lat.toFixed(4));
			setZoom(map.current.getZoom().toFixed(2));
		});
	});

  return (
    <div className="TripTipsDropLocation">
      <h4>Trips tipped > 20% by drop off locations</h4>
      <div className="sidebar">
			Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
			</div>
			<div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default TripTipsDropLocation;