from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://doadmin:AVNS_8jlXLzIcnV636IAs9-r@wineworld-db-mysql-do-user-13620893-0.b.db.ondigitalocean.com:25060/defaultdb'
db = SQLAlchemy(app)
app.app_context().push()

class Wine(db.Model):
    __tablename__ = "Wines"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    country = db.Column(db.String(100))
    region = db.Column(db.String(100))
    winery = db.Column(db.String(100))
    rating = db.Column(db.Float)
    reviews = db.Column(db.Integer)
    type = db.Column(db.String(100))
    image = db.Column(db.String(100))

class Vineyard(db.Model):
    __tablename__ = "Vineyards"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    country = db.Column(db.String(100))
    price = db.Column(db.Integer)
    rating = db.Column(db.Float)
    reviews = db.Column(db.Integer)
    image = db.Column(db.String(100))
    url = db.Column(db.String(100))
    longitdue = db.Column(db.Float)
    latitude = db.Column(db.Float)

class Region(db.Model):
    __tablename__ = "Regions"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    country = db.Column(db.String(100))
    rating = db.Column(db.Float)
    reviews = db.Column(db.Integer)
    longitdue = db.Column(db.Float)
    latitude = db.Column(db.Float)
    url = db.Column(db.String(100))
    image = db.Column(db.String(100))
    imageWidth = db.Column(db.Integer)
    imageHeight = db.Column(db.Integer)

class Tag(db.Model):
    __tablename__ = "Tags"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    region_id = db.Column(db.Integer, db.ForeignKey('Regions.id'))
    regions = db.relationship('Region', backref = 'tags')

class TripType(db.Model):
    __tablename__ = "TripTypes"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    region_id = db.Column(db.Integer, db.ForeignKey('Regions.id'))
    regions = db.relationship('Region', backref = 'tripTypes')

class RedditPost(db.Model):
    __tablename__ = "RedditPosts"
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(100))
    wine_id = db.Column(db.Integer, db.ForeignKey('Wines.id'))
    types = db.relationship('Wine', backref = 'redditPosts')