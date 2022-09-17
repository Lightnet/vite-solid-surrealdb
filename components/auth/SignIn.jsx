/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

import { Link, useNavigate } from '@solidjs/router'
import { createEffect, createSignal } from 'solid-js'
import { useAuth } from './AuthProvider'

export default function SignIn() {

  const [alias, setAlias] = createSignal('')
  const [passphrase, setPassphrase] = createSignal('')
  const [email, setEmail] = createSignal('')

  const [,{setToken}] = useAuth();

  const navigate = useNavigate();

  const btnLogin = async (e)=>{
    console.log(alias())
    console.log(passphrase())
    try{
      const resp = await fetch('/api/auth/login',{
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          alias:alias(),
          passphrase:passphrase()
        })
      })
      const data = await resp.json()
      console.log(data)
      if(data){
        if(data?.api=='TOKEN'){
          setToken(data.token)
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
      <label> Passphrase: </label><input value={passphrase()} onInput={(e)=>setPassphrase(e.target.value)} /><br/>
      <button onClick={btnSignUp}> Sign Up </button>
      <button onClick={btnLogin}> Login </button>
    </div>
  )
}