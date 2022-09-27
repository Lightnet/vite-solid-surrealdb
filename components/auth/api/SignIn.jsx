/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

import { Link, useNavigate } from '@solidjs/router'
import { createEffect, createSignal } from 'solid-js'
import { jwtUser } from '../../../libs/clientapi.js'
import { useAuth } from './AuthProvider.jsx'

export default function SignIn() {

  const [alias, setAlias] = createSignal('test')
  const [passphrase, setPassphrase] = createSignal('pass')
  const [email, setEmail] = createSignal('test@test.test')

  const [,{setToken}] = useAuth();

  const navigate = useNavigate();

  const btnLogin = async (e)=>{
    //console.log(alias())
    //console.log(passphrase())
    try{
      const resp = await fetch('/api/auth/login',{
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          alias:alias(),
          passphrase:passphrase(),
          email:email()
        })
      })
      const data = await resp.json()
      //console.log(data)
      if(data){
        if(data?.api=='TOKEN'){
          setToken(data.token)
          //console.log(jwtUser(data.token))
          navigate("/", { replace: true })
        }
      }
    }catch(e){
      console.log(e)
    }
  }

  const btnSignUp = (e)=>{
    navigate("/signup", { replace: true })
  }

  return (
    <div>
      <label>Sign In</label><br/>
      <label> Alias: </label><input value={alias()} onInput={(e)=>setAlias(e.target.value)}/><br/>
      <label> E-Mail: </label><input value={email()} onInput={(e)=>setEmail(e.target.value)}/><br/>
      <label> Passphrase: </label><input value={passphrase()} onInput={(e)=>setPassphrase(e.target.value)} /><br/>
      <button onClick={btnSignUp}> Sign Up </button>
      <button onClick={btnLogin}> Login </button>
    </div>
  )
}