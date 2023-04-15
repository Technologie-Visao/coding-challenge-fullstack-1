from app.database.elasticsearch.getEs import es
from flask import jsonify
from elasticsearch.exceptions import NotFoundError
from typing import Union, Tuple
from flask import Response

from app.constants.utils import INDEX_NAME, NOT_FOUND_ERROR


def delete_texture(texture_id: str) -> Union[Response, Tuple[Response, int]]:
    try:
        result = es.delete(index=INDEX_NAME, id=texture_id)
        if result['result'] == 'deleted':
            return jsonify({"result": "success"})
        else:
            return jsonify({"result": NOT_FOUND_ERROR}), 404
    except NotFoundError:
        return jsonify({"result": NOT_FOUND_ERROR}), 404


def delete_all_textures() -> Response:
    try:
        result = es.delete_by_query(index=INDEX_NAME, body={"query": {"match_all": {}}})
        if result['deleted'] > 0:
            return jsonify({"result": "success", "message": "Deleted {} textures".format(result['deleted'])})
        else:
            return jsonify({"result": "success", "message": "No textures found"})
    except NotFoundError:
        return jsonify({"result": NOT_FOUND_ERROR}), 404
