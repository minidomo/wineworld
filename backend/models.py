# mypy: disable-error-code="name-defined"

import os

from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import DECIMAL, JSON, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

load_dotenv()

app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ["SQLALCHEMY_DATABASE_URI"]
db = SQLAlchemy(app)


class Wine(db.Model):
    __tablename__ = "wines"
    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    country = Column(String(100))
    region = Column(String(100))
    winery = Column(String(100))
    rating = Column(DECIMAL(2, 1))
    reviews = Column(Integer)
    type = Column(String(100))
    image = Column(String(100))
    reddit_post_id = Column(Integer, ForeignKey("reddit_posts.id"))
    reddit_post = relationship("RedditPost", back_populates="wines")
    region_list = relationship("WineRegionAssociation", back_populates="wine")
    vineyard_list = relationship("WineVineyardAssociation", back_populates="wine")


class Vineyard(db.Model):
    __tablename__ = "vineyards"
    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    country = Column(String(100))
    price = Column(Integer)
    rating = Column(DECIMAL(2, 1))
    reviews = Column(Integer)
    image = Column(String(100))
    url = Column(String(100))
    longitude = Column(DECIMAL(9, 6))
    latitude = Column(DECIMAL(9, 6))
    region_names = Column(JSON)
    wine_list = relationship("WineVineyardAssociation", back_populates="vineyard")
    region_list = relationship("VineyardRegionAssociation", back_populates="vineyard")


class Region(db.Model):
    __tablename__ = "regions"
    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    country = Column(String(100))
    rating = Column(DECIMAL(2, 1))
    reviews = Column(Integer)
    tags = Column(JSON)
    trip_types = Column(JSON)
    longitude = Column(DECIMAL(9, 6))
    latitude = Column(DECIMAL(9, 6))
    url = Column(String(150))
    image = Column(String(100))
    image_width = Column(Integer)
    image_height = Column(Integer)
    wine_list = relationship("WineRegionAssociation", back_populates="region")
    vineyard_list = relationship("VineyardRegionAssociation", back_populates="region")


class RedditPost(db.Model):
    __tablename__ = "reddit_posts"
    id = Column(Integer, primary_key=True)
    wine_type = Column(String(20))
    urls = Column(JSON)
    wines = relationship("Wine", back_populates="reddit_post")


class WineRegionAssociation(db.Model):
    __tablename__ = "wine_region_association"
    wine_id = Column(ForeignKey("wines.id"), primary_key=True)
    region_id = Column(ForeignKey("regions.id"), primary_key=True)
    wine = relationship("Wine", back_populates="region_list")
    region = relationship("Region", back_populates="wine_list")


class VineyardRegionAssociation(db.Model):
    __tablename__ = "vineyard_region_association"
    vineyard_id = Column(ForeignKey("vineyards.id"), primary_key=True)
    region_id = Column(ForeignKey("regions.id"), primary_key=True)
    vineyard = relationship("Vineyard", back_populates="region_list")
    region = relationship("Region", back_populates="vineyard_list")


class WineVineyardAssociation(db.Model):
    __tablename__ = "wine_vineyard_association"
    wine_id = Column(ForeignKey("wines.id"), primary_key=True)
    vineyard_id = Column(ForeignKey("vineyards.id"), primary_key=True)
    wine = relationship("Wine", back_populates="vineyard_list")
    vineyard = relationship("Vineyard", back_populates="wine_list")
