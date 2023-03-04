import json

from models import RedditPost, Region, Vineyard, Wine, app, db


def populate_db():
    populate_reddit_posts()
    populate_wines()
    populate_vineyards()
    populate_regions()


def populate_reddit_posts():
    with open("data/wine_reddit.json") as jsn:
        data = json.load(jsn)["data"]
        for wine_type in data:
            db_row = {
                "wine_type": wine_type,
                "urls": data[wine_type],
            }
            db.session.add(RedditPost(**db_row))
        db.session.commit()


def populate_wines():
    with open("data/wines.json") as jsn:
        data = json.load(jsn)["data"]
        for wine in data:
            db_row = {
                "name": wine["name"],
                "country": wine["country"],
                "region": wine["region"],
                "winery": wine["winery"],
                "rating": wine["rating"],
                "reviews": wine["reviews"],
                "type": wine["type"],
                "image": wine["image"],
            }
            db.session.add(Wine(**db_row))
        db.session.commit()


def populate_vineyards():
    with open("data/vineyards.json") as jsn:
        data = json.load(jsn)
        for vineyard in data["data"]:
            db_row = {
                "name": vineyard["name"],
                "country": vineyard["country"],
                "price": vineyard["price"],
                "rating": vineyard["rating"],
                "reviews": vineyard["reviews"],
                "image": vineyard["image"],
                "url": vineyard["url"],
                "longitude": vineyard["longitude"],
                "latitude": vineyard["latitude"],
            }
            db.session.add(Vineyard(**db_row))
        db.session.commit()


def populate_regions():
    with open("data/regions.json") as jsn:
        data = json.load(jsn)
        for region in data["data"]:
            db_row = {
                "name": region["name"],
                "country": region["country"],
                "rating": region["rating"],
                "reviews": region["reviews"],
                "longitude": region["longitude"],
                "latitude": region["latitude"],
                "url": region["url"],
                "image": region["image"],
                "imageWidth": int(region["imageWidth"]),
                "imageHeight": int(region["imageHeight"]),
                "tags": region["tags"],
                "tripTypes": region["tripTypes"],
            }
            db.session.add(Region(**db_row))
        db.session.commit()


if __name__ == "__main__":
    with app.app_context():
        db.drop_all()
        db.create_all()
        populate_db()
