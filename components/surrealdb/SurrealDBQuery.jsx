/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/
//note need to set up DEFINE table user and scope sign in/up

import { createEffect, createSignal, onCleanup } from 'solid-js'
import SurrealDB from 'surrealdb.js';

export default function SurrealDBQuery() {

  const [token, setToken] = createSignal('');
  let db;

  async function SurrealDBQueryUser(){
    const sdb = new SurrealDB('http://127.0.0.1:8000/rpc');
    await sdb.wait();
    // Signin as a namespace, database, or root user
    try{
      await sdb.signin({
        NS:'test',
        DB:'test',
        SC:'allusers',
        email: 'root',
        pass: 'root',
      });
      await sdb.use('test', 'test');
      //console.log(db)

      let result = await sdb.query('SELECT * from user;');
      console.log(result)
    }catch(e){
      console.log(e.message)
    }
    await sdb.close();
  }

  async function SurrealDBSignUp(){
    db = new SurrealDB('http://127.0.0.1:8000/rpc');
    await db.wait();
    // Signin as a namespace, database, or root user
    try{
      await db.signup({
        NS:'test',
        DB:'test',
        SC:'allusers',
        email: 'root',
        pass: 'root',
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

  async function SurrealDBSignIn(){
    db = new SurrealDB('http://127.0.0.1:8000/rpc');
    await db.wait();
    // Signin as a namespace, database, or root user
    try{
      await db.signin({
        NS:'test',
        DB:'test',
        SC:'allusers',
        email: 'root',
        pass: 'root',
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

  async function SurrealDBTokenQuery(){
    try{
      let result = await db.query('SELECT * from user;');
      console.log(result)
      console.log(result[0].result)
  
    }catch(e){
      console.log(e.message)
    }
    //await db.close();
  }

  async function SDBAccessGetPost(){
    try{
      let result = await db.query(`SELECT * FROM post;`);
      console.log(result)
      console.log(result[0].result)
  
    }catch(e){
      console.log(e.message)
    }
    //await db.close();
  }

  async function SDBAccessCreatePost(){
    try{
      let id =  crypto.randomUUID()
      console.log(id)
      let result = await db.query(`CREATE post SET content="hello ${id}}";`);
      console.log(result)
      console.log(result[0].result)
  
    }catch(e){
      console.log(e.message)
    }
    //await db.close();
  }

  onCleanup(async ()=>{
    if(db){
      await db.close();
    }
  })

  return (<>
    <div>
      <button onClick={SurrealDBQueryUser}>SurrealDB Query User </button>
      <button onClick={SurrealDBSignUp}> SurrealDB SignUp </button>
      <button onClick={SurrealDBSignIn}> SurrealDB SignIn </button>
      <button onClick={SurrealDBTokenQuery}> SurrealDB Token Query User </button>
      <button onClick={SDBAccessGetPost}> SurrealDB Token Query get Post </button>
      <button onClick={SDBAccessCreatePost}> SurrealDB Token Query Create Post </button>
    </div>
  </>)
}