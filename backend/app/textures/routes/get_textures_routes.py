from app.database.elasticsearch.getEs import es
from app.models.texture import Texture
from flask import jsonify
from elasticsearch.exceptions import NotFoundError
from typing import Union, Tuple
from flask import Response

from app.constants.utils import INDEX_NAME, NOT_FOUND_ERROR


def get_texture(texture_id: str) -> Union[Response, Tuple[Response, int]]:
    try:
        result = es.get(index=INDEX_NAME, id=texture_id)
        if result['found']:
            texture_data = result['_source']
            texture = Texture(texture_data['name'], texture_data['description'], texture_data['thumbnail_url'])
            return jsonify(texture.to_dict())
        else:
            return jsonify({"result": NOT_FOUND_ERROR}), 404
    except NotFoundError:
        return jsonify({"result": NOT_FOUND_ERROR}), 404


def get_all_textures() -> str:
    query = {
        "size": 1000,
        "query": {
            "match_all": {}
        }
    }
    result = es.search(index=INDEX_NAME, body=query)

    textures = [Texture(hit['_source']['name'], hit['_source']['description'], hit['_source']['thumbnail_url']).to_dict() for hit in result['hits']['hits']]
    return jsonify(textures)