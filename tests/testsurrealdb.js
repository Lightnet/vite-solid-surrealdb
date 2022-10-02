

import SurrealDB from 'surrealdb.js';

let db;

async function queryUser(){
  db = new SurrealDB('http://127.0.0.1:8000/rpc');
  await db.wait();
  // Signin as a namespace, database, or root user
  await db.signin({
    user: 'root',
    pass: 'root',
  });
  await db.use('test', 'test');
  console.log(db)

  let result = await db.query('SELECT * from user;');
  console.log(result)
  await db.close();
}

async function querySignIn(){
  db = new SurrealDB('http://127.0.0.1:8000/rpc');
  await db.wait();
  // Signin as a namespace, database, or root user
  try{
    await db.signin({
      NS:'test',
      DB:'test',
      SC:'allusers',
      email: 'test',
      pass: 'test',
    });
    await db.use('test', 'test');
    //console.log(db)

    let result = await db.query('SELECT * from user;');
    console.log(result)
  }catch(e){
    console.log(e.message)
  }
  //await db.close();
}

async function querySignUp(){
  db = new SurrealDB('http://127.0.0.1:8000/rpc');
  await db.wait();
  // Signin as a namespace, database, or root user
  try{
    await db.signup({
      NS:'test',
      DB:'test',
      SC:'allusers',
      email: 'test',
      pass: 'test',
    });
    await db.use('test', 'test');
    //console.log(db)
    //let result = await db.query('SELECT * from user;');
    //console.log(result)
  }catch(e){
    console.log(e.message)
  }
  //await db.close();
}

async function queryTokenUser(){
  try{
    let result = await db.query('SELECT * from user;');
    console.log(result)
    console.log(result[0].result)

  }catch(e){
    console.log(e.message)
  }
  //await db.close();
}

(async()=>{
  //note need to set up DEFINE table user and scope sign in/up
  //await queryUser();
  
  //await querySignUp();
  //await querySignIn();
  //await queryTokenUser();

  await db.close();
})();