
async function main() {
    //load plant name list from flask route that calls database
    let response = await fetch('/plant_list');
    let data = await response.json();

    //populate drop-down with sample ID names
    for (i=0; i<data.length; i++) {
        //set create methods as variables (have to do this inside the loop)
        const newOption = document.createElement('option');
        const attributeVal = document.createAttribute('value');
        
        //set display text and value to sample id name
        newOption.textContent = data[i];
        attributeVal.value = data[i];
        
        //add newOption
        document.querySelector("#selDataset").append(newOption);
        //add value attribute 
        newOption.setAttributeNode(attributeVal);
    }; 
    
    //initial page load with first item in list
    plantChange("Amaryllis");
};

//call main function for initial page load
main();

//function for loading new info for selected plant
async function plantChange(plant) {
    //load plant info from flask route that calls database
    const response = await fetch(`/${plant}`); 
    const data = await response.json();
   
    // create list of info for table
    let panel_info = [data.common_name, data.scientific_name, data.growth, data.temperatures, data.poisonous]

    //remove old plant info
    let oldInfo = document.querySelectorAll('#plantInfo');
    for (let i=0;i<oldInfo.length;i++) {
        oldInfo[i].textContent = '';
    };

    //load current plant info
    let counter = 0
    Array.from(document.querySelectorAll('td'))
        .forEach(td => {
            td.textContent = panel_info[counter]
            td.id = 'plantInfo'
            counter += 1    
    });

    //display photo
    document.querySelector('img').setAttribute('src', data.image_url)
    document.querySelector('figcaption').textContent = `Photo of ${data.common_name} from houseplantsexpert.com`

    //convert country string to array of country names to pass to originMap function
    let country_list = (data.origins).split(", ")
    
    originMap(country_list);
};


//function to load geojson and display countries of origin
async function originMap (country_list) { 
    //load geojson with all country shapes
    const response = await fetch("static/data/countries.geojson"); 
    const data = await response.json();

    //remove geojson data from previous plant
    geojsonLayer.clearLayers().closePopup();

    //reset zoom
    myMap.setView([35.9375, 14.3754], 2);

    //match origin country with geojson country
    for (let index = 0; index < country_list.length; index++) {
        let current_country = country_list[index];
        for(let i=0; i < data.features.length; i++) {
            if (current_country === data.features[i].properties.ADMIN) {
                //add country geojson to layer and to map
                geojsonLayer.addData(data.features[i]).addTo(myMap);      
            };
        }
    };

};

// Create the map object, tile layer, and geojson layer as global variables
let myMap = L.map("map", {
    center: [35.9375, 14.3754],
    zoom: 2
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);  

let geojsonLayer = L.geoJSON().bindPopup(function (layer) {
    return layer.feature.properties.ADMIN;
}).openPopup();