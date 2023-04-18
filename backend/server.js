const express = require("express")
const cors = require("cors")
const lowDb = require("lowdb")
const FileSync = require("lowdb/adapters/FileSync")
const bodyParser = require("body-parser")


const db = lowDb(new FileSync('data.json'))

db.defaults({ students: [], courses:[] }).write()

const app = express()

app.use(cors())
app.use(bodyParser.json())

const PORT = 3030;

app.get('/items', (req, res) => {
  const data = db.get("items").value()
  return res.json(data)
})

app.get('/items', (req, res) => {
  const data = db.get("items").value()
  return res.json(data)
})


app.get('/items/:ItemName', (req, res) => {
  const data = db.get("items").value()
  const ans = data.filter((item) =>
        item.name.toLowerCase() === req.param("ItemName"));

  return res.json(ans)
})


app.listen(PORT, ()=> {
})
