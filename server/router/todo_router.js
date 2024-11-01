const {Router} = require("express")
const { getTodo, addTodo ,deleteTodo, updateTodo } = require("../controller/todo_ctr")

const todoRouter = Router()

todoRouter.get("/get" , getTodo)
todoRouter.post("/addTodo" , addTodo)
todoRouter.delete("/deleteTodo/:id" ,deleteTodo)
todoRouter.put("/updateTodo/:id" ,updateTodo)


module.exports = todoRouter