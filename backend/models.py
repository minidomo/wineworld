from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://doadmin:AVNS_8jlXLzIcnV636IAs9-r@wineworld-db-mysql-do-user-13620893-0.b.db.ondigitalocean.com:25060/defaultdb'
db = SQLAlchemy(app)
app.app_context().push()

region_tag = db.Table('region_tags',
                    db.Column('region_id', db.Integer, db.ForeignKey('Regions.id'), primary_key = True),
                    db.Column('tag_id', db.Integer, db.ForeignKey('Tags.id'), primary_key = True)
                    )
region_tripType = db.Table('region_tripTypes',
                    db.Column('region_id', db.Integer, db.ForeignKey('Regions.id'), primary_key = True),
                    db.Column('tripType_id', db.Integer, db.ForeignKey('TripTypes.id'), primary_key = True)
                    )
wine_redditPost = db.Table('wine_redditPosts',
                    db.Column('wine_id', db.Integer, db.ForeignKey('Wines.id'), primary_key = True),
                    db.Column('redditPost_id', db.Integer, db.ForeignKey('RedditPosts.id'), primary_key = True)
                    )

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
    redditPosts = db.relationship('RedditPost', secondary=wine_redditPost, backref='wines')

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
    longitude = db.Column(db.Float)
    latitude = db.Column(db.Float)

class Region(db.Model):
    __tablename__ = "Regions"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    country = db.Column(db.String(100))
    rating = db.Column(db.Float)
    reviews = db.Column(db.Integer)
    tags = db.relationship('Tag', secondary=region_tag, backref='regions')
    tripTypes = db.relationship('TripType', secondary=region_tripType, backref='regions')
    longitude = db.Column(db.Float)
    latitude = db.Column(db.Float)
    url = db.Column(db.String(150))
    image = db.Column(db.String(100))
    imageWidth = db.Column(db.Integer)
    imageHeight = db.Column(db.Integer)

class Tag(db.Model):
    __tablename__ = "Tags"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))

class TripType(db.Model):
    __tablename__ = "TripTypes"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))

class RedditPost(db.Model):
    __tablename__ = "RedditPosts"
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(100))