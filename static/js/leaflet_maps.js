
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
    //would need to have a route to connect to db 
    const data = await response.json();
    console.log(data)

    let panel_info = data.common_name

    //populate data panel--first remove old
    let oldMeta = document.querySelectorAll('#meta');
    for (let i=0;i<oldMeta.length;i++) {
        oldMeta[i].remove();
    };
    //load current plant info
    // panel_info.map(item => {
    //     let newP = document.createElement('p');
    //     newP.textContent = item;
    //     newP.id = "meta";
    //     document.querySelector('.panel-body').appendChild(newP);
    // });

    //load photo
    //target img tag


  

    //convert country string to array of country names to pass to originMap function
    let country_list = (data.origins).split(", ")
    originMap(country_list)
};



//function to load geojson and display countries of origin
async function originMap (country_list) { 
    //load geojson with all country shapes
    const response = await fetch("static/data/countries.geojson"); 
    const data = await response.json();

    //declare empty geojson layer
    let geojsonLayer = L.geoJSON();

    //declare border style parameters
    let myStyle = {
        color: "black", 
        fillOpacity: 0
    };

    //match origin country with geojson country
    for (let index = 0; index < country_list.length; index++) {
        let current_country = country_list[index];
        for(let i=0; i < data.features.length; i++) {
            if (current_country === data.features[i].properties.ADMIN) {
                //add country geojson to layer
                geojsonLayer.addData(data.features[i], {style: myStyle});      
            };
        }
    };

    // Create the map object
    let myMap = L.map("map", {
    center: [35.9375, 14.3754],
    zoom: 2,
    layers: [geojsonLayer] 
    });

    // Create background tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);    

};