/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

import { createEffect, createSignal } from 'solid-js'
import axios from 'axios';

export default function AxiosQuery() {

  const [token, setToken] = createSignal('');

  function AxiosQueryUser(){
    let query = "SELECT * FROM user;"
    //console.log(btoa('root'+':'+'root'))
    //delete axios.defaults.headers.common["Accept"];//might need this ???
    //axios.defaults.headers.post['Content-Type'] = 'application/json';
    //axios.defaults.headers.common['Authorization'] = 'Basic ' + btoa('root'+':'+'root');

    axios.post('http://localhost:8000/sql', query, {
      headers: {
        'Accept': 'application/json',
        'NS':'test',
        'DB':'test',
        'Authorization': 'Basic ' + btoa('root'+':'+'root')
      },
      transformRequest: [function (data, headers) {//this is need else error 400
        // Do whatever you want to transform the data
        //console.log(data)
        return data;
      }],
    }).then(data=>{
      console.log(data)
    }).catch(err=>{
      console.log(err)
      console.log(err.code)
      console.log(err.message)
    })
  }

  function AxiosSignUp(){
    axios.post('http://localhost:8000/signup', {
      NS:'test',
      DB:'test',
      SC:'allusers',
      email:'test@test.test',
      pass:'pass'
    }, {
      headers: {
        'Accept': 'application/json'
      },
      //transformRequest: [function (data, headers) {// not needed for signup
        // Do whatever you want to transform the data
        //console.log(data)
        //return data;
      //}],
    }).then(data=>{
      console.log(data)
      if(data?.data?.token != null){
        console.log("token found!")
        setToken(data.data.token)
      }
    }).catch(err=>{
      console.log(err)
      console.log(err.code)
      console.log(err.message)
    })
  }

  function AxiosSignIn(){
    axios.post('http://localhost:8000/signin', {
      NS:'test',
      DB:'test',
      SC:'allusers',
      email:'test@test.test',
      pass:'pass'
    }, {
      headers: {
        'Accept': 'application/json'
      },
      //transformRequest: [function (data, headers) {// not needed for signin
        // Do whatever you want to transform the data
        //console.log(data)
        //return data;
      //}],
    }).then(data=>{
      console.log(data)
      if(data?.data?.token != null){
        console.log("token found!")
        setToken(data.data.token)
      }
      
    }).catch(err=>{
      console.log(err)
      console.log(err.code)
      console.log(err.message)
    })
  }

  function AxiosTokenQuery(){
    let query = "SELECT * FROM user;"
    axios.post('http://localhost:8000/sql', query, {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token()
      },
      transformRequest: [function (data, headers) {//need to query sql
        // Do whatever you want to transform the data
        //console.log(data)
        return data;
      }],
    }).then(data=>{
      console.log(data)
    }).catch(err=>{
      console.log(err)
      console.log(err.code)
      console.log(err.message)
    })
  }

  return (<>
    <div>
      <button onClick={AxiosQueryUser}>Axios Query User </button>
      <button onClick={AxiosSignUp}> Axios SignUp </button>
      <button onClick={AxiosSignIn}> Axios SignIn </button>
      <button onClick={AxiosTokenQuery}> Axios Token Query </button>
    </div>
  </>)
}