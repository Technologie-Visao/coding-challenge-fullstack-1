from flask import Blueprint

textures_blueprint = Blueprint('textures', __name__)

from . import routes
