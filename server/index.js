const express = require("express")
const cors = require("cors")
const todoRouter = require("./router/todo_router")
require("dotenv").config()
const bodyParser = require("body-parser")



const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
const PORT = process.env.PORT || 4000
app.use(todoRouter)

app.listen(PORT ,() =>{
  console.log("Server is runnig on the http://localhost:" + PORT);
})