from flask import Flask, request
from flask_cors import CORS
from TextureSuggester import TextureSuggester
ts = TextureSuggester()

app = Flask(__name__)
CORS(app)   #CORS is allowing all origins - ADD CONFIG FOR PROD


@app.route('/textures/suggestions')
def texture_suggestions():
    input = request.args.get('search', '')
    limit = int(request.args.get('limit', 0))
    suggestions = ts.get_suggestions(input, limit)
    return suggestions


if __name__ == "__main__":
    app.run(debug=True)
    
