import json
from app.models.texture import Texture
from tests.e2e.helpers.utils import TEXTURE_NAME, TEXTURE_URL, insert_texture, TEXTURE_DESCRIPTION, UPDATED_TEXTURE_DESCRIPTION


def test_duplicate_texture_insert_e2e(client):
    texture = Texture(TEXTURE_NAME, TEXTURE_DESCRIPTION, TEXTURE_URL)
    response = insert_texture(client, texture)
    assert response.status_code == 200

    updated_texture = Texture(TEXTURE_NAME, UPDATED_TEXTURE_DESCRIPTION, TEXTURE_URL)
    response = insert_texture(client, updated_texture)
    assert response.status_code == 200

    response = client.get(f'/textures/suggestions?search_term=Duplicate&limit=5')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert isinstance(data, list)

    matched_textures = [t for t in data if t["name"] == texture.name]
    assert len(matched_textures) == 1

    assert matched_textures[0]["description"] == updated_texture.description
