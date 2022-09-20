



## database query and access:

	The surreal app needs to be run to run surrealql / sql script.

  Note below this section are guide on trouble shooting. There is script check if user count is zero to set up database first time.

- https://surrealdb.com/docs/start

### command line rest api
```command line
DATA="INFO FOR DB;"
curl --request POST \
	--header "Content-Type: application/json" \
	--user "root:root" \
	--data "${DATA}" \
	http://localhost:8000/sql
```

### client rest api
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

### server api
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

### database set up SQL:
SQL scripts

```sql
CREATE user;
```
	This not need as long user table is set up.

If the database is started you can used the command line for query SurrealQL.
```
surreal sql --conn http://localhost:8000 --user root --pass root --ns test --db test
```
	This is for SQL command query or SurrealQL. It can be found in doc.

- https://surrealdb.com/docs/cli/sql
  

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


https://surrealdb.com/docs/integration/http
```
http://127.0.0.1:8000/sql
http://127.0.0.1:8000/signin
http://127.0.0.1:8000/signup
```


https://discord.com/channels/902568124350599239/970338835990974484/1012112877949296812
```
INFO FOR NS; -- Will show you all databases, logins, tokens for the namespace
INFO FOR DB; -- Will show you all tables, scopes, logins, tokens for the database
INFO FOR TABLE user; -- Will show you all fields, events, indexes, foreign tables
```

https://discord.com/channels/902568124350599239/970338835990974484/1021435524268969994
```sql
DEFINE SCOPE account SESSION 24h
    SIGNUP ( CREATE user SET email = $email, pass = crypto::argon2::generate($pass) )
    SIGNIN ( SELECT * FROM user WHERE email = $email AND crypto::argon2::compare(pass, $pass) )
;
```
https://discord.com/channels/902568124350599239/970338835990974484/1021438008731373609
```sql
DEFINE SCOPE account SESSION 24h
    SIGNUP ( IF ((SELECT email FROM user WHERE email = $email) != NULL) THEN NULL ELSE ( CREATE user SET email = $email, pass = crypto::argon2::generate($pass)) END )
    SIGNIN ( SELECT * FROM user WHERE email = $email AND crypto::argon2::compare(pass, $pass) )
;
```



https://discord.com/channels/902568124350599239/1013527402674139268/1021350027672698900
```
const WebSocket = require('ws')

const w = new WebSocket('ws://localhost:8000/rpc')
w.addEventListener('open', () => console.log('open'))
w.addEventListener('close', () => console.log('close'))
w.addEventListener('error', (e) => console.log(e))

```

https://discord.com/channels/902568124350599239/1013528064023601303/1021049647118159992


https://discord.com/channels/902568124350599239/970338835990974484/1021122076146401331

Sign a JWT token

https://discord.com/channels/902568124350599239/970338835990974484/1021189115758260224

```js
// Signin and retrieve a JSON Web Token
  let jwt = await fetch('http://localhost:8000/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      NS: 'io.intergate', // Specify the namespace
      DB: 'solid', // Specify the database
      SC: 'account',
    },
    body: JSON.stringify({
      email: 'flemming@intergate.io',
      pass: 'gnimmelf',
    }),
  });
```

https://discord.com/channels/902568124350599239/970338835990974484/1021228279182671932
```
-- Select all people who have any email address ending in 'gmail.com'
SELECT * FROM person WHERE emails.*.value ?= /gmail.com$/;
```