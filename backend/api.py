import json
import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response

from database import Database

load_dotenv()
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)


def set_headers(response: Response) -> None:
    """
    Sets response headers.
    :param response: Response
    :return: None
    """
    cache_time = (60 ** 2) * 24  # 1 day
    response.headers['Cache-Control'] = f"public, max-age={cache_time}"


@app.get("/")
def root() -> str:
    return "Francois Boulay-Handfield's assignment >> GET /textures/suggestions for all data"


# GET /textures/suggestions
@app.get("/textures/suggestions")
def get_suggestions(response: Response, search_term: str, limit: str) -> list[dict]:
    """
    Returns a list of texture suggestions.
    :param search_term: str
    :param limit: str
    :param response: Response
    :return: list[dict]
    """

    set_headers(response)

    # ——— Database Implementation ———
    # db = Database(
    #     os.getenv("NAME"),
    #     os.getenv("CREATE_TABLE")
    # )
    #
    # data = db.select(os.getenv("SELECT"))
    # for index, item in enumerate(data):
    #     data[index] = {
    #         'name': data[index][1],
    #         'description': data[index][2],
    #         'thumbnail_url': data[index][3]
    #     }

    # ——— JSON Implementation ———
    file_name = "data.json"
    data = json.load(open(file_name, "r"))


    for item in data:
        item['weight'] = 0
        if search_term.lower() in item['name'].lower():
            item['weight'] += 5
        if search_term.lower() in item['description'].lower().split():
            item['weight'] += 1

    data = [item for item in data if item['weight'] > 0]
    data.sort(key=lambda x: x['weight'], reverse=True)
    if len(data) > int(limit):
        data = data[:int(limit)]
    return data
