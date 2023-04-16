import json
import falcon
import falcon_params_verifier
from texture.texture import Texture


class TextureSuggestions(object):
    required_params = [
            "itemsLimit",
            "searchTerm",
        ]

    @falcon.before(falcon_params_verifier.ParamVerifier(required_params))
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        textureSuggestions = self.get_texture_suggestions(
            itemsLimit=req.params[self.required_params[0]],
            searchTerm=req.params[self.required_params[1]]
        )
        resp.body = json.dumps(textureSuggestions)

    def get_texture_suggestions(self, itemsLimit, searchTerm):
        textures_list = []
        with open("data.json") as file:
            textures_json_string_array = json.load(file)
            # Small shortcul to avoid create another route /textures for the exercice
            # Need to return all textures to populate autoComplete data
            if searchTerm == "*":
                return textures_json_string_array
            for textures_json_string in textures_json_string_array:
                # Convert json string into objects to play with them
                texture_json = json.dumps(textures_json_string)
                texture = json.loads(texture_json,
                                     object_hook=Texture.from_json)
                # Set weight now that we have an object
                texture.set_texture_weight(searchTerm)
                # If weight > 0, append to sort list (skip useless textures)
                if texture.weight > 0:
                    textures_list.append(texture)

        # Sort the textures
        textures_list.sort(key=lambda x: x.weight, reverse=True)

        # Keep only the bests within items limit
        selected_textures = textures_list[0:int(itemsLimit)]

        # Convert back to json and ship it
        selected_textures_json = []
        for texture in selected_textures:
            json_texture = texture.to_json()
            selected_textures_json.append(json.loads(json_texture))

        return selected_textures_json
