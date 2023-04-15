import json

from tests.unittests.helpers.utils import TEXTURE_SUGGESTIONS_ENDPOINT, LIMIT_PARAM, SEARCH_TERM_PARAM, \
    ALL_TEXTURES_ENDPOINT


def test_texture_suggestions_valid_search_term_and_limit(client):
    response = client.get(f'{TEXTURE_SUGGESTIONS_ENDPOINT}?{SEARCH_TERM_PARAM}=test&{LIMIT_PARAM}=5')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert isinstance(data, list)


def test_texture_suggestions_invalid_search_term(client):
    response = client.get(f'{TEXTURE_SUGGESTIONS_ENDPOINT}?{SEARCH_TERM_PARAM}=t')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data == []


def test_texture_suggestions_no_search_term(client):
    response = client.get(TEXTURE_SUGGESTIONS_ENDPOINT)
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data == []


def test_texture_suggestions_custom_limit(client):
    response = client.get(f'{TEXTURE_SUGGESTIONS_ENDPOINT}?{SEARCH_TERM_PARAM}=test&{LIMIT_PARAM}=3')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert isinstance(data, list)
    assert len(data) <= 3


def test_get_all_textures(client):
    response = client.get(ALL_TEXTURES_ENDPOINT)
    assert response.status_code == 200
    data = json.loads(response.data)
    assert isinstance(data, list)
    for texture in data:
        assert 'name' in texture
        assert 'description' in texture
        assert 'thumbnail_url' in texture
