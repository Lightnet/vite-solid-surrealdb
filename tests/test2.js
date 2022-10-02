
/*
  This is http request rest api test.
  For server nodejs testing. 
  After retesting fetch api and XMLHttpRequest works.
  http rest api client browser ext does work.
*/
// https://stackoverflow.com/questions/4810841/pretty-print-json-using-javascript

import nodefetch from 'node-fetch';
import crypto from 'crypto';

function textToBase64(_data){
  //note this is nodejs not browser support
	return Buffer.from(_data).toString('base64');
}

function base64ToText(_data){
  //note this is nodejs not browser support
	return Buffer.from(_data,'base64url').toString('ascii')
}

async function signIn(options){
  if(!options){
    options={};
  }
  let response = await nodefetch(`http://localhost:8000/signin`, {
    method: 'POST',
    //mode: 'no-cors', //dev testing...
    //credentials: 'omit',
    headers:{
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      NS:'test',
      DB:'test',
      SC:'allusers',
      email: options.email ||'test@test.test',
      pass: options.pass || "pass"
    }),
  })

  let data = await response.json();
  //console.log(data);
  return data;
}

async function signUp(options){
  if(!options){
    options={}
  }
  let response = await nodefetch(`http://localhost:8000/signup`, {
    method: 'POST',
    //mode: 'no-cors', //dev testing...
    //credentials: 'omit',
    headers:{
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      NS:'test',
      DB:'test',
      SC:'allusers',
      email: options?.email || 'test@test.test',
      pass: options?.pass || "pass"
    }),
  })

  let data = await response.json();
  //console.log(data);
  return data;
}

async function fetchQuerySQL(query){
  let response = await nodefetch(`http://localhost:8000/sql`, {
    method: 'POST',
    headers:{
      'Accept': 'application/json',
      'NS': 'test', // Specify the namespace
      'DB': 'test', // Specify the database
      "Authorization": 'Basic ' + textToBase64('root'+':'+'root') ,
    },
    body: query,
  })
  //console.log(response)
  let data = await response.json();
  //console.log(data);
  return data;
}

async function tokenQuerySQL(token, query){
  let response = await nodefetch(`http://localhost:8000/sql`, {
    method: 'POST',
    headers:{
      'Accept': 'application/json',
      'NS': 'test', // Specify the namespace
      'DB': 'test', // Specify the database
      "Authorization": 'Bearer ' + token ,
    },
    body: query,
  })

  let data = await response.json();
  //console.log(data);
  return data;
}

function parseUserID(_Token){
  //console.log(_Token)
  let userStr = _Token.split(".")[1]
  return JSON.parse(base64ToText(userStr)).ID;
}

async function queryDB(){
  let data;
  let query;
  query = `INFO FOR DB;`
  data = await fetchQuerySQL(query)
  //console.log(data)
  console.log("SCOPE:")
  console.log(data[0].result.sc)
  console.log("DATABASE:")
  console.log(data[0].result.tb)
}

async function setupUser(){
let data;
let query;
query = 
`DEFINE TABLE user SCHEMALESS;
DEFINE INDEX idx_email ON user COLUMNS email UNIQUE;
DEFINE FIELD update ON TABLE user TYPE datetime VALUE $before OR time::now();
DEFINE FIELD created ON TABLE user TYPE datetime VALUE time::now();
`;
//query = `SELECT * FROM user;`
data = await fetchQuerySQL(query)
//console.log(data)

query = `
DEFINE SCOPE allusers
	SESSION 14d
	SIGNUP ( CREATE user SET email = $email, pass = crypto::argon2::generate($pass) )
	SIGNIN ( SELECT * FROM user WHERE email = $email AND crypto::argon2::compare(pass, $pass) )
`;
data = await fetchQuerySQL(query)
//console.log(data)

}

async function setupToDoList(){
  let data;
  let query;

//query = `DEFINE TABLE todolist SCHEMALESS;`;//set up table without permission for testing. Else error no table.
//data = await fetchQuerySQL(query)
//console.log(data)

query = 
`DEFINE TABLE todolist SCHEMALESS
  PERMISSIONS
    FOR select WHERE user = $auth.id,
    FOR create, update
      WHERE user = $auth.id,
    FOR delete
      WHERE user = $auth.id;
`;
data = await fetchQuerySQL(query)
console.log(data)

query = `
DEFINE FIELD update ON TABLE todolist TYPE datetime VALUE $before OR time::now();
DEFINE FIELD created ON TABLE todolist TYPE datetime VALUE time::now();
`;
data = await fetchQuerySQL(query)
console.log(data)

}

async function getTasks(jwt){
  let query = `SELECT * FROM todolist;`
  let data = await tokenQuerySQL(jwt, query)
  console.log(data)
  //console.log(data[0].result)
}

async function addTask(jwt, _text){
  let userID = parseUserID(jwt)
  console.log(userID)

  let query = `CREATE todolist SET content = "${_text}", user="${userID}";`
  let data = await tokenQuerySQL(jwt, query)
  console.log(data[0].result)
}

async function postTaskTest(jwt){
  let userID = parseUserID(jwt)
  //console.log("userID: ",userID)
  const _text = "hello " + crypto.randomUUID();
  let query = `CREATE todolist SET content = "${_text}", user="${userID}";`
  let data = await tokenQuerySQL(jwt, query)
  console.log(data)
}

// "table:id"
async function queryDeleteID(jwt, id){
  let query = `DELETE "${id}";`
  let data = await tokenQuerySQL(jwt, query)
  console.log(data)
  console.log(data[0].result)
}

async function setupPost(){
  let data;
  let query;
  query = 
`DEFINE TABLE post SCHEMALESS;
`;
data = await fetchQuerySQL(query)
console.log(data)

query = `
DEFINE FIELD update ON TABLE post TYPE datetime VALUE $before OR time::now();
DEFINE FIELD created ON TABLE post TYPE datetime VALUE time::now();
`;
data = await fetchQuerySQL(query)
console.log(data)

}

function jsPretty(_data){
  console.log(JSON.stringify(_data,null,2 ))
}

async function mainPoint(){
  //let result;
  let data;
  let query;
  let token;
  //simple set up
  await setupUser();
  await setupToDoList();
  await queryDB();

  //surrealdb 1.0.0 beta 8 format result is json
  //token = await signUp({email:'test1',pass:'test'})
  //data = await signIn({email:'test1',pass:'test'});
  //console.log(token)

  data = await signUp() // test@test.test , pass
  //data = await signIn(); // test@test.test , pass

  //it has return json as object
  console.log(data)
  if(data?.details != null && data?.details==='Authentication succeeded'){
    token = data.token
    //console.log(token)
  }else{
    throw new Error('Fail Auth!');
  }
  //let userID = parseUserID(token)
  //console.log(userID)

  // TASK LIST
  console.log("task list")
  await getTasks(token);
  //console.log("add list")
  // ADD TASK
  //let idran = crypto.randomUUID()
  //console.log(idran)
  //await addTask(token, "Hello " + idran)
  console.log("POST task")
  await postTaskTest(token)
  // DELETE TASK
  //await queryDeleteID(token, 'todolist:mponzmtgsaxu3ivm6m3q')
  // UPDATE TASK?
}

mainPoint();