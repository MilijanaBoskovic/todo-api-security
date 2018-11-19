const expect=require('expect');
const request=require('supertest');
const path=require('path');

const {app}=require('.\\..\\server');// relative path, then one directory back
const {Todo}=require('.\\..\\models\\todo');
const {User}=require('.\\..\\models\\user');
const {ObjectID}=require('mongodb');
const {todos,populateTodos,users,populateUsers}=require('./seed/seed.js');
//const {User}=require('./../models/user');

// before((done)=>
// {
//   Todo.remove({}).then(()=>{
//     done();
// });
// });

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', ()=>
{
  it('should create a new todo',(done)=>
  {
    let text='Test todo text';
    request(app).post('/todos').send({text}).expect(200)
    .expect((res)=>{
       expect(res.body.text).toBe(text);
     }).end((err,res)=>
     {
       if(err)
       {
         return done(err);
       }

       Todo.find().then((todos)=>{

         expect(todos.length).toBe(3);
         expect(todos[0].text).toBe(text);

         done();
       }).catch((e)=>{done(e);});
     })
  });
// it('should not create to do with invalid body data',(done)=>
// {
//   request(app).post('/todos').send({}).expect(400)
//   .end((err,res)=>
//   {
//     if(err)
//     {
//       return done(err);
//     }
//     Todo.find().then((todos)=>{
//       console.log(typeof todos);
//       expect(todos.length).toBe(1);
//       done();
//     }).catch((e)=>{done(e);});
//   });
// });
});

describe('GET /todos',()=>{

it('should get all todos',(done)=>
{
  request(app).get('/todos').expect(200).expect((res)=>
  {
    console.log(typeof res.body.todos);
    console.log(res.body.todos);
    expect(res.body.todos.length).toBe(1);
  }).end(done);
});

describe('GET /todos/:id',()=>{

it('should return todo doc',(done)=>
{
    request(app).get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end(done);
});

it('should return 404 if todo not found',(done)=>
{
  var validIdButNotExistsInDatabase= new ObjectID();
  request(app).get(`/todos/${validIdButNotExistsInDatabase.toHexString()}`)
    .expect(404)
    .end(done);

});

it('should return 404 for non object ids',(done)=>
{
  var invalidId= '123';
  request(app).get(`/todos/${invalidId}`)
    .expect(404)
    .end(done);

});

});


describe('DELETE /todos/:id',()=>{

it('should remove todo',(done)=>
{
  var hexId=todos[1]._id.toHexString();
  request(app).delete(`/todos/${hexId}`)
  .expect(200)
  .expect((res)=>
  {
    expect(res.body.todo._id).toBe(hexId);
  }).end((err,res)=>{
    if(err)
    {
      return done(err);
    }

    Todo.findById(hexId).then((todo)=>
    {
      expect(todo).toNotExist();
      done();
    }).catch((e)=>{
      done(e);
    });
  });
});

it('should return 404 if todo not found',(done)=>
{
  var validIdButNotExistsInDatabase= new ObjectID();
  request(app).delete(`/todos/${validIdButNotExistsInDatabase.toHexString()}`)
    .expect(404)
    .end(done);
});

it('should return 404 if object id is invalid',(done)=>
{
  var invalidId= '123';
  request(app).delete(`/todos/${invalidId}`)
    .expect(404)
    .end(done);
});

});


describe('PATCH /todos/:id',()=>{


it('should update the todo',(done)=>
{
  var id=todos[0]._id.toHexString();
  var text='This should be the new text';

  request(app).patch(`/todos/${id}`)
  .send({
      completed:true,
      text:text
  })
  .expect(200)
  .expect((res)=>
  {
    expect(res.body.todo.text).toBe(text);
    expect(res.body.todo.completed).toBe(true);
    expect(res.body.todo.completedAt).toBeA('number');
  })
  .end(done);

});

it('should clear completedAt when todo is not completed',(done)=>
{
  var id=todos[1]._id.toHexString();
  var text='This should be the new text';
  request(app).patch(`/todos/${id}`)
  .send({
      completed:false,
      text:text
  })
  .expect(200)
  .expect((res)=>{
    expect(res.body.todo.text).toBe(text);
    expect(res.body.todo.completed).toBe(false);
    expect(res.body.todo.completedAt).toNotExist();
  }).end(done);

});

});
});
describe ('GET /users/me',()=>{

it('should return user if authenticated',(done)=>{

  request(app).get('/users/me').set('x-auth',users[0].tokens[0].token)
  .expect(200)
  .expect((res)=>{
    expect(res.body._id).toBe(users[0]._id.toHexString());
    expect(res.body.email).toBe(users[0].email);
  })
  .end(done);

});
it('should return 401 if not authenticated',(done)=>{

  request(app).get('/users/me')
  .expect(401)
  .expect((res)=>{
    expect(res.body).toEqual({});
  }).end(done);

});

});

describe('POST users',()=>{

it('should create a user',(done)=>{
  var email='example@example.com';
  var password='pass123';
  request(app).post('/users').send({email,password})
  .expect(200)
  .expect((res)=>{
    expect(res.headers['x-auth']).toExist();
    expect(res.body._id).toExist();
    expect(res.body.email).toBe(email);
  }).end((err)=>{
    if(err)
    {
      return done(err);
    }
    User.findOne({email}).then((user)=>{
      expect(user).toExist();
      expect(user.password).toNotBe(password);
      done();
    });
  });
});

it('should return validation errors if request invalid',(done)=>{});

it('should not create user if email in use',(done)=>{});
});