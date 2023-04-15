import os

from elasticsearch import Elasticsearch


es = Elasticsearch(
    [os.getenv("ELASTICSEARCH_URL")],
    http_auth=(os.getenv("ELASTICSEARCH_USERNAME"), os.getenv("ELASTICSEARCH_PASSWORD")),
)


