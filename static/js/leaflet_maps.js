
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

    // Create the map object
    let myMap = L.map("map", {
    center: [35.9375, 14.3754],
    zoom: 2 
    });

    // Create background tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);  
    
    //initial page load with first item in list
    plantChange("Amaryllis", myMap);
};

//call main function for initial page load
main();

//function for loading new info for selected plant
async function plantChange(plant, myMap) {
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
    
    
    //load geojson with all country shapes
    const response1 = await fetch("static/data/countries.geojson"); 
    const data1 = await response1.json();
    
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
        for(let i=0; i < data1.features.length; i++) {
            if (current_country === data1.features[i].properties.ADMIN) {
                //add country geojson to layer
                geojsonLayer.addData(data1.features[i], {style: myStyle}).addTo(myMap);      
            };
        }
    };

   
    


};



//function to load geojson and display countries of origin
// async function originMap (country_list) { 
    

//     //load geojson with all country shapes
//     const response = await fetch("static/data/countries.geojson"); 
//     const data = await response.json();

//     //declare empty geojson layer
//     let geojsonLayer = L.geoJSON();

//     //declare border style parameters
//     let myStyle = {
//         color: "black", 
//         fillOpacity: 0
//     };

//     //match origin country with geojson country
//     for (let index = 0; index < country_list.length; index++) {
//         let current_country = country_list[index];
//         for(let i=0; i < data.features.length; i++) {
//             if (current_country === data.features[i].properties.ADMIN) {
//                 //add country geojson to layer
//                 geojsonLayer.addData(data.features[i], {style: myStyle});      
//             };
//         }
//     };

//     // Create the map object
//     let myMap = L.map("map", {
//     center: [35.9375, 14.3754],
//     zoom: 2,
//     layers: [geojsonLayer] 
//     });

//     // Create background tile layer
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     }).addTo(myMap);    

// };