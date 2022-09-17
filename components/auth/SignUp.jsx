/*
  Project Name: vite-solid-surreal
  License: MIT
  Created by: Lightnet
*/

import { Link, useNavigate } from '@solidjs/router'
import { createEffect, createSignal } from 'solid-js'

export default function SignUp() {

  const [alias, setAlias] = createSignal('test')
  const [passphrase, setPassphrase] = createSignal('pass')
  const [email, setEmail] = createSignal('')

  const navigate = useNavigate();

  const btnCancel = (e)=>{
    navigate("/", { replace: true })
  }

  const btnSignUp = async (e)=>{
    console.log(alias())
    console.log(passphrase())
    const resp = await fetch('/api/auth/signup',{
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
  }

  return (
    <div>
      <label>Sign Up</label><br/>
      <label> Alias: </label><input value={alias()} onInput={(e)=>setAlias(e.target.value)}/><br/>
      <label> Passphrase: </label><input value={passphrase()} onInput={(e)=>setPassphrase(e.target.value)} /><br/>
      <button onClick={btnSignUp}> Sign Up </button>
      <button onClick={btnCancel}> Cancel </button>
    </div>
  )
}