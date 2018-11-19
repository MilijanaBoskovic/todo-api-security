const {ObjectID}=require('mongodb');
const {mongoose}=require('./../server/db/mongoose');
const {Todo}= require('./../server/models/todo');
const {User}= require('./../server/models/user');

var idTodo='5bee9a73365280cc2826f4f8';
//var id='6bee9a73365280cc2826f4f8'; //changed id
// Todo.find(
//   {
//     _id:id
//   }
// ).then((todos)=>
// {
//   console.log('Todos: ',todos)
// });
//
// Todo.findOne(
//   {
//     _id:id
//   }
// ).then((todo)=>
// {
//   console.log('Todo: ',typeof todo);
// }
// );

// if(!ObjectID.isValid(idTodo))
// {
//   console.log('ID not valid');
// }
// Todo.findById(idTodo).then((todo)=>
// {
//   if(!todo)
//     return console.log('id not found');
//   console.log('Todo by id: ',typeof todo);
// }
// ).catch((e)=>{ console.log(e);});
var userId='5bed37f4fc7813042a39729c';
User.findById(userId).then((user)=>{
  if(!user)
    return console.log('id not found');
  console.log('User by id: ',user);
}).catch((e)=>{console.log(e);});
