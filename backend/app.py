from flask import Flask, request
from flask_cors import CORS
from TextureSuggester import TextureSuggester
ts = TextureSuggester()

app = Flask(__name__)
CORS(app)   #CORS is allowing all origins - ADD CONFIG FOR PROD


@app.route('/textures/suggestions')
def texture_suggestions():
    """
    Retrieves a list of texture suggestions based on a search query.
    Uses the 'search' and 'limit' query parameters to filter and limit the results.
    Returns:
        A list of dictionary objects containing texture suggestions.
    """
    input = request.args.get('search', '')
    limit = int(request.args.get('limit', 0))
    suggestions = ts.get_suggestions(input, limit)
    return suggestions


if __name__ == "__main__":
    app.run(debug=True)
    
