const {ObjectID}=require('mongodb');

const {mongoose}=require('./../server/db/mongoose');
const {Todo}= require('./../server/models/todo');
const {User}= require('./../server/models/user');


// Todo.remove({}).then((result)=>{
//   console.log(result);
// });

Todo.findByIdAndRemove('5beecf4b1149be5eba22fabf').then((todo)=>{
  console.log(todo);
});

Todo.findOneAndRemove({_id:'5beecf4b1149be5eba22fabf' }).then((todo)=>{
  console.log(todo);
});
