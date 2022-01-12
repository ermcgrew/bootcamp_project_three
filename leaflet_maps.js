//heatmap or cloropleth map for homepage//of all plant origin locations






//for each plant page, highlight country/countries of origin


async function originMap () {
    // Create the map object
    let myMap = L.map("map", {
        center: [40.73, -74.0059], //************** */
        zoom: 5, 
    });

    // Create background tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);

    //*************************************************** */
    //need geojson with all country polygon shapes
    const response = await fetch("countries.geojson"); 
    const data = await response.json();

    console.log(data);
    let countries = data.features;

    for (let index = 0; index < countries.length; index++) {
        L.polygon(countries[index].geometry.coordinates, {
            color: "yellow", 
            weight: 4,
            fillColor: "yellow",
            fillOpacity: 0
            }
        ).addTo(myMap)
    };

    // data.features[1] //each country
    //     data.features[i].geometry.coordinates//polygon of country
    //     data.features[i].properties.ADMIN //country name

    //import plant origin data 
    // const response = await fetch(""); //from where?
    // const data = await response.json();
    //*************************************************** */
    //OR pass function the dictionary/data package?


    //*************************************************** */
    //transform data as needed to have country/countries of origin listed

    const plant = ['Bangladesh', 'Bhutan', 'India', 'Maldives', 'Nepal', 'Pakistan', 'Sri Lanka'];

    // // Loop through plant origin countries
    // for (let index = 0; index < plant.length; index++) {
        
    //     //match plant info with correct country
    //     if (plant[index] === countries[index].properties.ADMIN) {
    //         //*************************************************** */
    //         //add country polygon to map
    //         L.polygon(countries[index].geometry.coordinates, {
    //             color: "yellow", 
    //             weight: 4,
    //             fillColor: "yellow",
    //             fillOpacity: 0
    //         }).addTo(myMap);
    //     };
       
    // };

};

originMap();
