import os

from elasticsearch import Elasticsearch


es = Elasticsearch(
    [os.environ.get("ELASTICSEARCH_URL")],
    http_auth=(os.environ.get("ELASTICSEARCH_USERNAME"), os.environ.get("ELASTICSEARCH_PASSWORD")),
)

