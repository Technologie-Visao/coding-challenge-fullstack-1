from app.database.elasticsearch.getEs import es
from app.models.texture import Texture
from flask import jsonify, request
from typing import Union, Tuple
from flask import Response

from app.textures.utils import INDEX_NAME


def insert_texture() -> Union[Response, Tuple[Response, int]]:
    texture_data = request.get_json()

    name = texture_data.get('name')
    if not name:
        return jsonify({"result": "error", "message": "Name field is missing"})

    texture = Texture(name, texture_data.get('description'), texture_data.get('thumbnail_url'))
    result = es.index(index=INDEX_NAME, id=name, body=texture.to_dict())

    if result["_shards"]["successful"] > 0:
        return jsonify({"result": "success", "id": result["_id"]})
    else:
        return jsonify({"result": "error"})


def insert_textures() -> Union[Response, Tuple[Response, int]]:
    textures_data = request.get_json()

    for texture_data in textures_data:
        name = texture_data.get('name')
        if not name:
            return jsonify({"result": "error", "message": "Name field is missing"})

        texture = Texture(name, texture_data.get('description'), texture_data.get('thumbnail_url'))
        try:
            es.index(index=INDEX_NAME, id=name, body=texture.to_dict())
        except:
            pass

    total_count = es.count(index=INDEX_NAME)
    return jsonify({"result": "success", "message": "Inserted {} textures".format(len(textures_data)),
                    "total_count": total_count['count']})