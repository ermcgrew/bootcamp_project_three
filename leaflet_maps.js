//heatmap or cloropleth map for homepage//of all plant origin locations






//for each plant page, highlight country/countries of origin
async function originMap () {
    //load geojson with all country shapes
    const response = await fetch("countries.geojson"); 
    const data = await response.json();


    //*************************************************** */
    //import plant origin data OR pass function the dictionary/data package?
    // const plant_response = await fetch("");
    // const plant_data = await plant_response.json();    


    //*************************************************** */
    //transform data as needed to have country/countries of origin listed
    //include exception for any weird origin names
    //load country to region csv OR import from database as json
    // const response1 = await fetch("UNSD_country_to_regions.csv"); 
    // const data1 = await response1.json();



    //test array of countries
    const plant = ['Bangladesh', 'Bhutan', 'India', 'Maldives', 'Nepal', 'Pakistan', 'Sri Lanka'];

    //declare empty geojson layer
    let geojsonLayer = L.geoJSON();

    //declare border style parameters
    let myStyle = {
        color: "black", 
        fillOpacity: 0
    };

    //match plant origin country with geojson country
    for (let index = 0; index < plant.length; index++) {
        let current_plant = plant[index];
        for(let i=0; i < data.features.length; i++) {
            if (current_plant === data.features[i].properties.ADMIN) {
                //add country geojson to layer
                geojsonLayer.addData(data.features[i], {style: myStyle});      
            };
        }
    };

    // Create the map object
    let myMap = L.map("map", {
    center: [35.9375, 14.3754],
    zoom: 3,
    layers: [geojsonLayer] 
    });

    // Create background tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);    

};

originMap();
