/*
  Project Name: vite-solid-surreal
  License: MIT
  Created by: Lightnet
*/

import { Link, useNavigate } from '@solidjs/router'
import { createEffect, createSignal } from 'solid-js'
import { useAuth } from './AuthProvider'

export default function SignIn() {

  const [alias, setAlias] = createSignal('')
  //const [passphrase, setPassphrase] = createSignal('')
  //const [email, setEmail] = createSignal('')

  const [,{setToken}] = useAuth();

  const navigate = useNavigate();

  const btnSignOut = async (e)=>{
    try{
      setToken(null)
      navigate("/", { replace: true })
    }catch(e){
      console.log(e)
    }
  }

  const btnCancel = (e)=>{
    navigate("/", { replace: true })
  }

  return (
    <div>
      <label>Sign Out</label><br/>
      <label> Alias: </label><label>{alias()}</label><br/>
      <button onClick={btnCancel}> Cancel </button>
      <button onClick={btnSignOut}> Sign Out </button>
      
    </div>
  )
}