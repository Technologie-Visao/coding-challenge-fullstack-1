from app.models.texture import Texture

TEXTURE_NAME = "Duplicate Test Texture"
TEXTURE_URL = "https://static-dev.withpoly.com/v3-voronoi/textures/previews/2b9f22c8-8348-46f5-8558-bc20364dbca1.webp"
TEXTURE_DESCRIPTION = 'First test description'
UPDATED_TEXTURE_DESCRIPTION = 'Updated test description'

def insert_texture(client, texture: Texture):
    return client.post('/textures/insert', json=texture.to_dict())
