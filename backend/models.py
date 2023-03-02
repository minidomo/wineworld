from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://doadmin:AVNS_8jlXLzIcnV636IAs9-r@wineworld-db-mysql-do-user-13620893-0.b.db.ondigitalocean.com:25060/defaultdb'
db = SQLAlchemy(app)
app.app_context().push()

class Wine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    country = db.Column(db.String(100))
    region = db.Column(db.String(100))
    winery = db.Column(db.String(100))
    rating = db.Column(db.Float)
    reviews = db.Column(db.Integer)
    type = db.Column(db.String(100))
    image = db.Column(db.String(100))
    vineyard_id = db.Column(db.Integer, db.ForeignKey('vineyard.id'))
    vineyards = db.relationship('Vineyard', backref='wines')
    region_id = db.Column(db.Integer, db.ForeignKey('region.id'))
    regions = db.relationship('Region', backref = 'wines')

class Vineyard(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    country = db.Column(db.String(100))
    price = db.Column(db.Integer)
    rating = db.Column(db.Float)
    reviews = db.Column(db.Integer)
    image = db.Column(db.String(100))
    region_id = db.Column(db.Integer, db.ForeignKey('region.id'))
    regions = db.relationship('Region', backref = 'vineyards')

class Region(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    country = db.Column(db.String(100))
    rating = db.Column(db.Float)
    reviews = db.Column(db.Integer)
    tags = db.Column(db.String(100))
    tripTypes = db.Column(db.String(100))
    vineyard_id = db.Column(db.Integer, db.ForeignKey('vineyard.id'))
    vineyards = db.relationship('Vineyard', backref='regions')