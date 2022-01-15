#Imports
from flask import Flask, jsonify, render_template


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
@app.route("/by_plant")
def by_plant():
    return render_template('by_plant.html')


if __name__ == "__main__":
    app.run(debug=True)