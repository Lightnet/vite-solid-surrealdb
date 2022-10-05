/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

import Surreal from 'surrealdb.js';
import nodefetch from 'node-fetch';

/*
surreal start --log debug --user root --pass root memory
./surreal start --log debug --user root --pass root memory
*/

//const db = new Surreal('http://127.0.0.1:8000/rpc');

let db;

function textToBase64(params){
	return Buffer.from(params).toString('base64');//note it think of nodejs in vscode IDE, this is brower api
}

// this is for DEFINE set up as surreal.query() does not work for some reason.
// https://surrealdb.com/docs/integration/libraries/nodejs#query
async function fetchQuerySQL(query){
	// https://surrealdb.com/blog/release-v1-0-0-beta-8
	//Use Accept header instead of Content-Type header for client content negotiation

	let response = await nodefetch('http://localhost:8000/sql',{
		method:'POST',
		headers:{
			"Authorization": 'Basic ' + textToBase64('root'+':'+'root') ,
			"NS": "test",
			"DB": "test",
			"Accept":"application/json"
		},
		body:query
	})
	let data = await response.json();
	return data;
}

async function queryDB(){
	let result;
	let query;

	query = `INFO FOR DB;`;
	result = await fetchQuerySQL(query)
	//console.log(result)
	console.log(result[0].result.sc)
	console.log(result[0].result.tb)
}

async function setupUser(){
	let result;
	let query;
	console.log("USER START")
//SET UP SCHEMA
query = `
DEFINE TABLE user SCHEMALESS
  PERMISSIONS
    FOR select, update WHERE id = $auth.id AND http::post('http://localhost:3000/api/user', { action: $event, data: $this,  authalias: $auth.alias, authid: $auth.id, auth: $auth, scope: $scope, token:$token }) != NONE,
    FOR create, delete NONE;
DEFINE INDEX idx_email ON user COLUMNS email UNIQUE;
DEFINE FIELD created ON TABLE user TYPE datetime VALUE $before OR time::now();
DEFINE FIELD updated ON TABLE user TYPE datetime VALUE time::now();
DEFINE FIELD pass ON TABLE user TYPE string;
DEFINE FIELD email ON TABLE user TYPE string;
DEFINE FIELD alias ON TABLE user TYPE string;
DEFINE FIELD role ON TABLE user TYPE string;
`;
result = await fetchQuerySQL(query)
console.log(result)

// USER CHANGE ALIAS NAME log change
query = `
DEFINE EVENT change_alias ON TABLE user WHEN $before.alias != $after.alias THEN (
	CREATE event SET user = $this, time = time::now(), value = $after.alias, action = 'alias_changed'
);`;
result = await fetchQuerySQL(query)
console.log(result)

//query = `
//DEFINE EVENT fetch_alias ON TABLE user WHEN $event = "UPDATE" AND $after.alias THEN
//	http::post('http://localhost:3000/api/user', { action: $event, data: $this });`;

// LOG EVENT POST
query = `
DEFINE EVENT fetch_alias ON TABLE user WHEN $event = "UPDATE" THEN (
	http::post('http://localhost:3000/api/user', { action: $event, data: $this, auth: $auth, scope: $scope, test:"e" })
);`;
result = await fetchQuerySQL(query)
console.log(result)

// USER ACCESS SCOPE
query = `
DEFINE SCOPE allusers
	SESSION 14d
	SIGNUP ( CREATE user SET email = $email, pass = crypto::argon2::generate($pass), alias = $alias, role = "allusers" )
	SIGNIN ( SELECT * FROM user WHERE email = $email AND crypto::argon2::compare(pass, $pass) );`;
result = await fetchQuerySQL(query)
console.log(result)

//nope it for 
//query = `DEFINE TOKEN my_token ON NAMESPACE TYPE string VALUE $auth.alias;`
//result = await fetchQuerySQL(query)
//console.log("TOKEN:",result)

// ADMIN SCOPE 
//query = `DEFINE FIELD role ON TABLE user
//  PERMISSIONS
//    FOR select FULL,
//    FOR create, update, delete WHERE $scope = 'admin';
//`;
//result = await fetchQuerySQL(query)

// ADMIN SCOPE LOGIN
//query = `DEFINE SCOPE admin SESSION 1h
//SIGNIN ( SELECT * FROM admin WHERE email = $email AND crypto::argon2::compare(pass, $pass) );`;
//result = await fetchQuerySQL(query)
//console.log(result)
//Testing logs
console.log("USER FINISH")

}

async function setupEvent(){
	let result;
	let query;
	query = 
`DEFINE TABLE event SCHEMALESS
  PERMISSIONS
    FOR select, update NONE,
    FOR create, delete NONE;
`;
result = await fetchQuerySQL(query)
console.log(result)
}

async function setupToDoList(){
	let result;
	let query;
	console.log("TODOLIST START")
// SET UP SCHEME 
//need to fix this... ?
query = `
DEFINE TABLE todolist SCHEMALESS
	PERMISSIONS NONE;`;
// WHERE user = $auth.id,
result = await fetchQuerySQL(query)
console.log(result)

query = `
DEFINE FIELD update ON TABLE todolist TYPE datetime VALUE $before OR time::now();
DEFINE FIELD created ON TABLE todolist TYPE datetime VALUE time::now();
DEFINE FIELD content ON TABLE todolist TYPE string;
`;
result = await fetchQuerySQL(query)

//query = `DEFINE FIELD user ON TABLE todolist TYPE string VALUE $value;`;
//result = await fetchQuerySQL(query)
//console.log(result)

//query = `DEFINE EVENT event_tasks ON TABLE todolist WHEN true THEN (
//	http::post('http://localhost:3000/api/user', { action: $event, data: $this})
//);`;
// --DEFINE FIELD user ON TABLE todolist TYPE string;
//result = await fetchQuerySQL(query)
//console.log(result)
console.log("TODOLIST FINISH")
}

async function setupForumAccess(){
	let result;
	let query;

//query = `DEFINE TABLE post SCHEMALESS PERMISSIONS NONE;`;
//query = `DEFINE TABLE post SCHEMALESS;
//	PERMISSIONS
//	FOR select, create, update, delete NONE	
//;`;
query = `DEFINE TABLE forumaccess SCHEMALESS;`;
result = await fetchQuerySQL(query)
console.log(result)

query = `
DEFINE FIELD update ON TABLE forumaccess TYPE datetime VALUE $before OR time::now();
DEFINE FIELD created ON TABLE forumaccess TYPE datetime VALUE time::now();
`
result = await fetchQuerySQL(query)
}

async function setupBoardAccess(){
	let result;
	let query;
	console.log("BOARD FINISH")
//query = `DEFINE TABLE post SCHEMALESS PERMISSIONS NONE;`;
//query = `DEFINE TABLE post SCHEMALESS;
//	PERMISSIONS
//	FOR select, create, update, delete NONE	
//;`;
query = `DEFINE TABLE boardaccess SCHEMALESS;`;
result = await fetchQuerySQL(query)
console.log(result)

query = `
DEFINE FIELD update ON TABLE boardaccess TYPE datetime VALUE $before OR time::now();
DEFINE FIELD created ON TABLE boardaccess TYPE datetime VALUE time::now();
`
result = await fetchQuerySQL(query)
console.log("BOARD FINISH")
}

async function setupBoard(){
	let result;
	let query;
	console.log("BOARD START")
//query = `DEFINE TABLE post SCHEMALESS PERMISSIONS NONE;`;
//query = `DEFINE TABLE post SCHEMALESS;
//	PERMISSIONS
//	FOR select, create, update, delete NONE	
//;`;
query = `DEFINE TABLE board SCHEMALESS;`;
result = await fetchQuerySQL(query)
console.log(result)

query = `
DEFINE FIELD update ON TABLE board TYPE datetime VALUE $before OR time::now();
DEFINE FIELD created ON TABLE board TYPE datetime VALUE time::now();
`
result = await fetchQuerySQL(query)
console.log("BOARD FINISH")
}

async function setupPost(){
	let result;
	let query;
	console.log("POST START")
//query = `DEFINE TABLE post SCHEMALESS PERMISSIONS NONE;`;
//query = `DEFINE TABLE post SCHEMALESS;
//	PERMISSIONS
//	FOR select, create, update, delete NONE	
//;`;
query = `DEFINE TABLE post SCHEMALESS;`;
result = await fetchQuerySQL(query)
console.log(result)

query = `
DEFINE FIELD update ON TABLE post TYPE datetime VALUE $before OR time::now();
DEFINE FIELD created ON TABLE post TYPE datetime VALUE time::now();
`
result = await fetchQuerySQL(query)
console.log("POST FINISH")
}

async function setupComment(){
	let result;
	let query;

//query = `DEFINE TABLE post SCHEMALESS PERMISSIONS NONE;`;
//query = `DEFINE TABLE post SCHEMALESS;
//	PERMISSIONS
//	FOR select, create, update, delete NONE	
//;`;
query = `DEFINE TABLE comment SCHEMALESS;`;
result = await fetchQuerySQL(query)
console.log(result)

query = `
DEFINE FIELD update ON TABLE comment TYPE datetime VALUE $before OR time::now();
DEFINE FIELD created ON TABLE comment TYPE datetime VALUE time::now();
`
result = await fetchQuerySQL(query)
}

async function setupMessage(){
	let result;
	let query;
	console.log("MESSAGE START")
//query = `DEFINE TABLE message SCHEMALESS PERMISSIONS NONE;`;
query = `
DEFINE TABLE message SCHEMALESS
	PERMISSIONS
		FOR select, create, update, delete NONE
;`;
result = await fetchQuerySQL(query)
console.log(result)

query = `
DEFINE FIELD update ON TABLE message TYPE datetime VALUE $before OR time::now();
DEFINE FIELD created ON TABLE message TYPE datetime VALUE time::now();
`
result = await fetchQuerySQL(query)
console.log(result)
console.log("MESSAGE FINISH")

}

export async function setupDatabase(){
	//console.log("init db...")
	let result;
	let query;
	await queryDB();
	await setupEvent();//debug?
	await setupUser();

	await setupToDoList()
	await setupMessage()

	//await setupForumAccess();
	//await setupBoardAccess();

	await setupBoard();
	await setupPost();
	await setupPost();
	

	console.log("----")
	console.log("finish init db...")
}

async function getDB(){
	if(db){
		console.log("EXIST DB!")
		return db;
	}else{
		console.log("INIT DB!")
		db = new Surreal('http://127.0.0.1:8000/rpc');
		await db.wait();
		// Signin as a namespace, database, or root user
		await db.signin({
			user: 'root',
			pass: 'root',
		});
		await db.use('test', 'test');

		let result = await db.query('SELECT * from user;');
		console.log(result)
		if(result){
			console.log(result[0].result?.length)
			if(result[0].result?.length == 0){//check if user is zero
				console.log("set up database!")
				await setUpDatahbase(db);
			}
		}

		//let result = await db.query('CREATE user;');
		//console.log(result)
		
		return db;
	}
}

export {
	getDB
}