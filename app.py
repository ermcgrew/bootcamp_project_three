#Imports
import json
from flask import Flask, jsonify, request, render_template

import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

#connect to database
engine = create_engine("sqlite:///countries.sqlite")

#reflect tables as classes and save references
Base = automap_base()
Base.prepare(engine, reflect=True)
Countries = Base.classes.countries 

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
@app.route("/<plant>", methods=['GET', 'POST'])
def by_plant(plant):
    
    # if request.method == 'GET':
        session = Session(engine)
        results = session.query(Countries.country).filter(Countries.country == plant).all()
        session.close()

        plant_to_load = list(np.ravel(results))

        return jsonify(plant_to_load)
    
    # # POST request
    # if request.method == 'POST':
    #     print(request.get_json())
    #     return 'Sucesss', 200

# #to populate dropdown
@app.route('/plant_list', methods=['GET', 'POST'])
def plant_list():
    # GET request
    # if request.method == 'GET':
        #query db for plant list
        session = Session(engine)
        results = session.query(Countries.country).all()
        session.close()

        #plant list as array
        total_plant_list = list(np.ravel(results))

        return jsonify(total_plant_list)  
        
    # # POST request
    # if request.method == 'POST':
    #     print(request.get_json())
    #     return 'Sucesss', 200


if __name__ == "__main__":
    app.run(debug=True)