//heatmap or cloropleth map for homepage//of all plant origin locations






//for each plant page, highlight country/countries of origin

async function originMap () {
    //load geojson with all country shapes
    const response = await fetch("countries.geojson"); 
    const data = await response.json();

    //import plant origin data 
    // const response = await fetch(""); //from where?
    // const data = await response.json();
    //*************************************************** */
    //OR pass function the dictionary/data package?


    //*************************************************** */
    //transform data as needed to have country/countries of origin listed

    const plant = ['Bangladesh', 'Bhutan', 'India', 'Maldives', 'Nepal', 'Pakistan', 'Sri Lanka'];

    let geojsonLayer = L.geoJSON()

    let myStyle = {
        color: "black", 
        fillOpacity: 0
    };

    // Loop through plant origin countries
    for (let index = 0; index < plant.length; index++) {
        
        //match plant info with correct country
        //data.features[i].properties.ADMIN //country name
        if (plant[index] === data.features[index].properties.ADMIN) {
            //*************************************************** */
            //add country polygon to map
            geojsonLayer.addData(data.features[index], {style: myStyle});      
        };
    };

    // Create the map object
    let myMap = L.map("map", {
    center: [40.73, -74.0059], //************** */
    zoom: 5,
    layers: [geojsonLayer] 
    });

    // Create background tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);    

};

originMap();
