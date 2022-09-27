/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

// https://github.com/jareer12/surrealdb/blob/main/src/index.ts
// https://stackoverflow.com/questions/51506579/sending-authorization-token-bearer-through-javascript
// https://stackoverflow.com/questions/246801/how-can-you-encode-a-string-to-base64-in-javascript
// https://websparrow.org/web/javascript-base64-and-url-encoding-decoding-example

//const nodefetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
//import nodefetch from 'cross-fetch';
//import * as axios from 'axios';
import axios from 'https://cdn.skypack.dev/axios';

function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
      return String.fromCharCode('0x' + p1);
  }));
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

// Define the string
class SurrealDB{

  constructor(url, options) {
    this.url = url
    this.options = options
    this.token = null;
    //this.init();
  }

  init(){
    console.log("result...");
    //let result = this.getToken();
    //console.log("result");
    //console.log(result);
  }

  async signIn(){
    console.log(this.url)
    /*
    axios({
      url: 'http://127.0.0.1:8000/signin',
      method: 'POST',
      mode:'no-cors',
      headers:{
        'NS': 'test', // Specify the namespace
        'DB': 'test', // Specify the database
        'SC':'allusers'
      },
      data: {
        NS:'test',
        DB:'test',
        SC:'allusers',
        email:'test@test.test',
        pass:"pass"
      }
    }).then(function (response) {
      console.log(response.data)
    }).catch(err=>{
      console.log(err)
    });
    */

    
    try{
      let response = await fetch(`http://localhost:8000/signin`, {
        method: 'POST',
        mode: 'no-cors', //dev testing...
        //credentials: 'omit',
        headers:{
          //'Access-Control-Allow-Origin': '*',
          //"User-Agent": "Thunder Client (https://www.thunderclient.com)",
          //'Access-Control-Request-Headers':'Content-Type, Authorization',
          //'Access-Control-Allow-Origin':'http://localhost:3000',
          //'Authorization':'Basic' + b64EncodeUnicode('test@test.test:pass'),
          //'Access-Control-Allow-Credentials': 'true',
          'Content-Type': 'application/json',
          
          'NS': 'test', // Specify the namespace
          'DB': 'test', // Specify the database
          'SC':'allusers'
        },
        body: JSON.stringify({
          NS:'test',
          DB:'test',
          SC:'allusers',
          //email:'root',
          email:'test@test.test',
          pass:"pass"
        }),
      })
      console.log(response)
      let data = await response.text();

      console.log("data");
      console.log(data);

    }catch(e){
      console.log(e)
    }
  
    /*
    return new Promise((res, rej) => {
      fetch(`${this.url}/rpc`, {
        method: 'POST',
        headers: this.createLoginHeaders(),
        body: query,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("DATA?")
          res(data)
        })
        .catch((err) => {
          rej(err)
        })
    })
    */
  }

  async signUp(){
    console.log("CALL SIGN UP")
    console.log(`${this.url}/signup`)
    try{
      let response = await fetch(`http://localhost:8000/signup`, {
        method: 'POST',
        mode: 'no-cors',
        //credentials:"omit",
        headers: {
          'Access-Control-Request-Headers':'Content-Type, Authorization',
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Content-Type': 'application/json',
          'NS': 'test', // Specify the namespace
          'DB': 'test', // Specify the database
          'SC': 'allusers' // Specify the scope
        },
        body: JSON.stringify({
          NS: 'test',
          DB: 'test',
          SC:'allusers',
          email: 'test@test.test',
          pass: 'pass'
        }),
      })
      console.log("jwt")
      console.log(response)
    }catch(e){
      console.log(e)
    }





    /*
    fetch(`${this.url}/signup`, {
	    method: 'POST',
      mode: 'no-cors',
      //credentials:"omit",
	    headers: {
        //'Access-Control-Allow-Origin':'*',
		    'Content-Type': 'application/json',
		    'NS': 'test', // Specify the namespace
		    'DB': 'test', // Specify the database
        'SC': 'allusers' // Specify the scope
      },
      body: JSON.stringify({
        NS: 'test',
        DB: 'test',
        SC:'allusers',
        email: 'test@test.test',
        pass: 'test'
      }),
    })
    .then(response  => response.text())
    .then( data => {
      console.log("DATA?",data)
      //res(data)
    })
    .catch( err => {
      console.log("err?",err)
      //rej(err)
    })
    */
  }
  
  basicAuth(){
    return `Basic ${b64EncodeUnicode(
      `${this.options.user}:${this.options.pass}`,
    )}`
  }

  createLoginHeaders(){
    return {
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'application/json',
      NS: this.options.NS,
      DB: this.options.DB,
      SC:"allusers"
    }
  }
  
  createHeaders(){
    console.log(this.basicAuth())
    return {
      'Content-Type': 'application/json',
      Authorization: this.basicAuth(),
      NS: this.options.NS,
      DB: this.options.DB,
    }
  }

  Query(){

  }
}

export default SurrealDB;