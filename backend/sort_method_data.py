from models import Region
from sort_method import SortMethod

region_sort_methods: dict[str, SortMethod] = {
    e.id: e
    for e in [
        SortMethod(
            key=Region.name.key,
            ascending=True,
            name="Name",
            group="Name",
        ),
        SortMethod(
            key=Region.name.key,
            ascending=False,
            name="Name (Reverse)",
            group="Name",
        ),
        SortMethod(
            key=Region.rating.key,
            ascending=True,
            name="Rating (Low to High)",
            group="Rating",
        ),
        SortMethod(
            key=Region.rating.key,
            ascending=False,
            name="Rating (High to Low)",
            group="Rating",
        ),
        SortMethod(
            key=Region.reviews.key,
            ascending=True,
            name="Review Count (Low to High)",
            group="Review Count",
        ),
        SortMethod(
            key=Region.reviews.key,
            ascending=False,
            name="Review Count (High to Low)",
            group="Review Count",
        ),
        SortMethod(
            key=Region.country.key,
            ascending=True,
            name="Country",
            group="Country",
        ),
        SortMethod(
            key=Region.country.key,
            ascending=False,
            name="Country (Reverse)",
            group="Country",
        ),
    ]
}
