/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

import { createSignal } from "solid-js"
import { useAuth } from "../../auth/api/AuthProvider";

export default function ChangeAlias(){

  const [alias, setAlias] = createSignal('stest');

  const [,{user,isLogin}] = useAuth();

  async function getInfo(){
    if(isLogin()){
      setAlias(user())
    }
  }

  async function changeAlias(){
    console.log(alias())
  }

  getInfo();

  function postAPI(){
    /*
    fetch('http://localhost:3000/api/user',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({test:'text'})
    })
    */
  }

  return (<>
  <label>Alias:</label>
  <input value={alias()}  onInput={(e)=>{setAlias(e.target.value)}}/>
  <button onClick={changeAlias}> Change </button>
  <button onClick={postAPI}> postAPI </button>
  </>)
}