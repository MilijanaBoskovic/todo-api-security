const {Todo}=require('.\\..\\..\\models\\todo');
const {User}=require('.\\..\\..\\models\\user');
const {ObjectID}=require('mongodb');
const jwt=require('jsonwebtoken');

const todos=[
  { _id: new ObjectID(),
    text: 'First test todo'
  },
  {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
  },
];

var user1id=new ObjectID();
var user2id=new ObjectID();
const users=[
  { _id: user1id,
    email: 'milijana@gmail.com',
    password: 'user1pass',
    tokens:[{
      access: 'auth',
      token: jwt.sign({_id:user1id, access: 'auth'},'abc123').toString()
    }]
  },
  {
    _id: user2id,
    email: 'helena@gmail.com',
    password: 'user2pass'
  },
];
const populateTodos=(done)=>
{
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todos);
}).then(()=>done());
};

const populateUsers=(done)=>
{
  User.remove({}).then(()=>{
    var userOne=new User(users[0]).save();
    var userTwo=new User(users[1]).save();
    return Promise.all([userOne,userTwo]);
}).then(()=>done());
};

module.exports={
  todos,populateTodos,users,populateUsers
};
