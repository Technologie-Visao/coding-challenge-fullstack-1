from flask import Blueprint
from .routes import (get_texture, get_all_textures,
                     delete_texture, delete_all_textures,
                     insert_texture, insert_textures,
                     texture_suggestions)

textures_blueprint = Blueprint('textures', __name__)

textures_blueprint.add_url_rule('/textures/<texture_id>', view_func=get_texture, methods=['GET'])
textures_blueprint.add_url_rule('/textures', view_func=get_all_textures, methods=['GET'])
textures_blueprint.add_url_rule('/textures/<texture_id>', view_func=delete_texture, methods=['DELETE'])
textures_blueprint.add_url_rule('/textures', view_func=delete_all_textures, methods=['DELETE'])
textures_blueprint.add_url_rule('/textures/insert', view_func=insert_texture, methods=['POST'])
textures_blueprint.add_url_rule('/textures/insert-multiple', view_func=insert_textures, methods=['POST'])
textures_blueprint.add_url_rule('/textures/suggestions', view_func=texture_suggestions, methods=['GET'])
