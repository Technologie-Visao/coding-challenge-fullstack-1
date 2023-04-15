import json
from app.models.texture import Texture


def test_duplicate_texture_insert_e2e(client):
    texture = Texture("Duplicate Test Texture", "A test texture.",
                      "https://static-dev.withpoly.com/v3-voronoi/textures/previews/2b9f22c8-8348-46f5-8558-bc20364dbca1.webp")
    response = client.post('/textures/insert', json=texture.to_dict())
    assert response.status_code == 200

    updated_texture = Texture("Duplicate Test Texture", "An updated test texture.",
                              "https://static-dev.withpoly.com/v3-voronoi/textures/previews/2b9f22c8-8348-46f5-8558-bc20364dbca1.webp")
    response = client.post('/textures/insert', json=updated_texture.to_dict())
    assert response.status_code == 200

    response = client.get('/textures/suggestions?search_term=Duplicate&limit=5')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert isinstance(data, list)

    matched_textures = [t for t in data if t["name"] == texture.name]
    assert len(matched_textures) == 1

    assert matched_textures[0]["description"] == updated_texture.description


