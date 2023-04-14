const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const data = require("./data.json");

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Add this line

app.get("/textures/suggestions", (req, res) => {
  const searchTerm = req.query.term || "";
  const limit = parseInt(req.query.limit) || 5;

  const suggestions = data
    .filter((texture) =>
      texture.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, limit);

  res.json(suggestions);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
