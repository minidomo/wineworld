from models import Wine, Vineyard, Region
from sort_method import SortMethod

wine_sort_methods: dict[str, SortMethod] = {
    e.id: e
    for e in [
        SortMethod(
            column=Wine.name,
            ascending=True,
            name="Name",
            group="Name",
        ),
        SortMethod(
            column=Wine.name,
            ascending=False,
            name="Name (Reverse)",
            group="Name",
        ),
        SortMethod(
            column=Wine.rating,
            ascending=True,
            name="Rating (Low to High)",
            group="Rating",
        ),
        SortMethod(
            column=Wine.rating,
            ascending=False,
            name="Rating (High to Low)",
            group="Rating",
        ),
        SortMethod(
            column=Wine.reviews,
            ascending=True,
            name="Review Count (Low to High)",
            group="Review Count",
        ),
        SortMethod(
            column=Wine.reviews,
            ascending=False,
            name="Review Count (High to Low)",
            group="Review Count",
        ),
        SortMethod(
            column=Wine.country,
            ascending=True,
            name="Country",
            group="Country",
        ),
        SortMethod(
            column=Wine.country,
            ascending=False,
            name="Country (Reverse)",
            group="Country",
        ),
        SortMethod(
            column=Wine.winery,
            ascending=True,
            name="Winery",
            group="Winery",
        ),
        SortMethod(
            column=Wine.winery,
            ascending=False,
            name="Winery (Reverse)",
            group="Winery",
        ),
        SortMethod(
            column=Wine.type,
            ascending=True,
            name="Type",
            group="Type",
        ),
        SortMethod(
            column=Wine.type,
            ascending=False,
            name="Type (Reverse)",
            group="Type",
        ),
    ]
}

vineyard_sort_methods: dict[str, SortMethod] = {
    # sort methods for name, price, rating, reviews, country
    e.id: e
    for e in [
        SortMethod(
            column=Vineyard.name,
            ascending=True,
            name="Name",
            group="Name",
        ),
        SortMethod(
            column=Vineyard.name,
            ascending=False,
            name="Name (Reverse)",
            group="Name",
        ),
        SortMethod(
            column=Vineyard.price,
            ascending=True,
            name="Price (Low to High)",
            group="Price",
        ),
        SortMethod(
            column=Vineyard.price,
            ascending=False,
            name="Price (High to Low)",
            group="Price",
        ),
        SortMethod(
            column=Vineyard.rating,
            ascending=True,
            name="Rating (Low to High)",
            group="Rating",
        ),
        SortMethod(
            column=Vineyard.rating,
            ascending=False,
            name="Rating (High to Low)",
            group="Rating",
        ),
        SortMethod(
            column=Vineyard.reviews,
            ascending=True,
            name="Review Count (Low to High)",
            group="Review Count",
        ),
        SortMethod(
            column=Vineyard.reviews,
            ascending=False,
            name="Review Count (High to Low)",
            group="Review Count",
        ),
        SortMethod(
            column=Vineyard.country,
            ascending=True,
            name="Country",
            group="Country",
        ),
        SortMethod(
            column=Vineyard.country,
            ascending=False,
            name="Country (Reverse)",
            group="Country",
        ),
    ]
}

region_sort_methods: dict[str, SortMethod] = {
    e.id: e
    for e in [
        SortMethod(
            column=Region.name,
            ascending=True,
            name="Name",
            group="Name",
        ),
        SortMethod(
            column=Region.name,
            ascending=False,
            name="Name (Reverse)",
            group="Name",
        ),
        SortMethod(
            column=Region.rating,
            ascending=True,
            name="Rating (Low to High)",
            group="Rating",
        ),
        SortMethod(
            column=Region.rating,
            ascending=False,
            name="Rating (High to Low)",
            group="Rating",
        ),
        SortMethod(
            column=Region.reviews,
            ascending=True,
            name="Review Count (Low to High)",
            group="Review Count",
        ),
        SortMethod(
            column=Region.reviews,
            ascending=False,
            name="Review Count (High to Low)",
            group="Review Count",
        ),
        SortMethod(
            column=Region.country,
            ascending=True,
            name="Country",
            group="Country",
        ),
        SortMethod(
            column=Region.country,
            ascending=False,
            name="Country (Reverse)",
            group="Country",
        ),
    ]
}
