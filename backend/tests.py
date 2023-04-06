import unittest
from typing import Any
from urllib.parse import urlencode

from pyuca import Collator

from app import app
from sort_method_data import (
    region_sort_methods,
    vineyard_sort_methods,
    wine_sort_methods,
)

collator = Collator()

JsonObject = dict[str, Any]

app.testing = True


def create_url(url: str, params: JsonObject | None = None):
    if params is None:
        return url
    return f"{url}?{urlencode(params,True)}"


def is_alphabetical_order(reverse: bool, *elements: str) -> bool:
    return sorted(elements, key=collator.sort_key, reverse=reverse) == list(elements)


class WineAllTests(unittest.TestCase):
    endpoint = "/wines"

    def setUp(self) -> None:
        self.ctx = app.app_context()
        self.ctx.push()
        self.client = app.test_client()

    def tearDown(self) -> None:
        self.ctx.pop()

    def test_status_code_200(self):
        """Written by Ryan"""
        res = self.client.get(WineAllTests.endpoint)
        self.assertEqual(res.status_code, 200)

    def test_unspecified_param(self):
        """Written by Ryan"""
        res = self.client.get(create_url(WineAllTests.endpoint, {"this_is_not_defined": 0}))
        self.assertEqual(res.status_code, 200)

    def test_invalid_formatted_param(self):
        """Written by Ryan"""
        res = self.client.get(
            create_url(
                WineAllTests.endpoint,
                {
                    "page": "this should be a number",
                    "startRating": "this should also be a number",
                },
            )
        )

        self.assertEqual(res.status_code, 200)

    def test_format(self):
        """Written by Ryan"""
        res = self.client.get(WineAllTests.endpoint).get_json()

        self.assertEqual(type(res["length"]), int)
        self.assertEqual(type(res["list"]), list)
        self.assertEqual(type(res["page"]), int)
        self.assertEqual(type(res["totalPages"]), int)
        self.assertEqual(type(res["totalInstances"]), int)

        regions: list = res["list"]
        self.assertGreater(len(regions), 0)

    def test_page_out_of_bounds_1(self):
        """Written by Ryan"""
        page_num = -1
        res = self.client.get(create_url(WineAllTests.endpoint, {"page": page_num})).get_json()
        self.assertEqual(res["page"], page_num)
        self.assertEqual(res["totalPages"], 1)
        self.assertEqual(res["totalInstances"], 0)

    def test_page_out_of_bounds_2(self):
        """Written by Ryan"""
        page_num = 39485
        res = self.client.get(create_url(WineAllTests.endpoint, {"page": page_num})).get_json()
        self.assertEqual(res["page"], page_num)
        self.assertEqual(res["totalPages"], 1)
        self.assertEqual(res["totalInstances"], 0)

    def test_length(self):
        """Written by Ryan"""
        res = self.client.get(WineAllTests.endpoint).get_json()
        self.assertEqual(res["length"], len(res["list"]))

    def test_page(self):
        """Written by Ryan"""
        page_num = 2
        res_1 = self.client.get(WineAllTests.endpoint).get_json()
        res_2 = self.client.get(create_url(WineAllTests.endpoint, {"page": page_num})).get_json()

        self.assertEqual(res_2["page"], page_num)
        self.assertNotEqual(res_1["list"][0]["id"], res_2["list"][0]["id"])

    # TODO remove this
    def test_name(self):
        """Written by Ryan"""
        name_query = "os"
        res = self.client.get(create_url(WineAllTests.endpoint, {"name": name_query})).get_json()

        wines: list[JsonObject] = res["list"]
        self.assertGreater(len(wines), 0)

        for wine in wines:
            name: str = wine["name"].lower()
            self.assertTrue(name_query in name)

    def test_country(self):
        """Written by Ryan"""
        country_query = ["United States", "Portugal"]
        res = self.client.get(create_url(WineAllTests.endpoint, {"country": country_query})).get_json()

        wines: list[JsonObject] = res["list"]
        self.assertGreater(len(wines), 0)

        country_set = set(country_query)
        for wine in wines:
            country: str = wine["country"]
            self.assertTrue(country in country_set)

    def test_sort(self):
        """Written by Ryan"""
        res = self.client.get(create_url(WineAllTests.endpoint, {"sort": "name_asc"})).get_json()

        wines: list[JsonObject] = res["list"]
        self.assertGreater(len(wines), 0)

        for i in range(len(wines) - 1):
            cur_name: str = wines[i]["name"].lower()
            next_name: str = wines[i + 1]["name"].lower()
            self.assertTrue(is_alphabetical_order(False, cur_name, next_name))

    def test_sort_reverse(self):
        """Written by Ryan"""
        res = self.client.get(create_url(WineAllTests.endpoint, {"sort": "name_desc"})).get_json()

        wines: list[JsonObject] = res["list"]
        self.assertGreater(len(wines), 0)

        for i in range(len(wines) - 1):
            cur_name: str = wines[i]["name"].lower()
            next_name: str = wines[i + 1]["name"].lower()
            self.assertTrue(is_alphabetical_order(True, cur_name, next_name))

    def test_floating_point_rating(self):
        """Written by JB"""
        res1 = self.client.get(create_url(WineAllTests.endpoint)).get_json()
        original: JsonObject = res1["list"][0]
        rating: float = original["rating"]

        res2 = self.client.get(
            create_url(
                WineAllTests.endpoint,
                {
                    "startRating": rating,
                    "endRating": rating,
                },
            )
        ).get_json()

        wines: list[JsonObject] = res2["list"]
        self.assertGreater(len(wines), 0)
        found_original = False

        for wine in wines:
            self.assertAlmostEqual(wine["rating"], rating)
            found_original |= wine["id"] == original["id"]

        self.assertTrue(found_original)


class WineIdTests(unittest.TestCase):
    endpoint = "/wines"

    def setUp(self) -> None:
        self.ctx = app.app_context()
        self.ctx.push()
        self.client = app.test_client()

    def tearDown(self) -> None:
        self.ctx.pop()

    def test_status_code_200(self):
        """Written by Ryan"""
        res = self.client.get(f"{WineIdTests.endpoint}/1")
        self.assertEqual(res.status_code, 200)

    def test_status_code_404(self):
        """Written by Ryan"""
        res = self.client.get(f"{WineIdTests.endpoint}/0")
        self.assertEqual(res.status_code, 404)

    def test_format(self):
        """Written by Ryan"""
        res = self.client.get(f"{WineIdTests.endpoint}/1").get_json()

        self.assertEqual(type(res["country"]), str)
        self.assertEqual(type(res["id"]), int)
        self.assertEqual(type(res["image"]), str)
        self.assertEqual(type(res["name"]), str)
        self.assertEqual(type(res["rating"]), float)
        self.assertEqual(type(res["redditPosts"]), list)
        self.assertEqual(type(res["related"]), dict)
        self.assertEqual(type(res["reviews"]), int)
        self.assertEqual(type(res["type"]), str)
        self.assertEqual(type(res["winery"]), str)

        redditPosts: list = res["redditPosts"]
        for post in redditPosts:
            self.assertEqual(type(post), str)

        related: dict = res["related"]
        self.assertEqual(type(related["regions"]), list)
        self.assertEqual(type(related["vineyards"]), list)


class WineConstraintTests(unittest.TestCase):
    endpoint = "/wines/constraints"

    def setUp(self) -> None:
        self.ctx = app.app_context()
        self.ctx.push()
        self.client = app.test_client()

    def tearDown(self) -> None:
        self.ctx.pop()

    def test_status_code_200(self):
        """Written by Ryan"""
        res = self.client.get(WineConstraintTests.endpoint)
        self.assertEqual(res.status_code, 200)

    def test_format(self):
        """Written by Ryan"""
        res: JsonObject = self.client.get(WineConstraintTests.endpoint).get_json()

        self.assertEqual(type(res["rating"]), dict)
        self.assertEqual(type(res["reviews"]), dict)
        self.assertEqual(type(res["wineries"]), list)
        self.assertEqual(type(res["types"]), list)
        self.assertEqual(type(res["countries"]), list)
        self.assertEqual(type(res["sorts"]), list)

        self.assertEqual(type(res["rating"]["min"]), float)
        self.assertEqual(type(res["rating"]["max"]), float)
        self.assertEqual(type(res["reviews"]["min"]), int)

        wineries: list[str] = res["wineries"]
        self.assertGreater(len(wineries), 0)
        self.assertEqual(type(wineries[0]), str)
        self.assertTrue(is_alphabetical_order(False, *wineries))

        types: list[str] = res["types"]
        self.assertGreater(len(types), 0)
        self.assertEqual(type(types[0]), str)
        self.assertTrue(is_alphabetical_order(False, *types))

        countries: list[str] = res["countries"]
        self.assertGreater(len(countries), 0)
        self.assertEqual(type(countries[0]), str)
        self.assertTrue(is_alphabetical_order(False, *countries))

        sort_methods: list[dict] = res["sorts"]
        self.assertGreater(len(sort_methods), 0)
        self.assertEqual(type(sort_methods[0]), dict)
        self.assertTrue(is_alphabetical_order(False, *[e["id"] for e in sort_methods]))

    def test_values(self):
        """Written by Ryan"""
        res: JsonObject = self.client.get(RegionConstraintTests.endpoint).get_json()

        self.assertEqual(res["rating"]["min"], 0.0)
        self.assertEqual(res["rating"]["max"], 5.0)
        self.assertEqual(res["reviews"]["min"], 0)

        sort_methods: list[JsonObject] = res["sorts"]
        for sort_method in sort_methods:
            self.assertTrue(sort_method["id"] in wine_sort_methods)


class VineyardAllTests(unittest.TestCase):
    endpoint = "/vineyards"

    def setUp(self) -> None:
        self.ctx = app.app_context()
        self.ctx.push()
        self.client = app.test_client()

    def tearDown(self) -> None:
        self.ctx.pop()

    def test_status_code_200(self):
        """Written by Ryan"""
        res = self.client.get(VineyardAllTests.endpoint)
        self.assertEqual(res.status_code, 200)

    def test_unspecified_param(self):
        """Written by Ryan"""
        res = self.client.get(create_url(VineyardAllTests.endpoint, {"this_is_not_defined": 0}))
        self.assertEqual(res.status_code, 200)

    def test_invalid_formatted_param(self):
        """Written by Ryan"""
        res = self.client.get(
            create_url(
                VineyardAllTests.endpoint,
                {
                    "page": "this should be a number",
                    "startRating": "this should also be a number",
                },
            )
        )

        self.assertEqual(res.status_code, 200)

    def test_format(self):
        """Written by Ryan"""
        res = self.client.get(VineyardAllTests.endpoint).get_json()

        self.assertEqual(type(res["length"]), int)
        self.assertEqual(type(res["list"]), list)
        self.assertEqual(type(res["page"]), int)
        self.assertEqual(type(res["totalPages"]), int)
        self.assertEqual(type(res["totalInstances"]), int)

        regions: list = res["list"]
        self.assertGreater(len(regions), 0)

    def test_page_out_of_bounds_1(self):
        """Written by Ryan"""
        page_num = -1
        res = self.client.get(create_url(VineyardAllTests.endpoint, {"page": page_num})).get_json()
        self.assertEqual(res["page"], page_num)
        self.assertEqual(res["totalPages"], 1)
        self.assertEqual(res["totalInstances"], 0)

    def test_page_out_of_bounds_2(self):
        """Written by Ryan"""
        page_num = 39485
        res = self.client.get(create_url(VineyardAllTests.endpoint, {"page": page_num})).get_json()
        self.assertEqual(res["page"], page_num)
        self.assertEqual(res["totalPages"], 1)
        self.assertEqual(res["totalInstances"], 0)

    def test_length(self):
        """Written by Ryan"""
        res = self.client.get(VineyardAllTests.endpoint).get_json()
        self.assertEqual(res["length"], len(res["list"]))

    def test_page(self):
        """Written by Ryan"""
        page_num = 2
        res_1 = self.client.get(VineyardAllTests.endpoint).get_json()
        res_2 = self.client.get(create_url(VineyardAllTests.endpoint, {"page": page_num})).get_json()

        self.assertEqual(res_2["page"], page_num)
        self.assertNotEqual(res_1["list"][0]["id"], res_2["list"][0]["id"])

    # TODO remove this
    def test_name(self):
        """Written by Ryan"""
        name_query = "os"
        res = self.client.get(create_url(VineyardAllTests.endpoint, {"name": name_query})).get_json()

        vineyards: list[JsonObject] = res["list"]
        self.assertGreater(len(vineyards), 0)

        for vineyard in vineyards:
            name: str = vineyard["name"].lower()
            self.assertTrue(name_query in name)

    def test_country(self):
        """Written by Ryan"""
        country_query = ["United States", "Portugal"]
        res = self.client.get(create_url(VineyardAllTests.endpoint, {"country": country_query})).get_json()

        vineyards: list[JsonObject] = res["list"]
        self.assertGreater(len(vineyards), 0)

        country_set = set(country_query)
        for vineyard in vineyards:
            country: str = vineyard["country"]
            self.assertTrue(country in country_set)

    def test_sort(self):
        """Written by Ryan"""
        res = self.client.get(create_url(VineyardAllTests.endpoint, {"sort": "name_asc"})).get_json()

        vineyards: list[JsonObject] = res["list"]
        self.assertGreater(len(vineyards), 0)

        for i in range(len(vineyards) - 1):
            cur_name: str = vineyards[i]["name"].lower()
            next_name: str = vineyards[i + 1]["name"].lower()
            self.assertTrue(is_alphabetical_order(False, cur_name, next_name))

    def test_sort_reverse(self):
        """Written by Ryan"""
        res = self.client.get(create_url(VineyardAllTests.endpoint, {"sort": "name_desc"})).get_json()

        vineyards: list[JsonObject] = res["list"]
        self.assertGreater(len(vineyards), 0)

        for i in range(len(vineyards) - 1):
            cur_name: str = vineyards[i]["name"].lower()
            next_name: str = vineyards[i + 1]["name"].lower()
            self.assertTrue(is_alphabetical_order(True, cur_name, next_name))

    def test_floating_point_rating(self):
        """Written by JB"""
        res1 = self.client.get(create_url(VineyardAllTests.endpoint)).get_json()
        original: JsonObject = res1["list"][0]
        rating: float = original["rating"]

        res2 = self.client.get(
            create_url(
                VineyardAllTests.endpoint,
                {
                    "startRating": rating,
                    "endRating": rating,
                },
            )
        ).get_json()

        vineyards: list[JsonObject] = res2["list"]
        self.assertGreater(len(vineyards), 0)
        found_original = False

        for vineyard in vineyards:
            self.assertAlmostEqual(vineyard["rating"], rating)
            found_original |= vineyard["id"] == original["id"]

        self.assertTrue(found_original)


class VineyardIdTests(unittest.TestCase):
    endpoint = "/vineyards"

    def setUp(self) -> None:
        self.ctx = app.app_context()
        self.ctx.push()
        self.client = app.test_client()

    def tearDown(self) -> None:
        self.ctx.pop()

    def test_status_code_200(self):
        """Written by JB"""
        res = self.client.get(f"{VineyardIdTests.endpoint}/1")
        self.assertEqual(res.status_code, 200)

    def test_status_code_404(self):
        """Written by JB"""
        res = self.client.get(f"{VineyardIdTests.endpoint}/0")
        self.assertEqual(res.status_code, 404)

    def test_format(self):
        """Written by JB"""
        res = self.client.get(f"{VineyardIdTests.endpoint}/1").get_json()

        self.assertEqual(type(res["coordinates"]), dict)
        self.assertEqual(type(res["country"]), str)
        self.assertEqual(type(res["id"]), int)
        self.assertEqual(type(res["image"]), str)
        self.assertEqual(type(res["name"]), str)
        self.assertEqual(type(res["price"]), int)
        self.assertEqual(type(res["rating"]), float)
        self.assertEqual(type(res["related"]), dict)
        self.assertEqual(type(res["reviews"]), int)
        self.assertEqual(type(res["url"]), str)

        coordinates: dict = res["coordinates"]
        self.assertEqual(type(coordinates["latitude"]), float)
        self.assertEqual(type(coordinates["longitude"]), float)

        related: dict = res["related"]
        self.assertEqual(type(related["regions"]), list)
        self.assertEqual(type(related["wines"]), list)


class VineyardConstraintTests(unittest.TestCase):
    endpoint = "/vineyards/constraints"

    def setUp(self) -> None:
        self.ctx = app.app_context()
        self.ctx.push()
        self.client = app.test_client()

    def tearDown(self) -> None:
        self.ctx.pop()

    def test_status_code_200(self):
        """Written by Ryan"""
        res = self.client.get(VineyardConstraintTests.endpoint)
        self.assertEqual(res.status_code, 200)

    def test_format(self):
        """Written by Ryan"""
        res: JsonObject = self.client.get(VineyardConstraintTests.endpoint).get_json()

        self.assertEqual(type(res["rating"]), dict)
        self.assertEqual(type(res["reviews"]), dict)
        self.assertEqual(type(res["price"]), dict)
        self.assertEqual(type(res["countries"]), list)
        self.assertEqual(type(res["sorts"]), list)

        self.assertEqual(type(res["rating"]["min"]), float)
        self.assertEqual(type(res["rating"]["max"]), float)
        self.assertEqual(type(res["reviews"]["min"]), int)

        countries: list[str] = res["countries"]
        self.assertGreater(len(countries), 0)
        self.assertEqual(type(countries[0]), str)
        self.assertTrue(is_alphabetical_order(False, *countries))

        sort_methods: list[dict] = res["sorts"]
        self.assertGreater(len(sort_methods), 0)
        self.assertEqual(type(sort_methods[0]), dict)
        self.assertTrue(is_alphabetical_order(False, *[e["id"] for e in sort_methods]))

    def test_values(self):
        """Written by Ryan"""
        res: JsonObject = self.client.get(VineyardConstraintTests.endpoint).get_json()

        self.assertEqual(res["rating"]["min"], 0.0)
        self.assertEqual(res["rating"]["max"], 5.0)
        self.assertEqual(res["reviews"]["min"], 0)

        sort_methods: list[JsonObject] = res["sorts"]
        for sort_method in sort_methods:
            self.assertTrue(sort_method["id"] in vineyard_sort_methods)


class RegionAllTests(unittest.TestCase):
    endpoint = "/regions"

    def setUp(self) -> None:
        self.ctx = app.app_context()
        self.ctx.push()
        self.client = app.test_client()

    def tearDown(self) -> None:
        self.ctx.pop()

    def test_status_code_200(self):
        """Written by JB"""
        res = self.client.get(RegionAllTests.endpoint)
        self.assertEqual(res.status_code, 200)

    def test_unspecified_param(self):
        """Written by JB"""
        res = self.client.get(create_url(RegionAllTests.endpoint, {"this_is_not_defined": 0}))
        self.assertEqual(res.status_code, 200)

    def test_invalid_formatted_param(self):
        """Written by JB"""
        res = self.client.get(
            create_url(
                RegionAllTests.endpoint,
                {
                    "page": "this should be a number",
                    "startRating": "this should also be a number",
                },
            )
        )

        self.assertEqual(res.status_code, 200)

    def test_format(self):
        """Written by JB"""
        res = self.client.get(RegionAllTests.endpoint).get_json()

        self.assertEqual(type(res["length"]), int)
        self.assertEqual(type(res["list"]), list)
        self.assertEqual(type(res["page"]), int)
        self.assertEqual(type(res["totalPages"]), int)
        self.assertEqual(type(res["totalInstances"]), int)

        regions: list = res["list"]
        self.assertGreater(len(regions), 0)

    def test_page_out_of_bounds_1(self):
        """Written by JB"""
        page_num = -1
        res = self.client.get(create_url(RegionAllTests.endpoint, {"page": page_num})).get_json()
        self.assertEqual(res["page"], page_num)
        self.assertEqual(res["totalPages"], 1)
        self.assertEqual(res["totalInstances"], 0)

    def test_page_out_of_bounds_2(self):
        """Written by JB"""
        page_num = 39485
        res = self.client.get(create_url(RegionAllTests.endpoint, {"page": page_num})).get_json()
        self.assertEqual(res["page"], page_num)
        self.assertEqual(res["totalPages"], 1)
        self.assertEqual(res["totalInstances"], 0)

    def test_length(self):
        """Written by JB"""
        res = self.client.get(RegionAllTests.endpoint).get_json()
        self.assertEqual(res["length"], len(res["list"]))

    def test_page(self):
        """Written by JB"""
        page_num = 2
        res_1 = self.client.get(RegionAllTests.endpoint).get_json()
        res_2 = self.client.get(create_url(RegionAllTests.endpoint, {"page": page_num})).get_json()

        self.assertEqual(res_2["page"], page_num)
        self.assertNotEqual(res_1["list"][0]["id"], res_2["list"][0]["id"])

    # TODO remove this
    def test_name(self):
        """Written by JB"""
        name_query = "os"
        res = self.client.get(create_url(RegionAllTests.endpoint, {"name": name_query})).get_json()

        regions: list[JsonObject] = res["list"]
        self.assertGreater(len(regions), 0)

        for region in regions:
            name: str = region["name"].lower()
            self.assertTrue(name_query in name)

    def test_country(self):
        """Written by JB"""
        country_query = ["United States", "Portugal"]
        res = self.client.get(create_url(RegionAllTests.endpoint, {"country": country_query})).get_json()

        regions: list[JsonObject] = res["list"]
        self.assertGreater(len(regions), 0)

        country_set = set(country_query)
        for region in regions:
            country: str = region["country"]
            self.assertTrue(country in country_set)

    def test_rating(self):
        """Written by JB"""
        start_rating = 4.5
        end_rating = 4.9

        res = self.client.get(
            create_url(
                RegionAllTests.endpoint,
                {
                    "startRating": start_rating,
                    "endRating": end_rating,
                },
            )
        ).get_json()

        regions: list[JsonObject] = res["list"]
        self.assertGreater(len(regions), 0)

        for region in regions:
            rating: float = region["rating"]
            self.assertTrue(start_rating <= rating <= end_rating)

    def test_reviews(self):
        """Written by JB"""
        start_reviews = 2
        end_reviews = 50

        res = self.client.get(
            create_url(
                RegionAllTests.endpoint,
                {
                    "startReviews": start_reviews,
                    "endReviews": end_reviews,
                },
            )
        ).get_json()

        regions: list[JsonObject] = res["list"]
        self.assertGreater(len(regions), 0)

        for region in regions:
            reviews: int = region["reviews"]
            self.assertTrue(start_reviews <= reviews <= end_reviews)

    def test_tags(self):
        """Written by JB"""
        tags_query = ["Sights & Landmarks", "Spas & Wellness"]
        res = self.client.get(create_url(RegionAllTests.endpoint, {"tags": tags_query})).get_json()

        regions: list[JsonObject] = res["list"]
        self.assertGreater(len(regions), 0)

        for region in regions:
            tags: set[str] = set(region["tags"])

            for tag in tags_query:
                self.assertTrue(tag in tags)

    def test_trip_types(self):
        """Written by JB"""
        trip_types_query = ["Solo travel", "Couples"]
        res = self.client.get(create_url(RegionAllTests.endpoint, {"tripTypes": trip_types_query})).get_json()

        regions: list[JsonObject] = res["list"]
        self.assertGreater(len(regions), 0)

        for region in regions:
            trip_types: set[str] = set(region["tripTypes"])

            for trip_type in trip_types_query:
                self.assertTrue(trip_type in trip_types)

    def test_sort(self):
        """Written by JB"""
        res = self.client.get(create_url(RegionAllTests.endpoint, {"sort": "name_asc"})).get_json()

        regions: list[JsonObject] = res["list"]
        self.assertGreater(len(regions), 0)

        for i in range(len(regions) - 1):
            cur_name: str = regions[i]["name"].lower()
            next_name: str = regions[i + 1]["name"].lower()
            self.assertTrue(is_alphabetical_order(False, cur_name, next_name))

    def test_sort_reverse(self):
        """Written by JB"""
        res = self.client.get(create_url(RegionAllTests.endpoint, {"sort": "name_desc"})).get_json()

        regions: list[JsonObject] = res["list"]
        self.assertGreater(len(regions), 0)

        for i in range(len(regions) - 1):
            cur_name: str = regions[i]["name"].lower()
            next_name: str = regions[i + 1]["name"].lower()
            self.assertTrue(is_alphabetical_order(True, cur_name, next_name))

    def test_mix_1(self):
        """Written by JB"""
        country_query = ["United States", "Portugal"]
        trip_types_query = ["Couples"]
        tags_query = ["Tours"]
        end_rating = 4.7
        start_reviews = 50

        params: dict[str, Any] = {
            "country": country_query,
            "tripTypes": trip_types_query,
            "tags": tags_query,
            "endRating": end_rating,
            "startReviews": start_reviews,
            "sort": "rating_desc",
        }

        res = self.client.get(create_url(RegionAllTests.endpoint, params)).get_json()

        regions: list[JsonObject] = res["list"]
        self.assertGreater(len(regions), 0)

        country_set = set(country_query)
        for region in regions:
            rating: float = region["rating"]
            reviews: int = region["reviews"]
            country: str = region["country"]
            tags: set[str] = set(region["tags"])
            trip_types: set[str] = set(region["tripTypes"])

            self.assertTrue(rating <= end_rating)
            self.assertTrue(reviews >= start_reviews)
            self.assertTrue(country in country_set)

            for tag in tags_query:
                self.assertTrue(tag in tags)

            for trip_type in trip_types_query:
                self.assertTrue(trip_type in trip_types)

        # checking sort
        for i in range(len(regions) - 1):
            cur_rating: float = regions[i]["rating"]
            next_rating: float = regions[i + 1]["rating"]
            self.assertTrue(cur_rating >= next_rating)

    def test_floating_point_rating(self):
        """Written by JB"""
        res1 = self.client.get(create_url(RegionAllTests.endpoint)).get_json()
        original: JsonObject = res1["list"][0]
        rating: float = original["rating"]

        res2 = self.client.get(
            create_url(
                RegionAllTests.endpoint,
                {
                    "startRating": rating,
                    "endRating": rating,
                },
            )
        ).get_json()

        regions: list[JsonObject] = res2["list"]
        self.assertGreater(len(regions), 0)
        found_original = False

        for region in regions:
            self.assertAlmostEqual(region["rating"], rating)
            found_original |= region["id"] == original["id"]

        self.assertTrue(found_original)


class RegionIdTests(unittest.TestCase):
    endpoint = "/regions"

    def setUp(self) -> None:
        self.ctx = app.app_context()
        self.ctx.push()
        self.client = app.test_client()

    def tearDown(self) -> None:
        self.ctx.pop()

    def test_status_code_200(self):
        """Written by JB"""
        res = self.client.get(f"{RegionIdTests.endpoint}/1")
        self.assertEqual(res.status_code, 200)

    def test_status_code_404(self):
        """Written by JB"""
        res = self.client.get(f"{RegionIdTests.endpoint}/0")
        self.assertEqual(res.status_code, 404)

    def test_format(self):
        """Written by JB"""
        res = self.client.get(f"{RegionIdTests.endpoint}/1").get_json()

        self.assertEqual(type(res["coordinates"]), dict)
        self.assertEqual(type(res["country"]), str)
        self.assertEqual(type(res["id"]), int)
        self.assertEqual(type(res["image"]), dict)
        self.assertEqual(type(res["name"]), str)
        self.assertEqual(type(res["rating"]), float)
        self.assertEqual(type(res["related"]), dict)
        self.assertEqual(type(res["reviews"]), int)
        self.assertEqual(type(res["tags"]), list)
        self.assertEqual(type(res["tripTypes"]), list)
        self.assertEqual(type(res["url"]), str)

        coordinates: dict = res["coordinates"]
        self.assertEqual(type(coordinates["latitude"]), float)
        self.assertEqual(type(coordinates["longitude"]), float)

        image: dict = res["image"]
        self.assertEqual(type(image["height"]), int)
        self.assertEqual(type(image["width"]), int)
        self.assertEqual(type(image["url"]), str)

        related: dict = res["related"]
        self.assertEqual(type(related["vineyards"]), list)
        self.assertEqual(type(related["wines"]), list)

        tags: list = res["tags"]
        self.assertGreater(len(tags), 0)
        self.assertEqual(type(tags[0]), str)

        trip_types: list = res["tripTypes"]
        self.assertGreater(len(trip_types), 0)
        self.assertEqual(type(trip_types[0]), str)


class RegionConstraintTests(unittest.TestCase):
    endpoint = "/regions/constraints"

    def setUp(self) -> None:
        self.ctx = app.app_context()
        self.ctx.push()
        self.client = app.test_client()

    def tearDown(self) -> None:
        self.ctx.pop()

    def test_status_code_200(self):
        """Written by JB"""
        res = self.client.get(RegionConstraintTests.endpoint)
        self.assertEqual(res.status_code, 200)

    def test_format(self):
        """Written by JB"""
        res: JsonObject = self.client.get(RegionConstraintTests.endpoint).get_json()

        self.assertEqual(type(res["rating"]), dict)
        self.assertEqual(type(res["reviews"]), dict)
        self.assertEqual(type(res["tripTypes"]), list)
        self.assertEqual(type(res["tags"]), list)
        self.assertEqual(type(res["countries"]), list)
        self.assertEqual(type(res["sorts"]), list)

        self.assertEqual(type(res["rating"]["min"]), float)
        self.assertEqual(type(res["rating"]["max"]), float)
        self.assertEqual(type(res["reviews"]["min"]), int)

        trip_types: list[str] = res["tripTypes"]
        self.assertGreater(len(trip_types), 0)
        self.assertEqual(type(trip_types[0]), str)
        self.assertTrue(is_alphabetical_order(False, *trip_types))

        tags: list[str] = res["tags"]
        self.assertGreater(len(tags), 0)
        self.assertEqual(type(tags[0]), str)
        self.assertTrue(is_alphabetical_order(False, *tags))

        countries: list[str] = res["countries"]
        self.assertGreater(len(countries), 0)
        self.assertEqual(type(countries[0]), str)
        self.assertTrue(is_alphabetical_order(False, *countries))

        sort_methods: list[dict] = res["sorts"]
        self.assertGreater(len(sort_methods), 0)
        self.assertEqual(type(sort_methods[0]), dict)
        self.assertTrue(is_alphabetical_order(False, *[e["id"] for e in sort_methods]))

    def test_values(self):
        """Written by JB"""
        res: JsonObject = self.client.get(RegionConstraintTests.endpoint).get_json()

        self.assertEqual(res["rating"]["min"], 0.0)
        self.assertEqual(res["rating"]["max"], 5.0)
        self.assertEqual(res["reviews"]["min"], 0)

        sort_methods: list[JsonObject] = res["sorts"]
        for sort_method in sort_methods:
            self.assertTrue(sort_method["id"] in region_sort_methods)


if __name__ == "__main__":
    unittest.main()
