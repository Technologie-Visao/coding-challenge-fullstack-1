from flask import jsonify
from . import main_blueprint


@main_blueprint.route('/health', methods=['GET'])
def get_health():
    return jsonify({"message": "Yoo !"})


