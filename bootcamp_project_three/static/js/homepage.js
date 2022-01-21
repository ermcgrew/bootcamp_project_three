async function main(){
    
    //create map
    const map = L.map("map", {
        center: [40, -99],
        zoom: 4,
     });
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // control that shows plant info on hover
	var info = L.control();

	info.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info');
		this.update();
		return this._div;
	};

	info.update = function (feat) {
		this._div.innerHTML = '<h4>Native Plants:</h4>' +  (feat ?
			'<b>' + feat.properties.ADMIN + '</b><br />' + feat.plants : 'Hover over a state');
	};

	info.addTo(map);

	function style(feature) {
		return {
			stroke: true,
            weight: 0,
			opacity: 0,
			color: 'clear',
			dashArray: '3',
			fillOpacity: 0,
		};
	}
    function highlightFeature(e) {
		var layer = e.target;

		layer.setStyle({
			weight: 5,
			color: 'lightgreen',
			dashArray: '',
			fillOpacity: 0.7
		});

		if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			layer.bringToFront();
		}

		info.update(layer.feature);
	}
    var geojson;

	function resetHighlight(e) {
		geojson.resetStyle(e.target);
		info.update();
	}

	function zoomToFeature(e) {
		map.fitBounds(e.target.getBounds());
	}

	function onEachFeature(feature, layer) {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight,
			click: zoomToFeature
		});
	}


    geojson = L.geoJson(countries, {
		style: style,
		onEachFeature: onEachFeature
	}).addTo(map);


}

main();
