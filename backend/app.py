from flask import Flask, jsonify, request
import json

app = Flask(__name__)

# Load texture data from JSON file
with open('data.json') as f:
    textures = json.load(f)

# Define endpoint for texture suggestions
@app.route('/textures/suggestions')
def get_texture_suggestions():
    search_term = request.args.get('search_term')
    limit = request.args.get('limit')

    # Calculate score for each texture based on how well it matches search term
    for texture in textures:
        name = texture['name'].lower()
        description = texture['description'].lower()
        description_words = description.split(' ')
        search_term = search_term.lower()
        score = 0
        if search_term in name or name in search_term:
            score += 1
        if search_term in description_words:
            score += 0.5
        texture['score'] = score

    # Sort textures by descending score and return top N suggestions
    suggestions = sorted(textures, key=lambda x: x['score'], reverse=True)[:int(limit)]

    # Format response as JSON
    response = jsonify(suggestions)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == '__main__':
    app.run()