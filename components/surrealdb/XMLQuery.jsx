/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

import { createEffect, createSignal } from 'solid-js'

export default function XMLQuery() {

  // https://stackoverflow.com/questions/9713058/send-post-data-using-xmlhttprequest
  const [token, setToken] = createSignal('');

  function xmlSignUp(){
    let query = "SELECT * FROM user;"
    const xmlhttp = new XMLHttpRequest();
    const url='http://localhost:8000/signup';
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    //xmlhttp.setRequestHeader('NS', 'test');
    //xmlhttp.setRequestHeader('DB', 'test');
    //xmlhttp.setRequestHeader("Authorization", 'Basic ' + btoa('root'+':'+'root'));
    xmlhttp.onreadystatechange = function() {//Call a function when the state changes.
      console.log(xmlhttp.status)
      if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        //alert(xmlhttp.responseText);
        console.log(xmlhttp.responseText);
        setToken(xmlhttp.responseText)
      }
    }
    xmlhttp.send(JSON.stringify({
      NS:'test',
      DB:'test',
      SC:'allusers',
      email:'test@test.test',
      pass:'pass'
    }))
  }

  function xmlSignIn(){
    let query = "SELECT * FROM user;"
    const xmlhttp = new XMLHttpRequest();
    const url='http://localhost:8000/signin';
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    //xmlhttp.setRequestHeader('NS', 'test');
    //xmlhttp.setRequestHeader('DB', 'test');
    //xmlhttp.setRequestHeader("Authorization", 'Basic ' + btoa('root'+':'+'root'));
    xmlhttp.onreadystatechange = function() {//Call a function when the state changes.
      console.log(xmlhttp.status)
      if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        //alert(xmlhttp.responseText);
        console.log(xmlhttp.responseText);
        setToken(xmlhttp.responseText)
      }
    }
    xmlhttp.send(JSON.stringify({
      NS:'test',
      DB:'test',
      SC:'allusers',
      email:'test@test.test',
      pass:'pass'
    }))
  }

  function xmlQueryTest(){
    let query = "SELECT * FROM user;"
    const xmlhttp = new XMLHttpRequest();
    const url='http://localhost:8000/sql';
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.setRequestHeader('NS', 'test');
    xmlhttp.setRequestHeader('DB', 'test');
    xmlhttp.setRequestHeader("Authorization", 'Basic ' + btoa('root'+':'+'root'));
    xmlhttp.onreadystatechange = function() {//Call a function when the state changes.
      console.log(xmlhttp.status)
      if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        //alert(xmlhttp.responseText);
        //console.log(xmlhttp.responseText);
        console.log(JSON.stringify(JSON.parse(xmlhttp.responseText),null,2))
      }
    }
    xmlhttp.send(query)
  }

  return (<>
    <div>
      <button onClick={xmlQueryTest}>xml Query User </button>
      <button onClick={xmlSignUp}> xml SignUp </button>
      <button onClick={xmlSignIn}> xml SignIn </button>
    </div>
  </>)
}