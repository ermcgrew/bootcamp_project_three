#Imports
import json
from flask import Flask, jsonify, request, render_template

import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

#connect to database
engine = create_engine("sqlite:///houseplants.sqlite")

#reflect table as class and save reference
Base = automap_base()
Base.prepare(engine, reflect=True)
Houseplants = Base.classes.houseplants 

#Flask setup
app = Flask(__name__)


#####Flask routes
#Root route
@app.route("/") 
def index():
    return render_template('index.html')

#plant page
@app.route("/search_by_plant")
def search():
    return render_template('by_plant.html')

#individual plant
@app.route("/<plant>")
def by_plant(plant):
    session = Session(engine)
    results = session.query(Houseplants).filter(Houseplants.common_name == plant).first()
    session.close()

    #Convert the query results to a dictionary
    dict = {}
    # dict["id"] = results.id
    dict["common_name"] = results.common_name
    dict["scientific_name"] = results.scientific_name
    dict["growth"] = results.max_growth
    dict["poisonous"] = results.poisonous
    dict["image_url"] = results.photo_url
    dict["temperatures"] = results.temperature
    dict["origins"] = results.origin_countries

    return jsonify(dict)

#to populate dropdown
@app.route('/plant_list')
def plant_list():
    session = Session(engine)
    results = session.query(Houseplants.common_name).all()
    session.close()

    #plant list as array
    total_plant_list = list(np.ravel(results))

    return jsonify(total_plant_list)  


if __name__ == "__main__":
    app.run(debug=True)