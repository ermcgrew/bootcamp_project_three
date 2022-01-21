
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


    //display the price details along with the plot
    var price_data = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: data.avg_price,
          number : {prefix: "<b>Avg. Price<br></b>",
                    font : {size : 14},
                    valueformat : "$,.2f",
                    suffix : "<br><b>Price Range</b> $" + data.min_price + "-$" + data.max_price
        
        },
        //   title: { text: "Avg Price Ranges"},
          type: "indicator",
          mode: "gauge+number",
          
        
          gauge: {
            axis: { range: [null, data.max_price*1.5],
                    tickmode:"auto",
                    nticks:"10",
                    tickformat: "$,.2f",
                    tickangle: "auto",
                    tickfont: {size: 10}
            },
            steps: [
              { range: [0, data.min_price], color: "white" },
              { range: [data.min_price, data.max_price], color: "#8FBC8F" }
            ],
            threshold: {
              line: { color: "green", width: 7 },
              thickness: 1,
              value: data.avg_price
            },
            bar: { color: "white", thickness : 0 },
            
            
          }
        }
      ];
      
      var layout = { width: 400, height: 300, margin: { t: 0, b: 0 } };
      Plotly.newPlot('plot', price_data, layout);


    //convert country string to array of country names to pass to originMap function
    let country_list = (data.origins).split(", ")
    
    originMap(country_list);
    
};


//function to load geojson and display countries of origin
async function originMap (country_list) { 
    //load geojson with all country shapes
    const response = await fetch("static/data/countries.geojson"); 
    const data = await response.json();

    //remove geojson data from previous plant and closes any open popups
    geojsonLayer.clearLayers().closePopup();

    //reset zoom
    myMap.setView([22.894, 14.025], 2);

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
    center: [22.894, 14.025],
    zoom: 2
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);  

let geojsonLayer = L.geoJSON().bindPopup(function (layer) {
    return layer.feature.properties.ADMIN;
}).openPopup();