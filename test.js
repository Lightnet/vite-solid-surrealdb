
/*
  This is http request rest api test.
*/

//import { createJWT, verifyToken } from "./libs/serverapi.js";
import nodefetch from 'node-fetch';

function textToBase64(params){
	return Buffer.from(params).toString('base64');//note this is nodejs not broswer support
}

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

async function signIn(options){
  let response = await nodefetch(`http://localhost:8000/signin`, {
    method: 'POST',
    //mode: 'no-cors', //dev testing...
    //credentials: 'omit',
    headers:{
      //"Accept": "*/*",
      //'Access-Control-Allow-Origin': '*',
      //"User-Agent": "Thunder Client (https://www.thunderclient.com)",
      //'Access-Control-Allow-Origin':'http://localhost:3000',
      //'Access-Control-Allow-Credentials': 'false',
      'Content-Type': 'application/json',
      //'NS': 'test', // Specify the namespace
      //'DB': 'test', // Specify the database
      //'SC':'allusers'
    },
    body: JSON.stringify({
      NS:'test',
      DB:'test',
      SC:'allusers',
      email:options.email ||'test@test.test',
      pass: options.pass || "pass"
    }),
  })

  let data = await response.text();
  //console.log(data);
  return data;
}

async function signUp(options){
  let response = await nodefetch(`http://localhost:8000/signup`, {
    method: 'POST',
    //mode: 'no-cors', //dev testing...
    //credentials: 'omit',
    headers:{
      //"Accept": "*/*",
      //'Access-Control-Allow-Origin': '*',
      //"User-Agent": "Thunder Client (https://www.thunderclient.com)",
      //'Access-Control-Allow-Origin':'http://localhost:3000',
      //'Access-Control-Allow-Credentials': 'false',
      'Content-Type': 'application/json',
      //'NS': 'test', // Specify the namespace
      //'DB': 'test', // Specify the database
      //'SC':'allusers'
    },
    body: JSON.stringify({
      NS:'test',
      DB:'test',
      SC:'allusers',
      email: options.email || 'test@test.test',
      pass: options.pass || "pass"
    }),
  })

  let data = await response.text();
  //console.log(data);
  return data;
}

async function queryUsers(){
  let query = `SELECT * FROM user;`;

  let response = await nodefetch(`http://localhost:8000/sql`, {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
      'NS': 'test', // Specify the namespace
      'DB': 'test', // Specify the database
      "Authorization": 'Basic ' + textToBase64('root'+':'+'root') ,
    },
    body: query,
  })

  let data = await response.text();
  console.log(data);
}

async function fetchQuerySQL(query){
  let response = await nodefetch(`http://localhost:8000/sql`, {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
      'NS': 'test', // Specify the namespace
      'DB': 'test', // Specify the database
      "Authorization": 'Basic ' + textToBase64('root'+':'+'root') ,
    },
    body: query,
  })

  let data = await response.json();
  //console.log(data);
  return data;
}

async function tokenQuerySQL(token, query){
  let response = await nodefetch(`http://localhost:8000/sql`, {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
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

async function mainPoint(){
//let result;
let data;
let query;
query = `DEFINE TABLE user SCHEMALESS;DEFINE INDEX idx_email ON user COLUMNS email UNIQUE;`;
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

query = `DEFINE TABLE message SCHEMALESS;`;//set up table without permission for testing. Else error no table.
data = await fetchQuerySQL(query)
//console.log(data)

query = `INFO FOR DB;`
data = await fetchQuerySQL(query)
//console.log(data)

//let signToken = await signUp({
  //email:'test4',
  //pass:'test'
//})
//console.log(signToken)


let token = await signIn({
  //email:'test3',
  //pass:'test'
});
console.log("//=== token ===//")
console.log(token)
console.log("//=== token ===//")

//query = `INFO FOR DB;` //not allow for users register testing.
//data = await tokenQuerySQL(token, query)
//console.log(data)

//query = `CREATE message SET content="message test";`
//data = await tokenQuerySQL(token, query)
//console.log(data)

query = `SELECT * FROM message;`
data = await tokenQuerySQL(token, query)
console.log("MESSAGE")
console.log(data)

if(data[0].result){
  console.log(data[0].result);
}

}

mainPoint();