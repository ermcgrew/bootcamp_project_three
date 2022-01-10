//leaflet maps

//heatmap or cloropleth map for homepage 
//of all plant origin locations




//for each plant page, highlight country/countries of origin

//need geojson with all country polygon shapes


    //match plant info with correct country

    //add country to array

// Create a layer group from array
let originLayer = L.layerGroup(originArray);

// Create background tile layer
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});


// Create a baseMaps object to hold the streetmap layer.
var baseMaps = {
    "Street": street
    };
  
    // Create an overlayMaps object to hold the bikeStations layer.
    var overlayMaps = {
      "Bike Stations": stationLayer
    };
  
    // Create the map object with options. with these coordinates [40.73, -74.0059]
    let myMap = L.map("map-id", {
    center: [40.73, -74.0059], //
    zoom: 11, //
    layers: [street, stationLayer] //
    });
  
    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps).addTo(myMap);