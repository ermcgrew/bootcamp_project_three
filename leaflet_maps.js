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
    //transform plant data so origin locations match endings with UN db
    //include exception for any weird origin names
    let test_origin = 'Eastern Africa';

    //load country to region csv OR import from database as json
    // const response1 = await fetch("UNSD_country_to_regions.csv"); 
    // const data1 = await response1.json();

    let test_json = [{country: "Kenya", 
                    intermediateRegion: 'Eastern Africa', 
                    subregion: "Sub-Saharan Africa", 
                    region: "Africa"},
                    {country: "Zimbabwe", 
                    intermediateRegion: 'Eastern Africa', 
                    subregion: "Sub-Saharan Africa", 
                    region: "Africa"}];
    

    //declare array to hold list of origin countries
    let country_list = [];

    //loop through region list for match
    for (let j = 0; j < test_json.length; j++) {
        let current_country = test_json[j];
        if (current_country.region === test_origin || current_country.subregion === test_origin || current_country.intermediateRegion === test_origin) {
            country_list.push(current_country.country);
        };
    };

    
    //declare empty geojson layer
    let geojsonLayer = L.geoJSON();

    //declare border style parameters
    let myStyle = {
        color: "black", 
        fillOpacity: 0
    };

    //match plant origin country with geojson country
    for (let index = 0; index < country_list.length; index++) {
        let current_plant = country_list[index];
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
