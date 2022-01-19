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

	info.update = function (props) {
        
		this._div.innerHTML = '<h4>Native Plants:</h4>' +  (props ?
			'<b>' + props.ADMIN[0] + '</b><br />' + result : 'Hover over a Country');
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
			color: 'darkblue',
			dashArray: '',
			fillOpacity: 0.7
		});

		if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			layer.bringToFront();
		}

		info.update(layer.feature.properties);
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


 //load plant name list from flask route that calls database
 let response = await fetch('/plant_list');
 let data = await response.json(); 
 let country_list = (data.origins).split(", ")
 const result = data.filter(current_country)
 
 //match origin country with geojson country
 for (let index = 0; index < country_list.length; index++) {
     let current_country = country_list[index];
     for(let i=0; i < data.features.length; i++) {
         if (current_country === countries.features[i].properties.ADMIN) {
             return current_country      
         };
     }
 };      

}

main();
/*
async function SelectCountry() {

    const response = await fetch("static/data/countries.geojson"); 
    const data = await response.json();

    console.log(data);

    const borders = [];

    // Loop through data and create a marker for each crime
    for (let i = 0; i < data.length; i++) {
        let location = data[i].features;

        let border = L.marker([location.coordinates])
            .bindPopup("<h3> Country's Plants </h3>");

            // Add the marker to the bikeMarkers array.
            borders.push(border);
    }

    const origins = L.layerGroup(borders)


    L.geoJson(data).addTo(map)

    let style = {
        
        //fillColor: getColor(feature.properties.density),
        weight: 2,
        fillColor: 'blue',
        fillOpacity: 0
        };
    
    
    L.geoJson(data, {style: style}).addTo(map);


};
*/