/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

import Surreal from 'surrealdb.js';
import nodefetch from 'node-fetch';

/*
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
	let response = await nodefetch('http://localhost:8000/sql',{
		method:'POST',
		headers:{
			"Authorization": 'Basic ' + textToBase64('root'+':'+'root') ,
			"NS": "test",
			"DB": "test",
			"Content-Type":"application/json"
		},
		body:query
	})
	let data = await response.json();
	return data;
}

export async function setUpDatabase(){
	//console.log("init db...")
let result;
let query = `
DEFINE TABLE user SCHEMALESS
  PERMISSIONS
    FOR select, update WHERE user = $auth.id,
    FOR create, delete NONE;
DEFINE INDEX idx_email ON user COLUMNS email UNIQUE;
`;
result = await fetchQuerySQL(query)

query = `
DEFINE EVENT change_alias ON TABLE user WHEN $before.alias != $after.alias THEN (
	CREATE event SET user = $this, time = time::now(), value = $after.alias, action = 'alias_changed'
);
`;
result = await fetchQuerySQL(query)

//query = `
//DEFINE EVENT fetch_alias ON TABLE user WHEN $event = "UPDATE" AND $after.alias THEN
//	http::post('http://localhost:3000/api/user', { action: $event, data: $this })
//;
//`;

query = `
DEFINE EVENT fetch_alias ON TABLE user WHEN $event = "UPDATE" THEN (
	http::post('http://localhost:3000/api/user', { action: $event, data: $this, auth: $auth, scope: $scope, test:"e" })
);
`;
result = await fetchQuerySQL(query)

query = `
DEFINE TABLE event SCHEMALESS
  PERMISSIONS
    FOR select, update NONE
    FOR create, delete NONE;
`;

result = await fetchQuerySQL(query)

//need to fix this... ?
query = `
DEFINE TABLE todolist SCHEMALESS
  PERMISSIONS
    FOR select, create, delete, update WHERE user = $auth.id;
`;
result = await fetchQuerySQL(query)

query = `
DEFINE FIELD user ON TABLE todolist TYPE string VALUE $value;
`;
result = await fetchQuerySQL(query)
console.log(result)
query = `
DEFINE FIELD created ON TABLE todolist TYPE datetime VALUE $before OR time::now();
DEFINE FIELD updated ON TABLE todolist TYPE datetime VALUE time::now();
`;
result = await fetchQuerySQL(query)




//console.log("DEFINE TABLE user SCHEMALESS")
//console.log(data)

//query = `
//DEFINE SCOPE allusers
//	SESSION 14d
//	SIGNUP ( CREATE user SET settings.marketing = $marketing, email = $email, pass = crypto::argon2::generate($pass), tags = $tags )
//	SIGNIN ( SELECT * FROM user WHERE email = $email AND crypto::argon2::compare(pass, $pass) )
//`;

query = `
DEFINE SCOPE allusers
	SESSION 14d
	SIGNUP ( CREATE user SET email = $email, pass = crypto::argon2::generate($pass), alias = $alias )
	SIGNIN ( SELECT * FROM user WHERE email = $email AND crypto::argon2::compare(pass, $pass) )
`;
result = await fetchQuerySQL(query)

query = `
DEFINE FIELD role ON TABLE user
  PERMISSIONS
    FOR select FULL,
    FOR create, update, delete WHERE $scope = 'admin';
`;

query = `DEFINE SCOPE admin SESSION 1h
SIGNIN ( SELECT * FROM admin WHERE email = $email AND crypto::argon2::compare(pass, $pass) );`;


//console.log("DEFINE SCOPE allusers")
//console.log(result)

//result = await _db.query('INFO FOR DB;');
//console.log('INFO FOR DB')
//console.log(result)
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
  //main,
	getDB
}
/*
async function main() {

	try {
    // Signin as a namespace, database, or root user
		await db.signin({
			user: 'root',
			pass: 'root',
		});

    // Select a specific namespace / database
		await db.use('test', 'test');

    // Create a new person with a random id
    
		let created = await db.create("person", {
			title: 'Founder & CEO',
			name: {
				first: 'Tobie',
				last: 'Morgan Hitchcock',
			},
			marketing: true,
			identifier: Math.random().toString(36).substr(2, 10),
		});
    
		// Update a person record with a specific id
		//let updated = await db.change("person:jaime", {
			//marketing: true,
		//});

		// Select all people records
		let people = await db.select("person");
    console.log(people)
	} catch (e) {

		console.error('ERROR', e);
	}
}
*/
//main();