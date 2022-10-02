
/*
  outdate...
  This is http request rest api test.
*/

//import { createJWT, verifyToken } from "./libs/serverapi.js";
import nodefetch from 'node-fetch';
import crypto from 'crypto';

/*
const payload = { "username": "user1",id:'test', "exp": 1547974082 };
var buf = Buffer.from(JSON.stringify(payload)).toString('base64url');
console.log(buf)
console.log(Buffer.from(buf,'base64url').toString('ascii'))
let decode= JSON.parse(Buffer.from(buf,'base64url').toString('ascii'));
console.log(decode)

let secret = 'test'
const token = createJWT(payload,secret);
console.log(token);
const user = verifyToken(token, secret);
console.log("USER DATA")
console.log(user)
*/

function textToBase64(_data){
  //note this is nodejs not browser support
	return Buffer.from(_data).toString('base64');
}

function base64ToText(_data){
  //note this is nodejs not browser support
	return Buffer.from(_data,'base64url').toString('ascii')
}

function parseUserID(_Token){//get table user:id
  let userStr = _Token.split(".")[1]
  return JSON.parse(base64ToText(userStr)).ID;
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

async function tokenQuerySQL(token, query){
  let response = await nodefetch(`http://localhost:8000/sql`, {
    method: 'POST',
    headers:{
      //'Content-Type': 'application/json',
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

async function rootQueryInfo(){
  let data;
  let query;
  
  query = `INFO FOR DB;`
  data = await fetchQuerySQL(query)
  console.log(data)  
}

async function rootQueryUsers(){
  let data;
  let query;
  
  query = `SELECT * FROM user;`
  data = await fetchQuerySQL(query)
  console.log(data)  
}

async function setupUser(){
  let data;
  let query;
  query = 
`DEFINE TABLE user SCHEMALESS;
DEFINE INDEX idx_email ON user COLUMNS email UNIQUE;
`;
//set up table user
//define email field if UNIQUE id
data = await fetchQuerySQL(query)
console.log(data)

query = `
DEFINE SCOPE allusers
	SESSION 14d
	SIGNUP ( CREATE user SET email = $email, pass = crypto::argon2::generate($pass) )
	SIGNIN ( SELECT * FROM user WHERE email = $email AND crypto::argon2::compare(pass, $pass) )
`;
data = await fetchQuerySQL(query)
console.log(data)
}

async function setupMessage(){
  let query = `DEFINE TABLE message SCHEMALESS;`;//set up table without permission for testing. Else error no table.
  let data = await fetchQuerySQL(query)
  console.log(data)
}

async function getMessages(jwt){
  let query = `SELECT * FROM message;`;
  let data = await tokenQuerySQL(jwt, query)
  console.log(data[0].result)
}

async function postMessage(jwt){
  const _text = "hello " + crypto.randomUUID();
  let query = `CREATE message SET content="message test ${_text}";`;
  let data = await tokenQuerySQL(jwt, query)
  console.log(data)
}

async function postMessageByUserID(jwt){
  let userID = parseUserID(jwt)
  const _text = "hello " + crypto.randomUUID();
  let query = `CREATE message SET content="message test ${_text}", user = "${userID}";`;
  let data = await tokenQuerySQL(jwt, query)
  console.log(data)
}

async function queryDelete(jwt,_data){//delete table:id
  let query = `DELETE "${_data}";`
  let data = await tokenQuerySQL(jwt, query)
  console.log(data)
}

async function mainPoint(){
  let data;
  let query;
  let token;
  //await rootQueryInfo()
  //await rootQueryUsers();
  await setupUser();
  await setupMessage()

//data = await signUp({email:'test4',pass:'test'})//return json
//data = await signIn({email:'test3',pass:'test'});//return json

//data = await signUp();//return json
//data = await signIn();//return json
//console.log(data);
//if(data?.details != null && data?.details=='Authentication succeeded'){
  //token = data.token
  //console.log(token)
//}else{
  //console.log("ERROR!!!")
  //throw new Error('Fail Auth!');
//}
//get messages
//await getMessages(token);
//post message
//await postMessage(token);
//await postMessageByUserID(token);

//delete message table:id
//await queryDelete(token,'message:x8uwwkpnpdl8sy98zi6h')

}

mainPoint();