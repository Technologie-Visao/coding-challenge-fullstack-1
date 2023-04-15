import pytest
from app import create_app
from app.database.elasticsearch.getEs import es
from elasticsearch import Elasticsearch


@pytest.fixture
def app():
    app = create_app(testing=True)
    return app


@pytest.fixture
def client(app):
    return app.test_client()


@pytest.fixture
def es_mock(monkeypatch):
    def mock_es():
        return Elasticsearch()

    monkeypatch.setattr(es, "get_es", mock_es)
