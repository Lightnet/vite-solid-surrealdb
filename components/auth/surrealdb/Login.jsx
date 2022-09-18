/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

// https://stackoverflow.com/questions/68849233/convert-a-string-to-base64-in-javascript-btoa-and-atob-are-deprecated
// https://surrealdb.com/docs/start
// 
// 
// 

import { Link, useNavigate } from '@solidjs/router'
import { createEffect, createSignal } from 'solid-js'
//import { useAuth } from './AuthProvider'
//import Surreal from 'surrealdb.js'
//import { Buffer } from 'buffer';

export default function Login() {

  const [nameSpace, setNameSpace] = createSignal('test')
  const [dataBase, setDataBase] = createSignal('test')
  const [scope, seStcope] = createSignal('allusers')
  const [alias, setAlias] = createSignal('test')
  const [passphrase, setPassphrase] = createSignal('pass')
  const [email, setEmail] = createSignal('pass')

  //const [,{setToken}] = useAuth();
  //console.log(Buffer)

  const navigate = useNavigate();

  function textToBase64(params){
    return btoa(params);//note it think of nodejs in vscode IDE, this is brower api
  }

  const btnLogin = async (e)=>{
    console.log(alias())
    console.log(passphrase())
    try{

      let query = "CREATE user;"
      query="INFO FOR DB;"

      const response = await fetch('http://localhost:8000/sql',{
        method:'POST',
        headers:{
          "Authorization": 'Basic ' + textToBase64('root'+':'+'root') ,
          "NS": "test",
          "DB": "test",
          "Content-Type":"application/json"
        },
        body:query
      })

      console.log(response)
      let data = await response.json();
      console.log(data)

      /*
      const db = new Surreal('http://127.0.0.1:8000/rpc');

      // Signin to a scope from the browser
      await db.signin({
        NS: 'test',
        DB: 'test',
        SC: 'user',//scope 
        user: alias() +'@surrealdb.test',
        pass: passphrase(),
      });

      // Select a specific namespace / database
		  await db.use('test', 'test');
      */
      
    }catch(e){
      console.log(e)
    }
  }

  const btnSignUp = (e)=>{
    navigate("/signup", { replace: true })
  }

  return (
    <div>
      <label>Surreal Sign In</label><br/>
      <label> Name Space: </label><input value={nameSpace()} onInput={(e)=>setNameSpace(e.target.value)}/><br/>
      <label> Database: </label><input value={dataBase()} onInput={(e)=>setDataBase(e.target.value)}/><br/>
      <label> Scope: </label><input value={scope()} onInput={(e)=>seStcope(e.target.value)}/><br/>
      <label> Alias: </label><input value={alias()} onInput={(e)=>setAlias(e.target.value)}/><br/>
      <label> E-Mail: </label><input value={email()} onInput={(e)=>setEmail(e.target.value)}/><br/>
      <label> Passphrase: </label><input value={passphrase()} onInput={(e)=>setPassphrase(e.target.value)} /><br/>
      <button onClick={btnSignUp}> Sign Up </button>
      <button onClick={btnLogin}> Login </button>
    </div>
  )
}