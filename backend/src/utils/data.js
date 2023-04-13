const fs = require('fs')
const path = require('path')

// setttings
const dataDirectory = path.join(__dirname, '..', '..', 'data') // use __dirname so that it doesn't matter from where you run npm start
const fileName = 'data.json'

// read json file
const filePath = path.join(dataDirectory, fileName)
const rawdata = fs.readFileSync(filePath)

// parse json
const data = JSON.parse(rawdata)

// export data so that the file only needs to be read once
module.exports = { data }
