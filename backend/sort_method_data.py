from models import Region
from sort_method import SortMethod

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
