from flask import jsonify, request
from typing import Dict, List
from app.textures.utils import INDEX_NAME
from app.database.elasticsearch.getEs import es
from app.models.texture import Texture
from flask import Response


def texture_suggestions() -> Response:
    search_term = request.args.get('search_term', '')
    limit = int(request.args.get('limit', 5))

    if len(search_term) < 2:
        return jsonify([])

    suggestions = search_textures_es(search_term, limit)
    return jsonify(suggestions)


def search_textures_es(search_term: str, limit: int) -> List[Dict[str, str]]:
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
    return [Texture(hit['_source']['name'], hit['_source']['description'], hit['_source']['thumbnail_url']).to_dict() for hit in result['hits']['hits']]
