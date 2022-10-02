/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

import { createEffect, createSignal } from 'solid-js'

export default function FetchQuery() {

  const [token, setToken] = createSignal('')

  async function fetchRootUsers(){
    let query = "SELECT * FROM user;"
    let response = await fetch(`http://localhost:8000/sql`, {
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'NS': 'test', // Specify the namespace
        'DB': 'test', // Specify the database
        "Authorization": 'Basic ' + btoa('root'+':'+'root')
      },
      body: query
    })
    let data = await response.json();
    console.log(data);
  }

  async function fetchSignIn(){
    let response = await fetch(`http://localhost:8000/signin`, {
      method: 'POST',
      headers:{
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        NS:'test',
        DB:'test',
        SC:'allusers',
        email:'test@test.test',
        pass:'pass'
      })
    })
    let data = await response.json();
    console.log(data);
    if(data?.token){
      setToken(data.token)
    }
  }

  async function fetchSignUp(){
    let response = await fetch(`http://localhost:8000/signup`, {
      method: 'POST',
      headers:{
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        NS:'test',
        DB:'test',
        SC:'allusers',
        email:'test@test.test',
        pass:'pass'
      })
    })
    let data = await response.json();
    console.log(data);
    if(data?.token){
      setToken(data.token)
    }
  }

  async function fetchTokenQuery(){
    let query = `SELECT * FROM user;`;
    let response = await fetch(`http://localhost:8000/sql`, {
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token()
      },
      body: query
    })
    let data = await response.json();
    console.log(data);
    if(data?.token){
      setToken(data.token)
    }
  }
  
  return (<>
    <div>
      <button onClick={fetchRootUsers}> Fetch Query User </button>
      <button onClick={fetchSignUp}> Fetch Sign Up </button>
      <button onClick={fetchSignIn}> Fetch Sign In </button>
      <button onClick={fetchTokenQuery}> Fetch Token User </button>
    </div>
  </>)
}