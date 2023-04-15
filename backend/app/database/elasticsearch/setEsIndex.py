from backendVisao.app.database.elasticsearch.getEs import es
from backendVisao.app.textures.utils import INDEX_NAME


def create_index():
    settings = {
        "settings": {
            "analysis": {
                "analyzer": {
                    "autocomplete_analyzer": {
                        "tokenizer": "standard",
                        "filter": [
                            "lowercase",
                            "autocomplete_filter"
                        ]
                    },
                    "search_analyzer": {
                        "tokenizer": "standard",
                        "filter": [
                            "lowercase"
                        ]
                    }
                },
                "filter": {
                    "autocomplete_filter": {
                        "type": "edge_ngram",
                        "min_gram": 1,
                        "max_gram": 10
                    }
                }
            }
        },
        "mappings": {
            "properties": {
                "name": {
                    "type": "text",
                    "analyzer": "autocomplete_analyzer",
                    "search_analyzer": "search_analyzer"
                },
                "description": {
                    "type": "text",
                    "analyzer": "autocomplete_analyzer",
                    "search_analyzer": "search_analyzer"
                },
                "thumbnail_url": {
                    "type": "keyword"
                }
            }
        }
    }

    es.indices.create(index=INDEX_NAME, body=settings)


def delete_index():
    if es.indices.exists(index=INDEX_NAME):
        es.indices.delete(index=INDEX_NAME)
