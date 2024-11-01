
const {read_file , write_file} = require("../api/api")
const {v4} = require("uuid")
const data = read_file("base.json")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")




const getTodo = (req , res) =>{
  try{
    res.json(data)
  }catch(err){
    throw new Error(err.message)
  }
}

const addTodo= (req , res) =>{
  try{
    data.push({
      id:v4(),
      ...req.body
    })
    write_file("base.json" , data)
    res.send({
      message:"Added todo"
    })
  }catch(err){
     throw new Error(er.message)
  }
}


const deleteTodo = (req , res) =>{
 try{
  const {id} = req.params
  data.find((item , index) =>{
    if (item.id === id) {
      data.splice(index , 1)
    }
  })
 }catch(err){
  throw new Error(err.message)
 }
 write_file("base.json" , data)
 res.send({
  message:"deleted"
 })
}


const updateTodo = (req , res) =>{
  try{
   const {id} = req.params
   const {author , todo} = req.body
   data.forEach((item)=> {
    if (item.id === id) {
      item.author = author ? author : item.author
      item.todo = todo ? todo : item.todo
    }
   });
  }catch(err){
   throw new Error(err.message)
  }
  write_file("base.json" , data)
  res.send({
   message:"Updated"
  })
 }

module.exports = {
  getTodo,
  addTodo,
  deleteTodo,
  updateTodo
}