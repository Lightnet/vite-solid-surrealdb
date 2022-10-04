
# Surreal Database Features:

	To the have improve features for more then SQl. Well there is postgresql. SurrealDB will add more features.

	One is reason is have some easy way to handle server and client query in websocket and http and rest api.

	Required some knowlege using some http request and some SQL language.

	Note learning not read the docs fully. This docs is messy still work in progress.

# Guide:
 - https://www.youtube.com/watch?v=LCAIkx1p1k0

## Types / Features:
- graph
- relatational
- key,value
- document
- REST Endpoints
- user / auth

## Table system
	The sql logic is same and diferent a bit. One reason is table id handle. But update to reflect features.

	Docs can be fun here: https://surrealdb.com/docs/surrealql/statements/define

```
CREATE table:id
```
By default random id.

```
CREATE message SET content = "Hello World!";
```
If there "message:id" by random id.

```
CREATE message:welcome SET content = "Hello World!";
```
  unique table id

There one problem is user can't access without permission as well the table does not exist.

```
USE NS test DB test;
DEFINE TABLE message SCHEMALESS
  PERMISSIONS
    FOR select, create NONE;
```
  Here this will define table and permission for user who login for access.

# Auth and Permission:
	By default user can't use table which required set up for permission. As well user account. Still follow basic of table set up.

	Next is set up name space and database name. The reason is permission is use by root admin to create the name space, database and table and other features.

```
USE NS test DB test;
DEFINE TABLE user SCHEMALESS
  PERMISSIONS
    FOR select, create NONE;
```
SCHEMALESS = not strict
SCHEMAFULL = strict, prevent over adding things

	Next we set up simple access by using the SCOPE for user need to tag in signup and signin access check for table.

  Note there different way to set up signup and signin. SurrealDB use post format in json for http in signin and signup. It can be use as email or user. As long the param matches the query.

```
  http://localhost:8000/signin
  method: 'POST'
  headers:{'Accept': 'application/json'}
  body: JSON.stringify({
    NS:'test', // name space
    DB:'test', // database
    SC:'allusers',// scope
    email: options.email ||'test@test.test', // user > email
    pass: options.pass || "pass" // user > pass
  })
```
  It would convert to match the params.
```
  DEFINE SCOPE allusers SESSION 24h
    SIGNUP ( CREATE user SET email = $email, pass = crypto::argon2::generate($pass) )
    SIGNIN ( SELECT * FROM user WHERE email = $email AND crypto::argon2::compare(pass, $pass) )
  ;
```


```
import SurrealDB from 'surrealdb.js';
const db = new SurrealDB('http://127.0.0.1:8000/rpc');
await db.wait();
await db.use('test', 'test');
```


```
db.signin({
  user: 'root',
  pass: 'root',
});
```
  This is for admin level full access


```
db.signin({
  NS: 'test', // access is restrict to name space
  DB: 'test', // access is restrict to table query by need set up.
  SC:'allusers' // access is restrict to table query by need set up.
  user: 'my_login',
  pass: '123456',
});
```
  This is normal access
```
db.signin({
  NS: 'test', // access is restrict to name space
  DB: 'test', // access is restrict to table query by need set up.
  SC:'allusers' // access is restrict to table query by need set up.
  email: 'my_login',
  pass: '123456',
});
```
  This is normal access


```
DEFINE SCOPE allusers 
SESSION 14d
SIGNUP (
  CREATE type::thing("user", string::lowercase(string::trim($id)))
  SET pass = crypto::argon2::generate($pass)
)
SIGNIN (
  SELECT * FROM type::thing("user", string::lowercase(string::trim($id)))
  WHERE crypto::argon2::compare(pass, $pass)
)
```

```
USE NS test DB test;
DEFINE SCOPE allusers SESSION 24h
  SIGNUP ( CREATE user SET email = $email, pass = crypto::argon2::generate($pass) )
  SIGNIN ( SELECT * FROM user WHERE email = $email AND crypto::argon2::compare(pass, $pass) )
;
```



https://www.youtube.com/watch?v=DPQbuW9dQ7w


```js
// ns = namespace
// db = database
db.use(ns, db)

```

```js
// https://github.com/surrealdb/surrealdb/issues/144
// ns = namespace
// db = database
// sc = scope 
// 
let token = await db.signup({
	NS: 'test',
	DB: 'test',
	SC: 'user',
	email: 'info@surrealdb.com',
	pass: '123456',
});

```
	Note need to set up event call checks.
```
DEFINE SCOPE allusers 
SESSION 14d
SIGNUP (
  CREATE type::thing("user", string::lowercase(string::trim($id)))
  SET pass = crypto::argon2::generate($pass)
)
SIGNIN (
  SELECT * FROM type::thing("user", string::lowercase(string::trim($id)))
  WHERE crypto::argon2::compare(pass, $pass)
)
```
	Link to ref:
- https://surrealdb.com/docs/integration/http
- https://gist.github.com/koakh/fbbc37cde630bedcf57acfd4d6a6956b
```
```


https://discord.com/channels/902568124350599239/970336107206176768/1021171970118795356


If authenticating as a NAMESPACE user...
```
USE NS test;
DEFINE LOGIN my_login ON NAMESPACE PASSWORD '123456';

db.signin({
  NS: 'test',
  user: 'my_login',
  pass: '123456',
});
```


```
USE NS test DB test;
DEFINE LOGIN my_login ON DATABASE PASSWORD '123456';


db.signin({
  NS: 'test',
  DB: 'test',
  user: 'my_login',
  pass: '123456',
});
```

If authenticating as a SCOPE user...
```
USE NS test DB test;
DEFINE SCOPE allusers SESSION 24h
  SIGNUP ( CREATE user SET email = $email, pass = crypto::argon2::generate($pass) )
  SIGNIN ( SELECT * FROM user WHERE email = $email AND crypto::argon2::compare(pass, $pass) )
;
```
```
db.signup({
  NS: 'test',
  DB: 'test',
  SC: 'mu_scope',
  email: 'me@acme.com',
  pass: '123456',
  interests: ['my', 'hobbies'],
});
db.signin({
  NS: 'test',
  DB: 'test',
  SC: 'mu_scope',
  email: 'me@acme.com',
  pass: '123456',
});
```
```js
let jwt = await fetch(`http://localhost:8000/signup`, {
	method: 'POST',
	mode: 'no-cors',
	//credentials:"omit",
	headers: {
		'Content-Type': 'application/json',
		'NS': 'test', // Specify the namespace
		'DB': 'test', // Specify the database
		'SC': 'allusers' // Specify the scope
	},
	body: JSON.stringify({
		NS: 'test',
		DB: 'test',
		SC:'allusers',
		email: 'test2@test.test',
		pass: 'pass'
	}),
})
```
	Note error check if signup again there no feedback on fail.

	Note that dev fetch does not work for some reason.
```

```

# browser client
```
Surreal
-constructor
-static get Instance()
-static get AuthenticationError()
-static get PermissionError()
-static get RecordError()
-static get Live()
-connect(url)
-
-sync(query, vars)
-wait()
-close()
-ping()
-use(ns, db)
-info()
-signup(vars)
-signin(vars) 
-invalidate()
-authenticate(token)
-live(table)
-kill(query) 
-let(key, val)
-query(query, vars)
-select(thing)
-create(thing, data)
-update(thing, data)
-change(thing, data)
- modify(thing, data)
- delete(thing)

```


```
USE NS test DB test;
DEFINE TABLE message SCHEMALESS
  PERMISSIONS
    FOR select, create NONE;
```

```
USE NS test DB test;
DEFINE TABLE message DROP;
SELECT * FROM message;
```