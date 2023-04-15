from flask import jsonify, request
from elasticsearch.exceptions import NotFoundError

from . import textures_blueprint
from .utils import INDEX_NAME
from ..database.elasticsearch.getEs import es


@textures_blueprint.route('/textures/insert', methods=['POST'])
def insert_texture():
    texture_data = request.get_json()

    name = texture_data.get('name')
    if not name:
        return jsonify({"result": "error", "message": "Name field is missing"})

    result = es.index(index=INDEX_NAME, id=name, body=texture_data)

    if result["_shards"]["successful"] > 0:
        return jsonify({"result": "success", "id": result["_id"]})
    else:
        return jsonify({"result": "error"})


@textures_blueprint.route('/textures/<texture_id>', methods=['GET'])
def get_texture(texture_id):
    try:
        result = es.get(index=INDEX_NAME, id=texture_id)
        if result['found']:
            return jsonify(result['_source'])
        else:
            return jsonify({"result": "not found"}), 404
    except NotFoundError:
        return jsonify({"result": "not found"}), 404


@textures_blueprint.route('/textures', methods=['GET'])
def get_all_textures():
    query = {
        "size": 1000,
        "query": {
            "match_all": {}
        }
    }
    result = es.search(index=INDEX_NAME, body=query)

    textures = [hit['_source'] for hit in result['hits']['hits']]
    return jsonify(textures)


@textures_blueprint.route('/textures/insert-multiple', methods=['POST'])
def insert_textures():
    textures_data = request.get_json()

    for texture_data in textures_data:
        name = texture_data.get('name')
        if not name:
            return jsonify({"result": "error", "message": "Name field is missing"})

        try:
            es.index(index=INDEX_NAME, id=name, body=texture_data)
        except:
            pass

    total_count = es.count(index=INDEX_NAME)
    return jsonify({"result": "success", "message": "Inserted {} textures".format(len(textures_data)),
                    "total_count": total_count['count']})


@textures_blueprint.route('/textures/<texture_id>', methods=['DELETE'])
def delete_texture(texture_id):
    try:
        result = es.delete(index=INDEX_NAME, id=texture_id)
        if result['result'] == 'deleted':
            return jsonify({"result": "success"})
        else:
            return jsonify({"result": "not found"}), 404
    except NotFoundError:
        return jsonify({"result": "not found"}), 404


@textures_blueprint.route('/textures', methods=['DELETE'])
def delete_all_textures():
    try:
        result = es.delete_by_query(index=INDEX_NAME, body={"query": {"match_all": {}}})
        if result['deleted'] > 0:
            return jsonify({"result": "success", "message": "Deleted {} textures".format(result['deleted'])})
        else:
            return jsonify({"result": "success", "message": "No textures found"})
    except NotFoundError:
        return jsonify({"result": "not found"}), 404


@textures_blueprint.route('/textures/suggestions', methods=['GET'])
def texture_suggestions():
    search_term = request.args.get('search_term', '')
    limit = int(request.args.get('limit', 5))

    if len(search_term) < 2:
        return jsonify([])

    suggestions = search_textures_es(search_term, limit)
    return jsonify(suggestions)


def search_textures_es(search_term, limit):
    body = {
        "query": {
            "multi_match": {
                "query": search_term,
                "fields": ["name^2", "description"],
                "operator": "or"
            }
        },
        "size": limit
    }

    result = es.search(index=INDEX_NAME, body=body)
    return [hit['_source'] for hit in result['hits']['hits']]
