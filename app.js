const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const env = require("dotenv".config())

app.use(express.static('public'))

const data = require("./data.json")

app.get("/", (req, res) => {
  res.status(200).send({
    "message": "Success!",
    "data": data
  })
})
  
app.get("/:first", (req, res, next) => {
  const first = req.params.first
  const filteredFirst = data.people.filter(person => person.first_name === first)
  filteredFirst ? res.status(200).send(filteredFirst) : res.status(404).json({error: {message: "Not found"}})
})

app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({error:err})
})

app.use((req, res, next) => {
  res.status(404).json({error: {message: "Not found"}})
})

app.listen(env)

module.exports = app