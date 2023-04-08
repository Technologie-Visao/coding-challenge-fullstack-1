from flask import Flask, jsonify, request
import json
import textdistance


app = Flask(__name__)

def get_texture_suggestions(search_term, limit=5):
    # Load texture data from JSON file
    with open('data.json', 'r') as data:
        textures = json.load(data)

    weighted_textures = []
    # Calculate weights/scores for each texture based on name similarity
    for texture in textures:
        # Convert texture name to lowercase
        name = texture['name'].lower()
        # Calculate normalized Levenshtein distance between search term and texture name
        distance = textdistance.levenshtein.normalized_similarity(search_term.lower(), name)
        # Calculate position of search term in texture name and normalize it by name length
        position = name.find(search_term.lower())
        weight = distance + (1 - position / len(name))
        # Add texture name and weight to list of weighted textures
        weighted_textures.append({'name': texture['name'], 'weight': weight})

    # Filter textures based on search term
    filtered_textures = [texture for texture in weighted_textures if search_term.lower() in texture['name'].lower()]
    # Sort textures by descending weight
    sorted_textures = sorted(filtered_textures, key=lambda texture: texture['weight'], reverse=True)
    # Return top N suggestions
    suggestions = sorted_textures[:limit]
    
    return suggestions

@app.route('/textures/suggestions')
def texture_suggestions():
    search_term = request.args.get('q', '')
    limit = request.args.get('limit', 5)
    suggestions = get_texture_suggestions(search_term, limit)
    return jsonify(suggestions)

if __name__ == '__main__':
    app.run(debug=True)