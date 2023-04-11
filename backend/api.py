from flask import Flask, request, jsonify
import json

app = Flask(__name__)

with open('data.json') as file:
    data = json.load(file)

def scoreSearch(result, searchTerm):
    score = 0
    if searchTerm in result['name']:
        score += 1
    if searchTerm in result['description']:
        score += 0.5
    return score

@app.route('/textures/suggestions')
def getSuggestions():
    search = request.args.get('search')
    limit = int(request.args.get('limit'))
    #TODO: if one of the parameters is missing, return an error code (probably 422)

    suggestions = []
    for item in data:
        score = scoreSearch(item, search)
        if score > 0:
            suggestions.append({'name': item['name'], 'description': item['description'], 'thumbnail_url': item['thumbnail_url'], 'score': score})

    sortedResults = sorted(suggestions, key=lambda x: x['score'], reverse=True)
    results = [{'name': s['name'], 'description': s['description'], 'thumbnail_url': s['thumbnail_url']} for s in sortedResults]

    return jsonify(results[:limit])

if __name__ == '__main__':
    app.run()