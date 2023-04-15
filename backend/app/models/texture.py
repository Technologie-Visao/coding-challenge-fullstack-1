from typing import Dict


class Texture:
    def __init__(self, name: str, description: str, thumbnail_url: str):
        self.name = name
        self.description = description
        self.url = thumbnail_url

    def to_dict(self) -> Dict[str, str]:
        return {
            'name': self.name,
            'description': self.description,
            'thumbnail_url': self.url
        }
