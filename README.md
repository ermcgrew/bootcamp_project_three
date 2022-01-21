# UPenn Data Science Bootcamp Group project 3

Group members: Jenny Shea, Kyle Conway, Jong Kim, Emily McGrew

Use our webapge to find the origin country of your houseplant and learn more about caring for it and other fun facts. 

The webpage runs off a flask app pulling data from a sqlite database. 

Fork this repo to run the app yourself!

Information sources: 
* Houseplant list and information: https://www.houseplantsexpert.com/a-z-list-of-house-plants.html
* Country geoJSON: https://datahub.io/core/geo-countries#javascript
* Country to region matchup: https://unstats.un.org/unsd/methodology/m49/overview/
* Etsy price information: https://etsy.com

In this repo:
* static folder
    * css
        * style.css
    * data
        * countries.geojson
        * countries.js
    * js
        * homepage.js
        * leaflet_maps.js
* templates
    * by_plant.html
    * index.html
* app.py
* houseplants.sqlite
* scrape_load.ipynb
* UNSD_country_to_regions.csv