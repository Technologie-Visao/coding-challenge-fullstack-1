const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { getTextureSuggestions } = require("./handlers");
express()
  .use(express.json())
  .use(morgan("tiny"))
  .use(
    cors({
      origin: "http://localhost:5173",
    })
  )

  .get("/", (req, res) => {
    res.status(200).json({ status: 200, message: "Hello World" });
  })

  //endpoints
  .get("/textures/suggestions", getTextureSuggestions)

  //error
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(8000, () => {
    console.log("server running on port 8000");
  });
