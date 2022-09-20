/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/


import { Link, useNavigate } from '@solidjs/router'
import { createEffect, createSignal } from 'solid-js'

export default function RootQuery() {
  const [nameSpace, setNameSpace] = createSignal('test')
  const [dataBase, setDataBase] = createSignal('test')
  const [scope, seStcope] = createSignal('allusers')
  const [alias, setAlias] = createSignal('test')
  const [passphrase, setPassphrase] = createSignal('pass')
  const [email, setEmail] = createSignal('test@test.test')

  const [textQuery, setTextQuery] = createSignal('test@test.test')


  const btnSignUp = async (e)=>{

  }

  const btnLogin = async (e)=>{

  }

  async function clickQuery(){

  }

  async function  clickCreate(){
    //await db.use('test','test')
    //let result;
    //result = await db.query(`CREATE message SET content = "hello world!"`);
    //console.log(result)
  }
  // <label> Alias: </label><input value={alias()} onInput={(e)=>setAlias(e.target.value)}/><br/>
  return (
    <div>
      <label>Root SurrealQL</label><br/>
      <label> Name Space: </label><input value={nameSpace()} onInput={(e)=>setNameSpace(e.target.value)}/><br/>
      <label> Database: </label><input value={dataBase()} onInput={(e)=>setDataBase(e.target.value)}/><br/>
      <label> Scope: </label><input value={scope()} onInput={(e)=>seStcope(e.target.value)}/><br/>
      
      <label> E-Mail: </label><input value={email()} onInput={(e)=>setEmail(e.target.value)}/><br/>
      <label> Passphrase: </label><input value={passphrase()} onInput={(e)=>setPassphrase(e.target.value)} /><br/>

      <textarea value={textQuery()} onInput={(e)=>setTextQuery(e.target.value)}></textarea>
      <button onClick={btnSignUp}> Sign Up </button>
      <button onClick={btnLogin}> Login </button>
      <button onClick={clickQuery}> clickQuery </button>
      <button onClick={clickCreate}> clickCreate </button>
    </div>
  )
}