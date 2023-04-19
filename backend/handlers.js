const texturesData = require("./data.json");

function getTextureSuggestions(req, res) {
  const searchTerm = req.query.searchTerm
    ? req.query.searchTerm.toLowerCase()
    : "";
  const limit = parseInt(req.query.limit);

  // apply a weight/score to find the best possible matches
  const suggestions = texturesData
    .map((texture) => {
      let weight = 0;
      const name = texture.name.toLowerCase();
      const description = texture.description.toLowerCase();

      if (name.includes(searchTerm)) {
        weight += 2;
      }
      if (description.includes(searchTerm)) {
        weight += 1;
      }

      return { ...texture, weight: `${weight}` };
    })
    .filter((texture) => texture.weight > 0) // filter out suggestions with weight 0
    .sort((a, b) => b.weight - a.weight)
    // sort suggestions by descending weight
    .slice(0, limit); // return the number of suggestions corresponding to the limit parameter provided

  // return a JSON response with an array of suggested textures
  res.status(200).json({
    status: 200,
    data: suggestions,
  });
}

module.exports = {
  getTextureSuggestions,
};
