/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

import Surreal from 'surrealdb.js';

/*
./surreal start --log debug --user root --pass root memory
*/

//const db = new Surreal('http://127.0.0.1:8000/rpc');

let db;

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
    /*
		let created = await db.create("person", {
			title: 'Founder & CEO',
			name: {
				first: 'Tobie',
				last: 'Morgan Hitchcock',
			},
			marketing: true,
			identifier: Math.random().toString(36).substr(2, 10),
		});
    */

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

//main();

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
		return db;
	}
}

export {
  main,
	getDB
}