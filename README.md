# vite-solid-surrealdb

# Status
- prototype
- testing / learning ...

# Programs:
- Nodejs
- SurrealDB 1.0.0 beta 7


# Information:

 Using the vite and solid js package with nodejs to run http server web.

 SurrealDB has couple of way of handle database for json, doc, strict and messy table, permissions and events.

 There are two or more ways of doing things to connect to the Surreal database. One is server and other is client. The fetch post work for javascript client for REST API for SurealQL. Note websocket is in docs but not yet added.
 
 Note you have to set up sign up and sign in script access. By default it empty and dev must set up their own logic for login and signup. It is scripted for checks but a set up guide. Work in progress.

 Since SurrealDB build on rust language. There is no UI that not yet release. Since SurrealDB can used http Rest API query or SQL script. As well there command line and http format.

There are two packages for server and client.
```
// https://surrealdb.com/usecase/serverless
npm install surrealdb //client
// https://surrealdb.com/docs/integration/libraries/nodejs
npm install surrealdb.js //server
```
	Note api might change. But should be simple or same format call.



 
 You can read more on the docs on their site.

# Docs:
 - https://surrealdb.com/docs/start
 - https://surrealdb.com/docs/integration/libraries/nodejs


# Setup:

- Install Nodejs
- Install SurrealDB https://github.com/surrealdb/surrealdb

```
npm install nodemon
```
	This for http request server api files auto restart in server side script.

## windows:
	Need to use command line since stand alone execute program for database.

run.bat
```
surreal start --log debug --user root --pass root memory
```
memory = does not store just tmp ram stpre

## database query and access:

	The surreal app needs to be run to run surrealql / sql script.

  Note below this section are guide on trouble shooting. There is script check if user count is zero to set up database first time.

- https://surrealdb.com/docs/start

```command line
DATA="INFO FOR DB;"
curl --request POST \
	--header "Content-Type: application/json" \
	--user "root:root" \
	--data "${DATA}" \
	http://localhost:8000/sql
```

```js
let query = 'INFO FOR DB;'
let response = await fetch('http://localhost:8000/sql',{
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
```

```js
import SurrealDB from 'surrealdb'
const db = new SurrealDB('http://127.0.0.1:8000', {
	user: 'root',
	pass: 'root',
	database: 'test',
	namespace: 'test',
});
console.log(db)

//let result = await db.Query('SELECT * FROM user;')
//let result = await db.Query('select *  from person;')
//console.log(result)
```

Note you can use REST API or command line from current surrealdb.

## database set up SQL:
SQL scripts

```sql
CREATE user;
```
	This not need as long user table is set up.

If the database is started you can used the command line.
```
surreal sql --conn http://localhost:8000 --user root --pass root --ns test --db test
```
	This is for SQL command query or SurrealQL. It can be found in doc.
  

```sql
DEFINE TABLE user SCHEMALESS
  PERMISSIONS
    FOR select, update WHERE id = $auth.id, 
    FOR create, delete NONE;
DEFINE INDEX idx_email ON user COLUMNS email UNIQUE;
```
	This deal with duplicate email that it must be UNIQUE.

```sql
DEFINE SCOPE allusers
SESSION 14d
SIGNUP ( CREATE user SET settings.marketing = $marketing, email = $email, pass = crypto::argon2::generate($pass), tags = $tags )
SIGNIN ( SELECT * FROM user WHERE email = $email AND crypto::argon2::compare(pass, $pass) )
```

Reason for this DEFINE SCOPE for signup params.

```js
const Surreal = require('surrealdb.js');
const db = new Surreal('http://127.0.0.1:8000/rpc');
let token = await db.signup({
  NS: 'test',
  DB: 'test',
  SC: 'allusers', // DEFINE SCOPE allusers
  email: alias +'@surrealdb.test',
  pass: passphrase,
  marketing: true,
  tags: ['rust', 'golang', 'javascript'], // We can add any variable here to use in the SIGNUP clause
});
```