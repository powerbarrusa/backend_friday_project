const express = require("express")
const app = express()
const port = 3000

app.use(express.static('public'))

const data = require("./data.json")

// const parser = require('body-parser')
// app.use(parser.json())

app.get("/", (req, res) => res.send(data))

app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({error:err})
})

app.use((req, res, next) => {
  res.status(404).json({error: {message: "Not found"}})
})

const listener = () => console.log(`Listening on port ${port}!`)
app.listen(port, listener)

module.exports = app