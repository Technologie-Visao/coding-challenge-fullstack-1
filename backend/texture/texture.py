import json


class Texture:
    def __init__(self, name, description, thumbnail_url):
        self.name = name
        self.description = description
        self.thumbnail_url = thumbnail_url
        self.weight = 0

    def __iter__(self):
        yield from {
            "name": self.name,
            "description": self.description,
            "thumbnail_url": self.thumbnail_url,
        }.items()

    def __str__(self):
        return json.dumps(dict(self), ensure_ascii=False)

    def to_json(self):
        return self.__str__()

    @staticmethod
    def from_json(json_dct):
        return Texture(json_dct['name'],
                       json_dct['description'],
                       json_dct['thumbnail_url'])

    def set_texture_weight(self, substring):
        lower_substring = substring.lower()
        self.weight += self.description.lower().count(lower_substring)
        if lower_substring in self.name.lower():
            self.weight += 3
