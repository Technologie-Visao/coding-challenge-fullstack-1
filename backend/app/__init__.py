from flask import Flask
from dotenv import load_dotenv
from flask_cors import CORS


load_dotenv()


def register_blueprints(app):
    from app.main import main_blueprint
    from app.textures import textures_blueprint
    app.register_blueprint(main_blueprint)
    app.register_blueprint(textures_blueprint)


def create_app(testing=False):
    app = Flask(__name__)
    register_blueprints(app)
    CORS(app)
    return app

