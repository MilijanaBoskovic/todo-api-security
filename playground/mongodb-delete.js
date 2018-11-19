
// const MongoClient=require('mongodb').MongoClient;
const {MongoClient, ObjectID} =require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>
{
  if(err)
  {
    return console.log('Unable to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB server.');

  // db.collection('Todos').deleteMany({text:'eat lunch'}).then((result)=>
  // {
  //   console.log(result);
  // });

  // db.collection('Todos').deleteOne({text:'eat lunch'}).then((result)=>
  // {
  //   console.log(result);
  // });

  // db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>
  // {
  //   console.log(result);
  // });

  // db.collection('Users').deleteMany({name: 'Mila'}).then((result)=>
  // {
  //   console.log(result);
  // });

  // db.collection('Users').findOneAndDelete({_id: new ObjectID('5bec17c0bfd0ec191809c4a8')}).then((result)=>
  // {
  //   console.log(result);
  // });

  //db.close();

});
