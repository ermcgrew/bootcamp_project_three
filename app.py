#Imports
from flask import Flask, jsonify, render_template

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
def by_plant():
    #call to database, pass returned json to html

    
    return render_template('by_plant.html')

#to populate dropdown
@app.route("/plant_list")
def plant_list():
    #connect to db, query, and close connection
    session = Session(engine)
    results = session.query(Countries.country).all()
    session.close()

    total_plant_list = list(np.ravel(results))
    return jsonify(total_plant_list)


if __name__ == "__main__":
    app.run(debug=True)