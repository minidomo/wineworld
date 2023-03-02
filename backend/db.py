import json
from models import app, db, Wine, Vineyard, Region

def populate_db():
    populate_wines()
    populate_vineyards()
    populate_regions()

# TODO
def populate_wines():
    pass

# TODO
def populate_vineyards():
    pass

# TODO
def populate_regions():
    pass

if __name__ == "__main__":
    with app.app_context():
        db.drop_all()
        db.create_all()
        populate_db()