from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy import JSON, Column, String, Integer, Float


app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = (
    "mysql://doadmin:AVNS_8jlXLzIcnV636IAs9-r"
    + "@wineworld-db-mysql-do-user-13620893-0.b.db.ondigitalocean.com:25060/defaultdb"
)
db = SQLAlchemy(app)
app.app_context().push()


class Wine(db.Model):
    __tablename__ = "Wines"
    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    country = Column(String(100))
    region = Column(String(100))
    winery = Column(String(100))
    rating = Column(Float)
    reviews = Column(Integer)
    type = Column(String(100))
    image = Column(String(100))


class Vineyard(db.Model):
    __tablename__ = "Vineyards"
    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    country = Column(String(100))
    price = Column(Integer)
    rating = Column(Float)
    reviews = Column(Integer)
    image = Column(String(100))
    url = Column(String(100))
    longitude = Column(Float)
    latitude = Column(Float)


class Region(db.Model):
    __tablename__ = "Regions"
    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    country = Column(String(100))
    rating = Column(Float)
    reviews = Column(Integer)
    tags = Column(JSON)
    tripTypes = Column(JSON)
    longitude = Column(Float)
    latitude = Column(Float)
    url = Column(String(150))
    image = Column(String(100))
    imageWidth = Column(Integer)
    imageHeight = Column(Integer)


class RedditPost(db.Model):
    __tablename__ = "RedditPosts"
    id = Column(Integer, primary_key=True)
    wine_type = Column(String(20))
    urls = Column(JSON)
