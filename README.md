# vite-solid-surrealdb

# Status
- prototype /unstable
- testing / learning ...
- SurrealDB on hold
- Mongoose MongoDB build for testing UI and basic features.

# Programs:
- Nodejs 16.17.0
- SurrealDB 1.0.0 beta 7

# Features:
- example of to do list.
- example of post / blog
- example account

# Information:

 Using the vite and solid js package with nodejs to run http server web.

 The SurrealDB is currently in beta build. The api may change depend users working on the stable version.

 To develop and test how chat message work with permission as well develop simple message. One reason is reduce call from the server web http and go to directly to Surreal database with permission and authority logic.

# User and Table:
	Note that user access need to set up for scope to the database.

	As well the table access permission without it. It will cause some error.

```sql
	CREATE message SET content="text";
```
	This will error out.

```sql
DEFINE TABLE message SCHEMALESS
  PERMISSIONS
    FOR select, update WHERE user = $auth.id, 
    FOR create, delete NONE;
```
	Required Admin or root. No docs yet.

```
```

# Database:
	Note:
	- $auth.id is not working on windows 10 64bit???.
	- 1.0.0 beta 7

	SurrealDB build on rust language. There is no UI that not yet release. Since SurrealDB run by command line to start server. It can used http Rest API query, SQL script, websocket and command line.

 SurrealDB has couple of way of handle database for json, doc, strict schemafull and schemaless table. 
 
 There is permissions for authority users for access tables. By default the config is empty in the database. As code developer can set up and custom way to setup scope access and define them. Note exposing the public required strict schema set up and permissions.


```sql
DEFINE TABLE user SCHEMALESS
  PERMISSIONS
    FOR select, update WHERE id = $auth.id, 
    FOR create, delete NONE;
DEFINE INDEX idx_email ON user COLUMNS email UNIQUE;
```
	This deal with duplicate email that it must be UNIQUE. As well set up user account.

```sql
DEFINE SCOPE allusers
SESSION 14d
SIGNUP ( CREATE user SET settings.marketing = $marketing, email = $email, pass = crypto::argon2::generate($pass), tags = $tags )
SIGNIN ( SELECT * FROM user WHERE email = $email AND crypto::argon2::compare(pass, $pass) )
```

 There are two or more ways of doing things to connect to the SurrealDB database. One is server, client, command line, http rest api call and websocket. The fetch post work for javascript client for REST API for SurrealQL.

```command line
DATA="INFO FOR DB;"
curl --request POST \
	--header "Content-Type: application/json" \
	--user "root:root" \
	--data "${DATA}" \
	http://localhost:8000/sql
```
Linux command line?

 - https://surrealdb.com/docs/cli/sql
```command line
surreal sql --conn http://localhost:8000 --user root --pass root --ns test --db test --pretty
```
	You can query. It found in docs.
```
--pretty //for easy read string output.
surreal //note depend terminal effect error
./surreal //note depend terminal effect error 
```

 - https://surrealdb.com/docs/integration/libraries/nodejs
```command line
npm install surrealdb.js //server
```
```js
import SurrealDB from 'surrealdb.js'

const db = new SurrealDB('http://127.0.0.1:8000/rpc');

async function main() {
	// Signin as a namespace, database, or root user
	await db.signin({
		user: 'root',
		pass: 'root',
	});

	// Select a specific namespace / database
	await db.use('test', 'test');
}
main();
```

 - https://surrealdb.com/usecase/serverless
 - https://www.npmjs.com/package/surrealdb
```
npm install surrealdb //client
```
```js
import SurrealDB from 'surrealdb'
const db = new SurrealDB('http://127.0.0.1:8000', {
	database: 'test',
	namespace: 'test',
	//user: alias(),
	email: email(),
	pass: passphrase()
});
console.log(db)
async function main() {
	let result = await db.Query('SELECT * FROM user;')
	console.log(result)
}
main();

```

 Note there websocket but there no docs added to learn it.

 Added simple script from searching community posts.

 You can read more on the docs on their site.

 Work in progress.

# Docs:
 - https://surrealdb.com/docs/start
 - https://surrealdb.com/docs/integration/libraries/nodejs
 - https://surrealdb.com/docs/surrealql/statements/define
 - https://surrealdb.com/docs/surrealql/functions


# Set Up:

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

```
./surreal start --log debug --user root --pass root memory
```
memory = does not store just tmp ram store.

## .env:
```
SURREALDB_URL="http://127.0.0.1:8000/rpc"
SURREALDB_NAMESPACE="test"
SURREALDB_DATABASE="test"
SURREALDB_USER="root"
SURREALDB_PASS="root"
SECRET="01234567890123456789012345678901"
```
	work in progress.

# DB Events:
	As read the docs for trigger event. It is possible to create fetch logic to call out to send out data. Since the SQL has javascript ESM format code support.

## events:
- CREATE
- UPDATE
- DELETE

```sql
DEFINE EVENT @name ON TABLE @name:id WHEN @condition(s) THEN (
	@dosomething
);

```
 - https://surrealdb.com/docs/surrealql/statements/define

```sql
DEFINE EVENT change_alias ON TABLE user WHEN $before.alias != $after.alias THEN (
	CREATE event SET user = $this, time = time::now(), value = $after.alias, action = 'alias_changed'
);
```
	This log event table.


```sql
DEFINE EVENT fetch_alias ON TABLE user WHEN $event = "UPDATE" AND $after.alias THEN
	http::post('http://localhost:3000/api/user', { action: $event, data: $this })
;
```
 - https://surrealdb.com/docs/surrealql/functions/http#post
##
```
http::post('http://localhost:3000/apideleted', $before.email)
http::post('http://localhost:3000/api', { action: $event, data: $this })
```
	It is possible use proxy for handle email, token, and other things dev for api to custom events.

# Credits:
 - SurrealDB discord
 - 
