import pendulum
import requests
from flask_restful import Resource

from src.util.general import JsonObject

from .availability import parse

MINUTES_PER_DAY = 24 * 60


def get_response() -> JsonObject:
    return requests.get("https://api4.parkscape.me/parks").json()


def time_to_minutes(time: pendulum.Time) -> int:
    return time.hour * 60 + time.minute


def minutes_to_time(minutes: int) -> pendulum.Time:
    hour = minutes // 60
    r_minutes = minutes % 60
    return pendulum.time(hour, r_minutes)


def count_availability(response: JsonObject) -> list[int]:
    # prefix sum array
    count = [0 for _ in range(MINUTES_PER_DAY)]

    for park in response["data"]:
        for availability in park["weekdays"]:
            opening, closing = parse(availability)

            if opening is not None:
                opening_index = time_to_minutes(opening)
                count[opening_index] += 1

                if closing is not None:
                    closing_index = time_to_minutes(closing)
                    count[closing_index] -= 1

    # perform prefix sum
    for i in range(1, len(count)):
        count[i] += count[i - 1]

    return count


def get_points(arr: list[int]) -> list[tuple[int, int]]:
    data = arr.copy()

    # ensure min value is 0
    for i in range(len(data)):
        data[i] = max(data[i], 0)

    ret: list[tuple[int, int]] = []

    for i in range(1, len(data)):
        if data[i] != data[i - 1]:
            ret.append((i - 1, data[i - 1]))
            ret.append((i, data[i]))

    if len(ret) > 0:
        first_minute = 0
        last_minute = MINUTES_PER_DAY - 1
        first, _ = ret[0]
        last, _ = ret[len(ret) - 1]

        if first != first_minute:
            ret.insert(0, (first_minute, data[first_minute]))

        if last != last_minute:
            ret.append((last_minute, data[last_minute]))
    else:
        ret.append((0, 0))

    return ret


def create_response(points: list[tuple[int, int]]) -> JsonObject:
    data: list[JsonObject] = []

    for minutes, count in points:
        time = minutes_to_time(minutes)
        data.append(
            {
                "time": {
                    "hour": time.hour,
                    "minute": time.minute,
                },
                "value": count,
            }
        )

    return {"data": data}


class VisualizationLine(Resource):
    def get(self):
        response = get_response()
        counts = count_availability(response)
        points = get_points(counts)
        return create_response(points)
