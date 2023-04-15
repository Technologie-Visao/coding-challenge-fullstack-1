import falcon
from waitress import serve
from texture.texture_suggestions import TextureSuggestions


# Create Server
def create():
    app = falcon.App(cors_enable=True)
    app.add_route('/textures/suggestions', TextureSuggestions())
    return app


api = create()

# Start server
if __name__ == '__main__':
    serve(api, host='0.0.0.0', port=9090)
