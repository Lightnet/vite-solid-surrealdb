# vite-solid-surrealdb

# Status
- prototype
- testing / learning ...

# Information:

 Using the vite and solid js package with nodejs.

 SurrealDB has couple of way of handle database for json, doc, strict and messy table, permissions and events.

 There are two ways of doing things to connect to the database. One is server and other is client. 
 
 Note you have to set up sign up and sign in script access. Not yet scripted yet but a set up guide.

 Since SurrealDB build on rust language. There is no UI since SurrealDB can used http Rest API query or SQL script. As well there command line http format.
 
 
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
	This for htpp request server api.

## windows:
	Need to use command line since stand alone execute program for database.

run.bat
```
surreal start --log debug --user root --pass root memory
```
memory = does not store just tmp ram stpre

## database set up:

	The surreal app needs to be run to run surrealql / sql script.

- https://surrealdb.com/docs/start

```command line
DATA="INFO FOR DB;"
curl --request POST \
	--header "Content-Type: application/json" \
	--user "root:root" \
	--data "${DATA}" \
	http://localhost:8000/sql
```

Note you can use REST API or command line from current surrealdb.


SQL scripts

```sql
CREATE user SET children = null;
```
  Needed for signup else it will error if not exist.

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