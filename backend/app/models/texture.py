
class Texture:

    def __init__(self, name, description, url):
        self.name = name
        self.description = description
        self.url = url

    def to_dict(self):
        return {
            'name': self.name,
            'description': self.description,
            'url': self.url
        }
