import json

from models import (
    RedditPost,
    Region,
    Vineyard,
    VineyardRegionAssociation,
    Wine,
    WineRegionAssociation,
    WineVineyardAssociation,
    app,
    db,
)


def connect_wines_reddit_post(reddit_posts: list[RedditPost], wines: list[Wine]):
    for reddit_post in reddit_posts:

        def predicate(e):
            return e.type == reddit_post.wine_type

        reddit_post.wines = [wine for wine in filter(predicate, wines)]


def connect_wines_regions(wines: list[Wine], regions: list[Region]):
    total_associations = 0

    for wine in wines:

        def predicate(e):
            return e.country == wine.country and e.name == wine.region

        region = next(filter(predicate, regions))
        wine.region_list.append(WineRegionAssociation(region=region))
        total_associations += 1

    print(f"wine - region associations: {total_associations}")


def connect_vineyards_regions(vineyards: list[Vineyard], regions: list[Region]):
    total_associations = 0

    for vineyard in vineyards:

        def predicate(e):
            return e.name in vineyard.region_names

        for region in filter(predicate, regions):
            vineyard.region_list.append(VineyardRegionAssociation(region=region))
            total_associations += 1

    print(f"vineyard - region associations: {total_associations}")


def connect_wines_vineyards(wines: list[Wine], vineyards: list[Vineyard]):
    total_associations = 0

    for wine in wines:

        def predicate(e):
            return wine.region in e.region_names

        for vineyard in filter(predicate, vineyards):
            wine.vineyard_list.append(WineVineyardAssociation(vineyard=vineyard))
            total_associations += 1

    print(f"wine - vineyard associations: {total_associations}")


def populate_db():
    reddit_posts = create_reddit_posts()
    wines = create_wines()
    regions = create_regions()
    vineyards = create_vineyards()

    connect_wines_reddit_post(reddit_posts, wines)
    connect_wines_regions(wines, regions)
    connect_vineyards_regions(vineyards, regions)
    connect_wines_vineyards(wines, vineyards)

    db.session.add_all(reddit_posts)
    db.session.add_all(wines)
    db.session.add_all(regions)
    db.session.add_all(vineyards)
    db.session.commit()


def create_reddit_posts() -> list[RedditPost]:
    with open("data/wine_reddit.json") as jsn:
        wine_types = json.load(jsn)["data"]
        ret: list[RedditPost] = []

        for wine_type in wine_types:
            args = {
                "wine_type": wine_type,
                "urls": wine_types[wine_type],
            }
            ret.append(RedditPost(**args))

        return ret


def create_wines() -> list[Wine]:
    with open("data/wines.json") as jsn:
        wines = json.load(jsn)["data"]
        print(f"wine count: {len(wines)}")

        ret: list[Wine] = []

        for wine in wines:
            args = {
                "name": wine["name"],
                "country": wine["country"],
                "region": wine["region"],
                "winery": wine["winery"],
                "rating": wine["rating"],
                "reviews": wine["reviews"],
                "type": wine["type"],
                "image": wine["image"],
            }
            ret.append(Wine(**args))

        return ret


def create_vineyards() -> list[Vineyard]:
    with open("data/vineyards.json") as jsn:
        vineyards = json.load(jsn)["data"]
        print(f"vineyard count: {len(vineyards)}")

        ret: list[Vineyard] = []

        for vineyard in vineyards:
            args = {
                "name": vineyard["name"],
                "country": vineyard["country"],
                "price": vineyard["price"],
                "rating": vineyard["rating"],
                "reviews": vineyard["reviews"],
                "image": vineyard["image"],
                "url": vineyard["url"],
                "longitude": vineyard["longitude"],
                "latitude": vineyard["latitude"],
                "region_names": vineyard["regions"],
            }
            ret.append(Vineyard(**args))

        return ret


def create_regions() -> list[Region]:
    with open("data/regions.json") as jsn:
        regions = json.load(jsn)["data"]
        print(f"region count: {len(regions)}")

        ret: list[Region] = []
        for region in regions:
            args = {
                "name": region["name"],
                "country": region["country"],
                "rating": region["rating"],
                "reviews": region["reviews"],
                "longitude": region["longitude"],
                "latitude": region["latitude"],
                "url": region["url"],
                "image": region["image"],
                "image_width": int(region["imageWidth"]),
                "image_height": int(region["imageHeight"]),
                "tags": region["tags"],
                "trip_types": region["tripTypes"],
            }
            ret.append(Region(**args))

        return ret


if __name__ == "__main__":
    with app.app_context():
        db.drop_all()
        db.create_all()
        populate_db()
