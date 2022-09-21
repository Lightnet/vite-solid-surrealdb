/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

import e from "cors";
import { createSignal } from "solid-js"
import { useAuth } from "../auth/AuthProvider";

export default function ChangeAlias(){

  const [alias, setAlias] = createSignal('stest');

  const [,{token, clientDB}] = useAuth();
  const SurealDB = clientDB();

  async function getInfo(){
    if(token()){
    let jwt = token().split(".")
    console.log(atob(jwt[1]))
    let dataToken = JSON.parse(atob(jwt[1]))
    console.log(dataToken)

    //let userid = dataToken.id.split(":")[1];
    console.log("dataToken.id")
    console.log(dataToken.id)

    let data = await SurealDB.query(`SELECT * FROM ${dataToken.id}`)
    console.log(data[0].result)
    }
  }

  async function changeAlias(){
    console.log(alias())
    let jwt = token().split(".")
    console.log(atob(jwt[1]))
    let dataToken = JSON.parse(atob(jwt[1]))
    console.log(dataToken)

    //let userid = dataToken.id.split(":")[1];
    console.log("dataToken.id")
    console.log(dataToken.id)

    let data = await SurealDB.query(`UPDATE ${dataToken.id} SET alias = '${alias()}';`)
    console.log(data[0].result)
  }

  getInfo();

  function postAPI(){
    fetch('http://localhost:3000/api/user',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({test:'text'})
    })
  }

  return (<>
  <label></label>
  <input value={alias()}  onInput={(e)=>{setAlias(e.target.value)}}/>
  <button onClick={changeAlias}> Change </button>
  <button onClick={postAPI}> postAPI </button>
  </>)
}