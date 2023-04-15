from app.models.texture import Texture


def test_texture_init():
    texture = Texture("name", "description", "url")
    assert texture.name == "name"
    assert texture.description == "description"
    assert texture.url == "url"


def test_texture_to_dict():
    texture = Texture("name", "description", "url")
    texture_dict = texture.to_dict()
    assert texture_dict == {
        'name': "name",
        'description': "description",
        'thumbnail_url': "url"
    }
